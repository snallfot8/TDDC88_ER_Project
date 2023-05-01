// This component is used to display information about the current subject
// Doctor/Staff/Patient
// List items will dynamically change and are uninteractable

import "./TopBar.css";
import { FC } from "react";

const TopBar: FC = () => {
  return (
    <div className="topbar-container">
      <ul className="topbar-list">
        <li className="no-mobile">Time</li>
        <li className="no-mobile">Notification</li>
        <li>Triage</li>
        <li>Room</li>
        <li>Name</li>
        <li>Cause</li>
      </ul>
    </div>
  );
};

export default TopBar;
