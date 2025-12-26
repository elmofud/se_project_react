import React from "react";
import "./ToggleSwitch.css";

const ToggleSwitch = ({ isOn, handleToggleSwitch }) => {
  return (
    <>
      <input
        checked={isOn}
        onChange={handleToggleSwitch}
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
