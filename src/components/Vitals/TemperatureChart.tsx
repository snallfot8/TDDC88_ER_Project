import { FC, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-datalabels";
import "./TemperatureChart.css";

import { Chart } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Skeleton } from "@mui/material";
Chart.register(ChartDataLabels);

interface IProps {
  patientID: number;
}

type Temp = {
  temp: number;
  time: string;
};

const TemperatureChart: FC<IProps> = ({ patientID }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [temp, setTemp] = useState([]);
  const [time, setTime] = useState([]);
  const [color, setColor] = useState<string[]>([]);

  function getColor(temperature: any) {
    if (temperature >= 35 && temperature <= 41) {
      return "rgb(109, 160, 221)";
    } else {
      return "orange";
    }
  }

  useEffect(() => {
    fetch(`/api/getonepatient/${patientID}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const temp = data.patient.temp.map((t: Temp) => t.temp);
        setTemp(temp);
        const time = data.patient.temp.map((t: Temp) => t.time);
        setTime(time);
        const colors: string[] = [];
        temp.forEach(function (item: any) {
          colors.push(getColor(item));
        });
        setColor(colors);
        setIsLoading(false);
      });
  }, [patientID]);

  return !isLoading ? (
    <div className="temp-container">
      <Line
        data={{
          labels: time,
          datasets: [
            {
              label: "Kroppstemperatur",
              data: temp,
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
              min: 32,
              max: 42,
              ticks: {
                maxTicksLimit: 6,
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

export default TemperatureChart;
