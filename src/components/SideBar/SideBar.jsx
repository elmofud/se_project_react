import React, { useEffect } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./SideBar.css";

function SideBar({ onLogout, onEditProfile }) {
  const currentUser = React.useContext(CurrentUserContext);
  console.log("Current user in SideBar:", currentUser);
  console.log("Current user avatar in SideBar:", currentUser?.avatar);
  const [avatarError, setAvatarError] = React.useState(false);

  useEffect(() => {
    setAvatarError(false);
  }, [currentUser?.avatar]);

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
      <div className="sideBar__buttons">
        <button className="sideBar__edit-btn" onClick={onEditProfile}>
          Change profile data
        </button>
        <button className="sideBar__logout-btn" onClick={onLogout}>
          Sign Out
        </button>
      </div>
    </aside>
  );
}

export default SideBar;
