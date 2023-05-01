// This component displays all the navigation links
// Links change depending on the current content

import "./SideBar.css";
import { FC } from "react";
import { NavLink, useLocation } from "react-router-dom";

// Icons
import { RiContactsBook2Fill } from "react-icons/ri";
import { MdTimeline } from "react-icons/md";
import { RiHeartPulseFill } from "react-icons/ri";
import { FaBriefcaseMedical } from "react-icons/fa";
import { MdHistory } from "react-icons/md";
import { GiMedicines } from "react-icons/gi";
import { MdSettings } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { FaUserInjured } from "react-icons/fa";
import { FaUserNurse } from "react-icons/fa";
import { FaUserMd } from "react-icons/fa";

const SideBar: FC = () => {
  // Get the relative path from the URL
  const location = useLocation();

  return (
    <ul className="sidebar-container">
      {/* Determine which navigation links to show depending on the URL */}

      {location.pathname.startsWith("/Patient/") ? (
        <>
          {/* The following will show when a single patient is selected */}

          <NavLink
            to={"./Journal"}
            className="sidebar-navitem link"
            activeClassName="selected"
          >
            <RiContactsBook2Fill /> Journal
          </NavLink>
          <NavLink
            to={"./Timeline"}
            className="sidebar-navitem"
            activeClassName="selected"
          >
            <MdTimeline /> Timeline
          </NavLink>
          <NavLink
            to="./ECG"
            className="sidebar-navitem"
            activeClassName="selected"
          >
            <MdTimeline /> ECG
          </NavLink>
          <NavLink
            to={"./Vitals"}
            className="sidebar-navitem"
            activeClassName="selected"
          >
            <RiHeartPulseFill /> Vitals
          </NavLink>
          <NavLink
            to="/Treatment"
            className="sidebar-navitem"
            activeClassName="selected"
          >
            <FaBriefcaseMedical /> Treatment
          </NavLink>
          <NavLink
            to="/History"
            className="sidebar-navitem"
            activeClassName="selected"
          >
            <MdHistory /> History
          </NavLink>
          <NavLink
            to={"./Medicine"}
            className="sidebar-navitem"
            activeClassName="selected"
          >
            <GiMedicines /> Medicine
          </NavLink>
        </>
      ) : (
        <>
          {/* The following will show when viewing patient/staff lists */}

          <NavLink
            to="/Patients"
            className="sidebar-navitem"
            activeClassName="selected"
          >
            <FaUserInjured /> All Patients
          </NavLink>
          <NavLink
            to="/AllStaff"
            className="sidebar-navitem"
            activeClassName="selected"
          >
            <FaUserNurse /> All Staff
          </NavLink>
          <NavLink
            to="/MyTeam"
            className="sidebar-navitem"
            activeClassName="selected"
          >
            <FaUserMd /> My Team
          </NavLink>
          <NavLink
            to="/MyPatients"
            className="sidebar-navitem"
            activeClassName="selected"
          >
            <FaUserInjured /> My Patients
          </NavLink>

          {/* <li className="sidebar-navitem">
            <FaUserNurse /> All Staff
          </li>
          <li className="sidebar-navitem">
            <FaUserMd /> My Team
          </li>
          <li className="sidebar-navitem">
            <FaUserInjured /> My Patients
          </li> */}
        </>
      )}

      {/* The following will show always */}

      <NavLink to="/Settings" className="sidebar-navitem">
        <MdSettings /> Settings
      </NavLink>
      <NavLink to="/" className="sidebar-navitem">
        <IoLogOut /> Log out
      </NavLink>
    </ul>
  );
};

export default SideBar;
