// This component handles routing throughout the app
// New routes should be added here instead of "App" component

import { FC } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Components
import Login from "../components/Login";
import Layout from "../components/Layout";
import Content from "../components/Content";
import RouteWithLayout from "./RouteWithLayout";
import FakeLayout from "../components/FakeLayout";
import Journal from "../components/Journal";
import PageNotFound from "./PageNotFound";
import AllPatients from "../components/AllPatients";
import Ecg from "../components/Ecg";
import Medicine from "../components/Medicine";
import Vitals from "../components/Vitals/Vitals";
import Timeline from "../components/Timeline";
import MyPatients from "../components/MyPatients";
import AllStaff from "../components/AllStaff";
import MyTeam from "../components/MyTeam";

const Routes: FC = () => {
  return (
    <Router>
      <Switch>
        <RouteWithLayout exact path="/" layout={FakeLayout} component={Login} />
        <RouteWithLayout
          exact
          path="/Dashboard"
          layout={Layout}
          component={Content}
        />
        <RouteWithLayout
          exact
          path="/Patient/:id/Journal"
          layout={Layout}
          component={Journal}
        />
        <RouteWithLayout
          exact
          path="/Patients"
          layout={Layout}
          component={AllPatients}
        />
        <RouteWithLayout
          exact
          path="/AllStaff"
          layout={Layout}
          component={AllStaff}
        />
        <RouteWithLayout
          exact
          path="/MyTeam"
          layout={Layout}
          component={MyTeam}
        />
        <RouteWithLayout
          exact
          path="/MyPatients"
          layout={Layout}
          component={MyPatients}
        />

        <RouteWithLayout
          exact
          path="/Patient/:id/Vitals"
          layout={Layout}
          component={Vitals}
        />
        <RouteWithLayout
          exact
          path="/Patient/:id/Medicine"
          layout={Layout}
          component={Medicine}
        />
        {/* Implement other routes below */}
        <RouteWithLayout
          exact
          path="/Patient/:id/ECG"
          layout={Layout}
          component={Ecg}
        />
        <RouteWithLayout
          exact
          path="/Patient/:id/Timeline"
          layout={Layout}
          component={Timeline}
        />
        {/* Catch exceptions */}
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  );
};

export default Routes;
