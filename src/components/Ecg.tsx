import "./Ecg.css";
import { FC } from "react";
import ECGChart from "./ECGChart";

//import { setCommentRange } from "typescript";

// type Patient = {
//   id: number;
//   name: string;
//   indication_type: string;
//   cause: string;
//   triage: string;
//   time: number;
// };

const Ecg: FC = () => {


  return (
    <div className="ecg-container">

      <div className="current">
        <div className="chart">
          <p> Nuvarande EKG </p>
          <ECGChart />
        </div>
        <div className="selector">
        <h1>Fill me with stuff</h1>
        </div>
      </div>

      <div className="previous">
        <div>
          <p> Tidigare EKG </p>
          <ECGChart />
        </div>
        <div className="selector">
          <h1>Fill me with stuff</h1>
        </div>
      </div>
      
    </div>
  );
};

export default Ecg;
