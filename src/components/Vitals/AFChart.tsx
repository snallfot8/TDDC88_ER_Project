import { FC, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-datalabels";
import "./AFChart.css";

import { Chart } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Skeleton } from "@mui/material";
Chart.register(ChartDataLabels);

interface IProps {
  patientID: number;
}

type AF = {
  AF: number;
  time: string;
};

const AFChart: FC<IProps> = ({ patientID }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [af, setAf] = useState([]);
  const [time, setTime] = useState([]);
  const [color, setColor] = useState<string[]>([]);

  function getColor(frequence: any) {
    if (frequence < 26 && frequence > 7) {
      return "rgb(109, 160, 221)";
    } else if (frequence < 31 && frequence > 25) {
      return "orange";
    } else {
      return "red";
    }
  }

  useEffect(() => {
    fetch(`/api/getonepatient/${patientID}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const frequence = data.patient.breathing_frequence.map((a: AF) => a.AF);
        setAf(frequence);
        const time = data.patient.temp.map((a: AF) => a.time);
        setTime(time);
        const colors: string[] = [];
        frequence.forEach(function (item: any) {
          colors.push(getColor(item));
        });
        setColor(colors);
        setIsLoading(false);
      });
  }, [patientID]);

  return !isLoading ? (
    <div className="af-container">
      <Line
        data={{
          labels: time,
          datasets: [
            {
              label: "Andningsfrekvens",
              data: af,
              pointBackgroundColor: color,
              pointBorderColor: color,
              pointRadius: 5,
              borderColor: "rgba(109, 160, 221, 0.8)",
            },
          ],
        }}
        options={{
          plugins: {
            datalabels: {
              color: color,
              align: "end",
              font: {
                size: 14,
              },
            },
            legend: {
              labels: {
                boxWidth: 0,
                color: "rgb(109, 160, 221)",
                font: {
                  size: 30,
                },
                padding: 15,
              },
            },
          },
          scales: {
            yAxis: {
              min: 0,
              max: 35,
              ticks: {
                maxTicksLimit: 8,
              },
            },
            xAxis: {
              ticks: {
                maxTicksLimit: 6,
              },
              grid: {
                display: false,
              },
            },
          },
          maintainAspectRatio: true,
        }}
      />
    </div>
  ) : (
    <Skeleton
      animation="wave"
      variant="rectangular"
      height={"100%"}
      width={"100%"}
    />
  );
};

export default AFChart;
