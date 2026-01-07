import logo from "../../assets/logoWtwr.svg";
import avatar from "../../assets/Avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import "./Header.css";
import { NavLink } from "react-router-dom";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <NavLink to="/" className="header__nav-link-logo">
        <img className="header__logo" src={logo} alt="What to Wear logo" />
      </NavLink>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <div className="header__btn-container">
        <ToggleSwitch />

        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-btn"
        >
          + Add Clothes
        </button>
      </div>
      <NavLink to="/profile" className="header__nav-Link">
        <div className="header__user-container">
          <p className="header__username">Terrence Tegegne</p>
          <img className="header__avatar" src={avatar} alt="Terrence Tegegne" />
        </div>
      </NavLink>
    </header>
  );
}

export default Header;
