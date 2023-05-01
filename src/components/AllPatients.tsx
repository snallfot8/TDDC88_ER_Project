// This component shows a table of all the patients in the system
// Leads to a patient's "Journal" component if clicked on a patient

import "./AllPatients.css";
import { FC, useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { Skeleton } from "@mui/material";

// Icons
import { FaCircle } from "react-icons/fa";
import { FaSyringe } from "react-icons/fa";
import internal from "stream";

// Type to be used by the map function
type Patient = {
  id: number;
  name: string;
  indication_type: string;
  cause: string;
  triage: string;
  time: number;
  team: internal;
};

const AllPatients: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [teams, setTeams] = useState({
    team1: [],
    team2: [],
    team3: [],
  });

  const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  useEffect(() => {
    fetch("/api/getpatients")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const team1 = data.patients.filter(
          (patient: { team: number }) => patient.team === 1
        );
        const team2 = data.patients.filter(
          (patient: { team: number }) => patient.team === 2
        );
        const team3 = data.patients.filter(
          (patient: { team: number }) => patient.team === 3
        );
        setTeams({ team1, team2, team3 });
        setIsLoading(false);
      });
  }, []);

  return !isLoading ? (
    <>
      <table className="patients-team-container">
        <thead>
          <tr>
            <th>Team 1</th>
          </tr>
          <tr>
            <th>Namn</th>
            <th>Skada</th>
            <th>Triage</th>
            <th>Tid</th>
            <th>Läs mer</th>
          </tr>
        </thead>
        <tbody>
          {/* Go through the patients list and make a row for every required field */}
          {/* At least have as many items as in the head, can be more (e.g indication type) */}
          {teams.team1.map((patient: Patient) => (
            <tr key={patient.id}>
              <td className="patient-name">
                <Link
                  to={`/Patient/${patient.id}/Journal`}
                  // className="table-link-name"
                >
                  {/* Show a test result symbol next to name if it exists */}
                  {patient.name}
                  {patient.indication_type === "injection" && (
                    <abbr title={patient.indication_type}>
                      <FaSyringe style={{ marginInlineStart: "20px" }} />
                    </abbr>
                  )}
                </Link>
              </td>
              <td>{patient.cause}</td>
              <td>
                <FaCircle
                  style={{
                    color: `${patient.triage}`,
                    marginLeft: "10px",
                    fontSize: "25px",
                  }}
                />
              </td>
              <td>{patient.time} min</td>
              <td>
                <Link
                  to={`/Patient/${patient.id}/Journal`}
                  className="table-link-journal"
                >
                  Journal
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <table className="patients-team-container">
        <thead>
          <tr>
            <th>Team 2</th>
          </tr>
          <tr>
            <th>Namn</th>
            <th>Skada</th>
            <th>Triage</th>
            <th>Tid</th>
            <th>Läs mer</th>
          </tr>
        </thead>
        <tbody>
          {/* Go through the patients list and make a row for every required field */}
          {/* At least have as many items as in the head, can be more (e.g indication type) */}
          {teams.team2.map((patient: Patient) => (
            <tr key={patient.id}>
              <td className="patient-name">
                <Link
                  to={`/Patient/${patient.id}/Journal`}
                  // className="table-link-name"
                >
                  {/* Show a test result symbol next to name if it exists */}
                  {patient.name}
                  {patient.indication_type === "injection" && (
                    <abbr title={patient.indication_type}>
                      <FaSyringe style={{ marginInlineStart: "20px" }} />
                    </abbr>
                  )}
                </Link>
              </td>
              <td>{patient.cause}</td>
              <td>
                <FaCircle
                  style={{
                    color: `${patient.triage}`,
                    marginLeft: "10px",
                    fontSize: "25px",
                  }}
                />
              </td>
              <td>{patient.time} min</td>
              <td>
                <Link
                  to={`/Patient/${patient.id}/Journal`}
                  className="table-link-journal"
                >
                  Journal
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <table className="patients-team-container">
        <thead>
          <tr>
            <th>Team 3</th>
          </tr>
          <tr>
            <th>Namn</th>
            <th>Skada</th>
            <th>Triage</th>
            <th>Tid</th>
            <th>Läs mer</th>
          </tr>
        </thead>
        <tbody>
          {/* Go through the patients list and make a row for every required field */}
          {/* At least have as many items as in the head, can be more (e.g indication type) */}
          {teams.team3.map((patient: Patient) => (
            <tr key={patient.id}>
              <td className="patient-name">
                <Link
                  to={`/Patient/${patient.id}/Journal`}
                  // className="table-link-name"
                >
                  {/* Show a test result symbol next to name if it exists */}
                  {patient.name}
                  {patient.indication_type === "injection" && (
                    <abbr title={patient.indication_type}>
                      <FaSyringe style={{ marginInlineStart: "20px" }} />
                    </abbr>
                  )}
                </Link>
              </td>
              <td>{patient.cause}</td>
              <td>
                <FaCircle
                  style={{
                    color: `${patient.triage}`,
                    marginLeft: "10px",
                    fontSize: "25px",
                  }}
                />
              </td>
              <td>{patient.time} min</td>
              <td>
                <Link
                  to={`/Patient/${patient.id}/Journal`}
                  className="table-link-journal"
                >
                  Journal
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  ) : (
    <>
      {/* Show a fancy loading animation similar to the table */}
      {/* Imported from "mui". Did not make the component manually */}
      {/* Each Skeleton component is used for some data of the row */}
      {/* Map through 10 static rows. No need for it to be dynamic */}
      <Skeleton animation="wave" variant="rectangular" height={80} />
      {rows.map((index) => (
        <Fragment key={index}>
          <div className="skeleton">
            <Skeleton
              className="single-skeleton"
              animation="wave"
              variant="text"
              height={60}
            />
            <Skeleton
              className="single-skeleton"
              animation="wave"
              variant="text"
              height={60}
            />
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton
              className="single-skeleton"
              animation="wave"
              variant="text"
              height={60}
            />
            <Skeleton
              className="single-skeleton"
              animation="wave"
              variant="text"
              height={60}
            />
          </div>
        </Fragment>
      ))}
    </>
  );
};

export default AllPatients;
