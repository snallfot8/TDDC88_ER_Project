// This component is the parent of everything after logging in
// It controls the overall layout of the app

import "./Layout.css";
import { FC } from "react";

// Components
import TopBar from "./TopBar";
import SideBar from "./SideBar";

const Layout: FC = (props: any) => {
  return (
    <div className="layout-container">
      <div className="top-bar">
        <TopBar />
      </div>
      <div className="side-bar">
        <SideBar />
      </div>
      <div className="content">{props.children}</div>
    </div>
  );
};

export default Layout;
