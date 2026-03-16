import React from "react";
import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
function Profile({ clothingItems, handleCardClick, handleAddClick, onLogout }) {
  return (
    <section className="profile">
      <SideBar onLogout={onLogout} />
      <ClothesSection
        clothingItems={clothingItems}
        handleCardClick={handleCardClick}
        handleAddClick={handleAddClick}
      />
    </section>
  );
}

export default Profile;
