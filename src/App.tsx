// This component is the entry point of the app
// It is parent of everything, including layout

import "./App.css";
import { FC } from "react";

// Components
import Routes from "./routes/Routes";

const App: FC = () => {
  return <Routes />;
};

export default App;
