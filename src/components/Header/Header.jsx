import { useContext } from "react";
import logo from "../../assets/logoWtwr.svg";
import avatar from "../../assets/Avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import "./Header.css";
import { NavLink } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  openRegisterModal,
  openLoginModal,
}) {
  const currentUser = useContext(CurrentUserContext);
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
      {isLoggedIn ? (
        <NavLink to="/profile" className="header__nav-Link">
          <div className="header__user-container">
            <p className="header__username">{currentUser?.name}</p>
            {currentUser?.avatar ? (
              <img
                className="header__avatar"
                src={currentUser?.avatar}
                alt={currentUser?.name}
              />
            ) : (
              <div className="header__avatar-placeholder">
                {currentUser?.name?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        </NavLink>
      ) : (
        <div className="header__auth-buttons">
          <button className="header__signup-btn" onClick={openRegisterModal}>
            Sign Up
          </button>
          <button className="header__login-btn" onClick={openLoginModal}>
            Log In
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
