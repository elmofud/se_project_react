import React from "react";
import "./clothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
function ClothesSection({ clothingItems, handleCardClick }) {
  return (
    <div className="clothes-section">
      <div>
        <p>ClothesSection</p>;
        <button className="clothesSection__btn">BUTTON</button>
      </div>
      <ul className="clothesSection__list">
        {clothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
