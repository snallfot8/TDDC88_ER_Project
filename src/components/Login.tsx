// This component shows up when we start the app
// Displays current time and the login button

import "./Login.css";
import { FC, useEffect, useState } from "react";
import Logo from "../images/Logo.png";

// Components
import Button from "./Button";
import { Link } from "react-router-dom";

const Login: FC = () => {
  const [time, setTime] = useState<string>(
    `${new Date().getHours()}:${new Date().getMinutes()}`
  );

  useEffect(() => {
    // Update the time state in intervals of 1 second to always have accurate time
    const timer = setInterval(() => {
      const currentDate: Date = new Date();
      let currentTime: string = `${currentDate.getHours()}:${currentDate.getMinutes()}`;

      // Add a preceding 0 to hour/minute
      // because Date methods do not provide it for single digit values
      if (currentDate.getHours() < 10 && currentDate.getMinutes() > 10) {
        currentTime = `0${currentDate.getHours()}:${currentDate.getMinutes()}`;
      } else if (currentDate.getHours() > 10 && currentDate.getMinutes() < 10) {
        currentTime = `${currentDate.getHours()}:0${currentDate.getMinutes()}`;
      } else if (currentDate.getHours() < 10 && currentDate.getMinutes() < 10) {
        currentTime = `0${currentDate.getHours()}:0${currentDate.getMinutes()}`;
      }

      setTime(currentTime);
    }, 1000);

    // Clean up when this component unmounts so we don't keep calling the interval
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <div className="container">
      <div className="time">
        <h1>{time}</h1>
      </div>
      <div className="login">
        <img src={Logo} alt="Region Östergötland Logo" />
        <Link to="/Patients" className="button-login">
          <Button text="Logga in" color="primary" />
        </Link>
      </div>
    </div>
  );
};

export default Login;
