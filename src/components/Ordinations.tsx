import "./MedicineTable.css";
import { FaSyringe, FaPills } from "react-icons/fa";
import { useEffect, useState } from "react";
import moment from "moment";

// Type to be used by the map function
type Ordination = {
  id: number;
  medicine: string;
  instant: boolean;
  drip_info: string;
  intake: string;
  dosage: string;
  amount: string;
  start_time: string;
  end_time: string;
};

function Ordinations(props: any) {
  const [ordinations, setOrdination] = useState([]);

  useEffect(() => {
    fetch(`/api/getordination/${props.patientID}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setOrdination(data.ordinations);
      });
  }, [props.patientID]);

  const hours = Array.from(
    {
      length: 48,
    },
    (_, hour) =>
      moment({
        hour: Math.floor(hour / 2),
        minutes: hour % 2 === 0 ? 0 : 30,
      }).format("HH:mm")
  );

  let current = new Date().toLocaleTimeString("it-IT");
  let current_hour = parseInt(current.substring(0, 2));
  let current_min = parseInt(current.substring(3, 5));
  let current_rounded_time = "";

  // For rounding off the CURRENT time
  if (current_min >= 45) {
    if (current_hour === 23) {
      current_rounded_time = `00:00`;
    } else {
      current_rounded_time = `${current_hour + 1}:00`;
      if (current_hour < 10) {
        current_rounded_time = `0${current_hour + 1}:00`;
      }
    }
  } else if (current_min < 45 && current_min >= 15) {
    current_rounded_time = `${current_hour}:30`;
    if (current_hour < 10) {
      current_rounded_time = `0${current_hour}:30`;
    }
  } else {
    current_rounded_time = `${current_hour}:00`;
    if (current_hour < 10) {
      current_rounded_time = `0${current_hour}:00`;
    }
  }

  return (
    <div className="medicine-table-container">
      <h1>Ordinationer på akuten</h1>
      <table>
        <thead>
          <tr>
            <th>Läkemedel</th>
            <th>Mängd</th>
            {hours.map((items, i) => {
              if (items === current_rounded_time) {
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
          {/* Setting the key={i+1} is probably wrong */}
          {ordinations.map((ordination: Ordination, i) => (
            <tr key={ordination.id}>
              <td key={i}>
                {" "}
                {ordination.medicine}
                {ordination.drip_info} <br />
                {ordination.intake}{" "}
              </td>
              <td key={i + 1}>
                {" "}
                {ordination.dosage} {"x"} {ordination.amount}{" "}
              </td>
              {hours.map((items, i) => {
                //I am not proud but it might work for rounding to every 30 minutes
                let ordination_hour_start = parseInt(
                  ordination.start_time.substring(11, 13)
                );
                let ordination_min_start = parseInt(
                  ordination.start_time.substring(14, 16)
                );
                let ordination_hour_end = parseInt(
                  ordination.end_time.substring(11, 13)
                );
                let ordination_min_end = parseInt(
                  ordination.end_time.substring(14, 16)
                );
                let ordination_start_time = "";
                let ordination_end_time = "";

                // For rounding off the START time
                if (ordination_min_start >= 45) {
                  if (ordination_hour_start === 23) {
                    ordination_start_time = `00:00`;
                  } else {
                    ordination_start_time = `${ordination_hour_start + 1}:00`;
                  }
                } else if (
                  ordination_min_start < 45 &&
                  ordination_min_start >= 15
                ) {
                  ordination_start_time = `${ordination_hour_start}:30`;
                } else {
                  ordination_start_time = `${ordination_hour_start}:00`;
                }
                // For rounding off the END time
                if (ordination_min_end >= 45) {
                  if (ordination_hour_end === 23) {
                    ordination_end_time = `00:00`;
                  } else {
                    ordination_end_time = `${ordination_hour_end + 1}:00`;
                  }
                } else if (
                  ordination_min_end < 45 &&
                  ordination_min_end >= 15
                ) {
                  ordination_end_time = `${ordination_hour_end}:30`;
                } else {
                  ordination_end_time = `${ordination_hour_end}:00`;
                }

                //Adds an appropriate icon at the right time
                if (
                  ordination.instant === true &&
                  ordination_start_time === items &&
                  ordination.intake === "intramuskulärt"
                ) {
                  return (
                    <td key={i}>
                      {" "}
                      <FaSyringe />
                    </td>
                  );
                } else if (
                  ordination.instant === false &&
                  parseInt(items) <= parseInt(ordination_end_time) &&
                  ordination.intake === "intramuskulärt"
                ) {
                  // return <td className="blue"></td>;
                  if (ordination_start_time === items) {
                    return <td key={i} className="blue"></td>;
                  } else if (
                    parseInt(items) >= parseInt(ordination_start_time)
                  ) {
                    return <td key={i} className="blue"></td>;
                  } else {
                    return <td key={i} />;
                  }
                } else if (
                  ordination_start_time === items &&
                  ordination.intake === "oralt tablett"
                ) {
                  return (
                    <td key={i}>
                      {" "}
                      <FaPills />
                    </td>
                  );
                } else {
                  //Fill the empty parts of the table
                  return <td key={i} />;
                }
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Ordinations;
