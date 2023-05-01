// This component is used to implement custom logic for routing
// Wraps the given layout around the given component
// Can be expanded upon e.g login authentication

import { Route } from "react-router-dom";

// Used "any" type because no idea what the actual types are

const RouteWithLayout = ({
  component: Component,
  layout: Layout,
  ...rest
}: any) => {
  return (
    <Route
      // Spread out whatever else was passed i.e "exact" "path"
      {...rest}
      // Learn how render props work: "https://reactjs.org/docs/render-props.html"
      render={(props) => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
};

export default RouteWithLayout;
