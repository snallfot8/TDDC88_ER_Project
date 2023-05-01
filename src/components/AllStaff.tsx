// This component shows a table of all the patients in the system
// Leads to a patient's "Journal" component if clicked on a patient

import "./AllPatients.css";
import { FC, useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { Skeleton } from "@mui/material";

// Icons
import internal from "stream";

// Type to be used by the map function
type Personnel = {
  id: number;
  name: string;
  role: string;
  shift_start: string;
  shift_end: string;
  team: internal;
};

const AllStaff: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [teams, setTeams] = useState({
    team1: [],
    team2: [],
    team3: [],
  });

  const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  useEffect(() => {
    fetch("/api/getpersonnel")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const team1 = data.personnel.filter(
          (personnel: { team: number }) => personnel.team === 1
        );
        const team2 = data.personnel.filter(
          (personnel: { team: number }) => personnel.team === 2
        );
        const team3 = data.personnel.filter(
          (personnel: { team: number }) => personnel.team === 3
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
            <th>Roll</th>
            <th>Skift</th>
          </tr>
        </thead>
        <tbody>
          {/* Go through the patients list and make a row for every required field */}
          {/* At least have as many items as in the head, can be more (e.g indication type) */}
          {teams.team1.map((personnel: Personnel) => (
            <tr key={personnel.id}>
              <td className="patient-name">
                <Link
                  to={`/Patient/${personnel.id}/Journal`}
                  // className="table-link-name"
                >
                  {/* Show a test result symbol next to name if it exists */}
                  {personnel.name}
                </Link>
              </td>
              <td>{personnel.role}</td>
              <td>{personnel.shift_start} - {personnel.shift_end}</td>
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
            <th>Roll</th>
            <th>Skift</th>
          </tr>
        </thead>
        <tbody>
          {/* Go through the patients list and make a row for every required field */}
          {/* At least have as many items as in the head, can be more (e.g indication type) */}
          {teams.team2.map((personnel: Personnel) => (
            <tr key={personnel.id}>
              <td className="patient-name">
                <Link
                  to={`/Patient/${personnel.id}/Journal`}
                  // className="table-link-name"
                >
                  {/* Show a test result symbol next to name if it exists */}
                  {personnel.name}
                </Link>
              </td>
              <td>{personnel.role}</td>
              <td>{personnel.shift_start} - {personnel.shift_end}</td>
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
            <th>Roll</th>
            <th>Skift</th>
          </tr>
        </thead>
        <tbody>
          {/* Go through the patients list and make a row for every required field */}
          {/* At least have as many items as in the head, can be more (e.g indication type) */}
          {teams.team3.map((personnel: Personnel) => (
            <tr key={personnel.id}>
              <td className="patient-name">
                <Link
                  to={`/Patient/${personnel.id}/Journal`}
                  // className="table-link-name"
                >
                  {/* Show a test result symbol next to name if it exists */}
                  {personnel.name}
                </Link>
              </td>
              <td>{personnel.role}</td>
              <td>{personnel.shift_start} - {personnel.shift_end}</td>
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

export default AllStaff;
