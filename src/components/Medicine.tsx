// This component is used to display personal details of a single patient

import "./Medicine.css";
import { FC } from "react";
import MedicineTable from "./MedicineTable";
import Ordinations from "./Ordinations";

const Medicine: FC = ( {match}:any) => {
  let patientID:number = match.params.id;

  return (
    <div className="table-div">
      <Ordinations patientID={patientID}></Ordinations>
      <MedicineTable patientID={patientID}></MedicineTable>
    </div>
  );
};

export default Medicine;
