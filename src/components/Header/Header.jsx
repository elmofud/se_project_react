import logo from "../../assets/logoWtwr.svg";
import avatar from "../../assets/avatar.png";
import "./Header.css";

function Header({ handleAddClick }) {
  const currentDate = new Date();
  console.log(currentDate);

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="What to Wear logo" />
      <p className="header__date-and-location">date and location</p>
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-Clothes-btn"
      >
        + Add Cloths
      </button>
      <div className="header__user-container">
        <p className="header__username">Terrence Tegegne</p>
        <img className="header__avatar" src={avatar} alt="Terrence Tegegne" />
      </div>
    </header>
  );
}

export default Header;
