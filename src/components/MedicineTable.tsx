import "./MedicineTable.css";
import { useEffect, useState } from "react";

// Type to be used by the map function
type Medicine = {
  id: number;
  medicine: string;
  intake: string;
  dosage: string;
  interval: string;
  start_date: string;
  end_date: string;
};

function MedicineTable(props: any) {
  const [medicines, setMedicine] = useState([]);

  useEffect(() => {
    fetch(`/api/getmedicine/${props.patientID}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setMedicine(data.medicines);
      });
  }, [props.patientID]);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Maj",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Okt",
    "Nov",
    "Dec",
  ];

  // The current month
  let current_month = new Date().getMonth();

  return (
    <div className="medicine-table-container">
      <h1>Läkemedelslista</h1>
      <table>
        <thead>
          <tr>
            <th>Läkemedel</th>
            <th>Mängd</th>
            {months.map((items, i) => {
              // Compares the current month with the month array
              if (i === current_month) {
                return (
                  <th style={{ backgroundColor: "red" }} key={i}>
                    {items}
                  </th>
                );
              } else {
                return <th key={i}>{items}</th>;
              }
            })}
          </tr>
        </thead>

        <tbody>
          {/* Go through the patients list and make a row for every required field */}
          {/* At least have as many items as in the head, can be more (e.g indication type) */}
          {medicines.map((medicine: Medicine, i) => (
            <tr key={medicine.id}>
              <td key={i}>
                {" "}
                {medicine.medicine} <br /> {medicine.intake}{" "}
              </td>
              <td key={i+1}>
                {" "}
                {medicine.dosage} {medicine.interval}{" "}
              </td>
              {months.map((items, i) => {
                let medicine_start_month = parseInt(
                  medicine.start_date.substring(5, 7)
                );
                let medicine_end_month = parseInt(
                  medicine.end_date.substring(5, 7)
                );
                if (medicine_start_month === i + 1) {
                  return <td key={i} className="blue"></td>;
                } else if (
                  medicine_start_month < i + 1 &&
                  medicine_end_month > i + 1
                ) {
                  return <td key={i} className="blue"></td>;
                } else if (medicine_end_month === i + 1) {
                  return <td key={i} className="blue"></td>;
                } else {
                  return <td key={i}/>;
                }
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MedicineTable;
