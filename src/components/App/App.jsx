import React from "react";
import { useState } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState({ type: "hot" });
  return (
    <div className="page">
      <div className="page__content">
        <Header />
        <Main weatherData={weatherData} />
      </div>
    </div>
  );
}

export default App;
