import logo from "../../assets/logoWtwr.svg";
import avatar from "../../assets/avatar.png";
import "./Header.css";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="What to Wear logo" />
      <p className="header__date-and-location">
        {currentDate},{weatherData.city}
      </p>
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-Clothes-btn"
      >
        + Add Clothes
      </button>
      <div className="header__user-container">
        <p className="header__username">Terrence Tegegne</p>
        <img className="header__avatar" src={avatar} alt="Terrence Tegegne" />
      </div>
    </header>
  );
}

export default Header;
