import React from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./SideBar.css";

function SideBar({ onLogout, onEditProfile }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [avatarError, setAvatarError] = React.useState(false);
  return (
    <aside className="sidebar">
      <div className="sideBar__profile">
        {currentUser?.avatar && !avatarError ? (
          <img
            className="sideBar__avatar"
            src={currentUser?.avatar}
            alt={currentUser?.name}
            onError={() => setAvatarError(true)}
          />
        ) : (
          <div className="sideBar__avatar-placeholder">
            {currentUser?.name?.charAt(0).toUpperCase()}
          </div>
        )}
        <p className="sideBar__username">{currentUser?.name}</p>
      </div>
      <button className="sideBar__edit-btn" onClick={onEditProfile}>
        Change profile data
      </button>
      <button className="sidebar__Logout-btn" onClick={onLogout}>
        Sign Out
      </button>
    </aside>
  );
}

export default SideBar;
