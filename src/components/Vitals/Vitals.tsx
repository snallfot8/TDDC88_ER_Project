//This component is used to display graphs of the vital parameters

import "./Vitals.css";
import { FC, useState } from "react";
import TemperatureChart from "./TemperatureChart";
import AFChart from "./AFChart";
import PBSchart from "./PBSchart";
import AssessmentChart from "./AssessmentChart";
import { ImZoomIn } from "react-icons/im";
import { ImZoomOut } from "react-icons/im";

const Vitals: FC = ({ match }: any) => {
  let patientID: number = match.params.id;
  const charts = [
    <PBSchart patientID={patientID} />,
    <AFChart patientID={patientID} />,
    <TemperatureChart patientID={patientID} />,
    <AssessmentChart patientID={patientID} />,
  ];
  var [selectedCharts, setSelectedCharts] = useState(charts);

  const chartsSelect = (chart: any) => {
    if (selectedCharts.length > 1) {
      setSelectedCharts([chart]);
    } else {
      setSelectedCharts(charts);
    }
  };

  return (
    <div>
      {selectedCharts.length > 1 ? (
        <div className="vitals-container">
          {selectedCharts.map((chart, i) => (
            <div className="pos-relative" key={i}>
              <div
                className="zoom"
                onClick={() => {
                  chartsSelect(chart);
                }}
              >
                <ImZoomIn className="zoomImg" />
              </div>
              {chart}
            </div>
          ))}
        </div>
      ) : (
        <div className="pos-relative">
          <div
            className="zoom"
            onClick={() => {
              chartsSelect(selectedCharts[0]);
            }}
          >
            <ImZoomOut className="zoomImg" />
          </div>
          {selectedCharts}
        </div>
      )}
    </div>
  );
};

export default Vitals;
