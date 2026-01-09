import { useContext } from "react";
import "./ToggleSwitch.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

const ToggleSwitch = () => {
  const { handleToggleSwitchChange, currentTemperatureUnit } = useContext(
    CurrentTemperatureUnitContext
  );
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
        <span
          className={`toggleSwitch__text  toggleSwitch__text_F ${
            currentTemperatureUnit === "F"
              ? "toggleSwitch__text_color_white"
              : ""
          }`}
        >
          F
        </span>
        <span
          className={`toggleSwitch__text  toggleSwitch__text_C ${
            currentTemperatureUnit === "C"
              ? "toggleSwitch__text_color_white"
              : ""
          }`}
        >
          C
        </span>
      </label>
    </>
  );
};

export default ToggleSwitch;
