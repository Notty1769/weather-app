import React from "react";
import CurrentLocation from "./currentLocation";
import "./App.css";
import Forcast from "./weatherForcast";

function App() {
  return (
    <React.Fragment>
      <div className="container">
        <CurrentLocation />
        <Forcast />
      </div>
      <div className="footer-info">
        <a href="#">Download Source Code</a> | Developed by{" "}
        <a target="_blank" href="https://www.google.com">
          Notty_1769
        </a>{" "}
        | Powered by{" "}
        <a target="_blank" href="https://www.google.com">
          HTML HINTS
        </a>
      </div>
    </React.Fragment>
  );
}

export default App;
