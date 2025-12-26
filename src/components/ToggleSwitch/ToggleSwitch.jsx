import React from "react";
import { useContext } from "react";
import "./ToggleSwitch.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

const ToggleSwitch = () => {
  const { handleToggleSwitchChange, currentTemperatureUnit } = useContext(
    CurrentTemperatureUnitContext
  );
  console.log(currentTemperatureUnit);
  return (
    <>
      <input
        onChange={handleToggleSwitchChange}
        className="toggleSwitch__checkbox"
        id={`toggleSwitch-new`}
        type="checkbox"
      />
      <label className="toggleSwitch__label" htmlFor={`toggleSwitch-new`}>
        <span className={`toggleSwitch__button`} />
        <span className="toggleSwitch__text toggleSwitch__text_F">F</span>
        <span className="toggleSwitch__text toggleSwitch__text_C">C</span>
      </label>
    </>
  );
};

export default ToggleSwitch;
