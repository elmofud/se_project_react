import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ItemCard.css";
function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = item.likes?.some((id) => id === currentUser?._id);
  console.log("item.likes:", item.likes);
  console.log("isLiked:", isLiked);
  const itemLikeButtonClassName = `card__like-btn ${isLiked ? "card__like-btn_active" : ""}`;

  const handleLike = () => {
    onCardLike({ id: item._id, isLiked: isLiked });
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      {currentUser && (
        <button
          className={itemLikeButtonClassName}
          onClick={handleLike}
          type="button"
        >
          {isLiked ? "Unlike" : "Like"}
        </button>
      )}

      <img
        onClick={() => {
          onCardClick(item);
        }}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
