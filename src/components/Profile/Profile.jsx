import React from "react";
import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
function Profile({
  clothingItems,
  handleCardClick,
  handleAddClick,
  onLogout,
  onEditProfile,
  onCardLike,
}) {
  return (
    <section className="profile">
      <SideBar onLogout={onLogout} onEditProfile={onEditProfile} />
      <ClothesSection
        clothingItems={clothingItems}
        handleCardClick={handleCardClick}
        onCardLike={onCardLike}
        handleAddClick={handleAddClick}
      />
    </section>
  );
}

export default Profile;
