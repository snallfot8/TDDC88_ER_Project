// This component display a graph with the following vitals:
// Pulse, systolic blood pressure, diastolic blood pressure and saturation
import "./PBSchart.css";
import { FC, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js";
import ChartDataLabels, { Context } from "chartjs-plugin-datalabels";
import { Skeleton } from "@mui/material";

Chart.register(ChartDataLabels);

interface IProps {
  patientID: number;
}

type PatientPBS = {
  pulse: ChartData[];
  bloodSys: ChartData[];
  bloodDia: ChartData[];
  saturation: ChartData[];
};

type Colors = {
  pulse: string[];
  bloodSys: string[];
  bloodDia: string[];
  saturation: string[];
};

type ChartData = {
  value: number;
  time: string;
};

const PBSchart: FC<IProps> = ({ patientID }) => {
  const [values, setValues] = useState<PatientPBS | null>(null);
  const [time, setTime] = useState<string[] | null>(null);
  const [colors, setColors] = useState<Colors | null>(null);
  const [chartData, setChartData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // These side effects only run once
  useEffect(() => {
    fetch(`/api/pbs/${patientID}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const patientPBS: PatientPBS = data.patient;

        // The following variables will be used in the upcoming loops
        // Since useState is async, it is better to update it once,
        // instead of every single loop call.
        // This way things inside the state will be organized as intended

        let val: any = {};
        let pulseClr: string[] = [];
        let bloodSysClr: string[] = [];
        let bloodDiaClr: string[] = [];
        let saturationClr: string[] = [];

        // Loop through the whole object.
        // Based on the type of vitals, put values and colors in their corresponding arrays
        for (var [key, value] of Object.entries(patientPBS)) {
          if (key === "pulse") {
            val = {
              ...val,
              pulse: value.map((point: any) => {
                pulseClr.push(getColor("pulse", point.value));
                return point.value;
              }),
            };
          } else if (key === "bloodSys") {
            val = {
              ...val,
              bloodSys: value.map((point: any) => {
                bloodSysClr.push(getColor("bloodSys", point.value));
                return point.value;
              }),
            };
          } else if (key === "bloodDia") {
            val = {
              ...val,
              bloodDia: value.map((point: any) => {
                bloodDiaClr.push(getColor("bloodDia", point.value));
                return point.value;
              }),
            };
          } else if (key === "saturation") {
            val = {
              ...val,
              saturation: value.map((point: any) => {
                saturationClr.push(getColor("saturation", point.value));
                return point.value;
              }),
            };
          }

          // Finally set the component state variables
          setColors((c) => ({
            ...c,
            pulse: pulseClr,
            bloodSys: bloodSysClr,
            bloodDia: bloodDiaClr,
            saturation: saturationClr,
          }));
        }
        setValues(val);

        // Got too lazy here :D
        setTime(data.patient.pulse.map((p: ChartData) => p.time));
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [patientID]);

  // These side effects are run whenever the values, time and colors change
  useEffect(() => {
    // Data part of the Line graph
    // Set the values and colors for vitals from the arrays that were populated earlier
    // ? is needed because the state can be null in the beginning
    // TypeScript demands that it's only used if it exists
    setChartData({
      labels: time,
      datasets: [
        {
          datalabels: {
            color: colors?.pulse,
          },
          label: "Puls",
          data: values?.pulse,
          fill: false,
          pointStyle: "circle",
          borderColor: "red",
          backgroundColor: "red",
          pointRadius: 5,
          pointHoverRadius: 4,
        },
        {
          datalabels: {
            color: colors?.bloodSys,
          },
          label: "Systolisk",
          data: values?.bloodSys,
          fill: false,
          pointStyle: "triangle",
          rotation: 180,
          borderColor: "rgb(109, 160, 221)",
          backgroundColor: "rgb(109, 160, 221)",
          pointRadius: 8,
          pointHoverRadius: 6,
        },
        {
          datalabels: {
            color: colors?.bloodDia,
          },
          label: "Diastolisk",
          data: values?.bloodDia,
          fill: false,
          pointStyle: "triangle",
          borderColor: "rgb(109, 160, 221)",
          backgroundColor: "rgb(109, 160, 221)",
          pointRadius: 8,
          pointHoverRadius: 6,
        },
        {
          datalabels: {
            color: colors?.saturation,
          },
          label: "Saturation",
          data: values?.saturation,
          fill: false,
          pointStyle: "rect",
          borderColor: "green",
          backgroundColor: "green",
          pointRadius: 6,
          pointHoverRadius: 4,
        },
      ],
    });
  }, [values, time, colors]);

  // Determine the severity of vitals based on the values provided by the customer
  // This function only changes the color, since it is being handled by the
  // "data" part of the graph and not in the "options" part.
  const getColor = (type: string, value: number): string => {
    if (type === "pulse") {
      if ((value >= 40 && value <= 49) || value >= 111) return "yellow";
      else if (value >= 30 && value <= 39) return "orange";
      else if (value <= 29) return "red";
      else return "green";
    } else if (type === "bloodSys") {
      if ((value >= 135 && value <= 139) || value <= 109) return "yellow";
      else if (value >= 140 && value <= 149) return "orange";
      else if (value >= 150) return "red";
      else return "green";
    } else if (type === "bloodDia") {
      if ((value >= 85 && value <= 89) || value <= 69) return "yellow";
      else if (value >= 90 && value <= 99) return "orange";
      else if (value >= 100) return "red";
      else return "green";
    } else if (type === "saturation") {
      if (value >= 91 && value <= 94) return "yellow";
      else if (value >= 88 && value <= 90) return "orange";
      else if (value <= 87) return "red";
      else return "green";
    }
    return "green";
  };

  // Options part of the Line graph
  const options = {
    plugins: {
      datalabels: {
        display: true,
        // Show the warning sign over the appropriate data point
        // Note: Does not change the color of the warning sign
        // since that is being handled by the "data" part of the graph.
        // Note2: Could've smashed all ifs in a compound statement but
        // that would have been horrible for readability.
        formatter: function (value: number, context: Context) {
          let i = "";
          if (context.dataset.label === "Puls" && (value <= 49 || value >= 111))
            i = "!\n";
          else if (
            context.dataset.label === "Systolisk" &&
            (value <= 109 || value >= 135)
          )
            i = "!\n";
          else if (
            context.dataset.label === "Diastolisk" &&
            (value <= 69 || value >= 85)
          )
            i = "!\n";
          else if (context.dataset.label === "Saturation" && value <= 94)
            i = "!\n";

          return i;
        },
        font: {
          size: 28,
        },
      },
      // Legend shows up on the top of the graph
      legend: {
        title: {
          padding: { top: 10 },
          display: true,
          text: "Puls Blodtryck Saturation",
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
        suggestedMin: 40,
        suggestedMax: 220,
        ticks: {
          stepSize: 20,
          color: "black",
        },
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
      <div className="pbs-container">
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

export default PBSchart;
