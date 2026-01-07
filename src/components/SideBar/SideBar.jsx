import React from "react";
import avatar from "../../assets/Avatar.png";

import "./SideBar.css";
function SideBar() {
  return (
    <aside className="sidebar">
      <div className="sideBar__profile">
        <p className="sideBar__userName">Terrence Tegegne</p>
        <img className="sideBar__avatar" src={avatar} alt="Terrence Tegegne" />
      </div>
    </aside>
  );
}

export default SideBar;
