import React from "react";
import "./ToggleSwitch.css";

const ToggleSwitch = ({ isOn, handleToggleSwitch }) => {
  return (
    <>
      <input
        checked={isOn}
        onChange={handleToggleSwitch}
        className="toggleSwitch-checkbox"
        id={`toggleSwitch-new`}
        type="checkbox"
      />
      <label className="toggleSwitch-label" htmlFor={`toggleSwitch-new`}>
        <span className={`toggleSwitch-button`} />
      </label>
    </>
  );
};

export default ToggleSwitch;
