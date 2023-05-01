// This component makes a universal button to use across the app

import "./Button.css";

import { FC } from "react";

interface IProps {
  text: string;
  color: string;
  event?: Function;
}

const Button: FC<IProps> = ({ text, color, event }) => {
  if (color === "primary") color = "#6DA0DD";
  return (
    <button className="button" style={{ backgroundColor: `${color}` }} onClick={() => event}>
      {text}
    </button>
  );
};

export default Button;
