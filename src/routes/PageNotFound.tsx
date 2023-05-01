// 404 page in case the user enters an invalid URL

import { FC } from "react";
import { Link } from "react-router-dom";

// Components
import Button from "../components/Button";

const PageNotFound: FC = () => {
  return (
    <div>
      {/* Needs styling */}
      <h1>Page not found!</h1>
      <Link to="/Patients" className="button-login">
        <Button text="Go back" color="primary" />
      </Link>
    </div>
  );
};

export default PageNotFound;
