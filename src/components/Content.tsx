// This component is a placeholder to demonstrate the layout
// Dynamically placed components in layout will replace this one

import "./Content.css";
import { FC } from "react";
import AllPatients from "./AllPatients";

const Content: FC = () => {
  return (
    <div className="content-container">
      {/*<h2>Click Journal or Log out to test routing.</h2>
      <p>Other routes and components do not exist yet</p>
      <sub>Notice how URL also changes accordingly</sub>*/}
      <AllPatients></AllPatients>
    </div>
  );
};

export default Content;
