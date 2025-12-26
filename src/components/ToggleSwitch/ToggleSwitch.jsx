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
      </label>
    </>
  );
};

export default ToggleSwitch;
