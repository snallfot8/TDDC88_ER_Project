// This component display a graph with the following:
// Reaction Level Scale, Glasgow Coma Scale, Numeric Pain Rating
import "./AssessmentChart.css";
import { FC, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js";
import ChartDataLabels, { Context } from "chartjs-plugin-datalabels";
import { Skeleton } from "@mui/material";

Chart.register(ChartDataLabels);

interface IProps {
  patientID: number;
}

type PatientAssessment = {
  rls: ChartData[];
  gcs: ChartData[];
  nrs: ChartData[];
};

type Colors = {
  rls: string[];
  gcs: string[];
  nrs: string[];
};

type ChartData = {
  value: number;
  time: string;
};

const AssessmentChart: FC<IProps> = ({ patientID }) => {
  const [values, setValues] = useState<PatientAssessment | null>(null);
  const [time, setTime] = useState<string[] | null>(null);
  const [colors, setColors] = useState<Colors | null>(null);
  const [chartData, setChartData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // These side effects only run once
  useEffect(() => {
    fetch(`/api/assessment/${patientID}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const patientAssessment: PatientAssessment = data.patient;

        // The following variables will be used in the upcoming loops
        // Since useState is async, it is better to update it once,
        // instead of every single loop call.
        // This way things inside the state will be organized as intended

        let val: any = {};
        let rlsClr: string[] = [];
        let gcsClr: string[] = [];
        let nrsClr: string[] = [];

        // Loop through the whole object.
        // Based on the type of data, put values and colors in their corresponding arrays
        for (var [key, value] of Object.entries(patientAssessment)) {
          if (key === "rls") {
            val = {
              ...val,
              rls: value.map((point: any) => {
                rlsClr.push(getColor("rls", point.value));
                return point.value;
              }),
            };
          } else if (key === "gcs") {
            val = {
              ...val,
              gcs: value.map((point: any) => {
                gcsClr.push(getColor("gcs", point.value));
                return point.value;
              }),
            };
          } else if (key === "nrs") {
            val = {
              ...val,
              nrs: value.map((point: any) => {
                nrsClr.push(getColor("nrs", point.value));
                return point.value;
              }),
            };
          }

          // Finally set the component state variables
          setColors((c) => ({
            ...c,
            rls: rlsClr,
            gcs: gcsClr,
            nrs: nrsClr,
          }));
        }
        setValues(val);

        // Got too lazy here :D
        setTime(data.patient.rls.map((p: ChartData) => p.time));
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [patientID]);

  // These side effects are run whenever the values, time and colors change
  useEffect(() => {
    // Data part of the Line graph
    // Set the values and colors from the arrays that were populated earlier
    // ? is needed because the state can be null in the beginning
    // TypeScript demands that it's only used if it exists
    setChartData({
      labels: time,
      datasets: [
        {
          datalabels: {
            color: colors?.rls,
          },
          label: "RLS",
          data: values?.rls,
          fill: false,
          pointStyle: "rect",
          borderColor: "red",
          backgroundColor: "red",
          pointRadius: 6,
          pointHoverRadius: 4,
        },
        {
          datalabels: {
            color: colors?.gcs,
          },
          label: "GCS",
          data: values?.gcs,
          fill: false,
          pointStyle: "circle",
          borderColor: "green",
          backgroundColor: "green",
          pointRadius: 5,
          pointHoverRadius: 4,
        },
        {
          datalabels: {
            color: colors?.nrs,
          },
          label: "NRS",
          data: values?.nrs,
          fill: false,
          pointStyle: "triangle",
          borderDash: [3],
          borderColor: "rgb(109, 160, 221)",
          backgroundColor: "rgb(109, 160, 221)",
          pointRadius: 8,
          pointHoverRadius: 6,
        },
      ],
    });
  }, [values, time, colors]);

  // Determine the severity based on the values provided by the customer
  // This function only changes the color, since it is being handled by the
  // "data" part of the graph and not in the "options" part.
  const getColor = (type: string, value: number): string => {
    if (type === "rls") {
      if (value >= 2 && value <= 3) return "orange";
      else if (value >= 4 && value <= 8) return "red";
      else return "green";
    } else if (type === "gcs") {
      if (value === 14) return "yellow";
      else if (value >= 10 && value <= 13) return "orange";
      else if (value >= 13 && value <= 9) return "red";
      else return "green";
    } // else if (type === "nrs") {
    //   if ((value >= 85 && value <= 89) || value <= 69) return "yellow";
    //   else if (value >= 90 && value <= 99) return "orange";
    //   else if (value >= 100) return "red";
    //   else return "green";
    // }
    return "green";
  };

  // Options part of the Line graph
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      datalabels: {
        display: true,
        // Show the warning sign over the appropriate data point
        // Note: Does not change the color of the warning sign
        // since that is being handled by the "data" part of the graph.
        formatter: function (value: number, context: Context) {
          let i = "";
          if (context.dataset.label === "RLS" && value >= 2) i = "!\n";
          else if (context.dataset.label === "GCS" && value <= 14) i = "!\n";

          // Could not find the abnormal values for NRS
          // Please notify if found

          //   else if (
          //     context.dataset.label === "NRS" &&
          //     (value <= 69 || value >= 85)
          //   )
          //     i = "!\n";

          return i;
        },
        font: {
          size: 28,
        },
      },
      // Legend shows up on the top of the graph
      legend: {
        title: {
          display: true,
          text: "RLS GCS NRS",
          font: {
            size: 30,
          },
          color: "rgb(109, 160, 221)",
        },
        labels: { usePointStyle: true, boxWidth: 10 },
      },
    },
    scales: {
      y: {
        // Suggested means the desired range
        // Does not actually limit the values to go more or less
        // Helps in achieving the needed look of the graph.
        suggestedMax: 16,
        ticks: {
          stepSize: 1,
          color: "black",
        },
        beginAtZero: true,
      },
      x: {
        ticks: {
          maxTicksLimit: 6,
          color: "black",
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return !isLoading ? (
    <>
      <div className="assessment-container">
        <Line data={chartData} options={options} />
      </div>
    </>
  ) : (
    <Skeleton
      animation="wave"
      variant="rectangular"
      height={"100%"}
      width={"100%"}
    />
  );
};

export default AssessmentChart;
