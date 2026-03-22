import { useEffect, useContext } from "react";
import "./ItemModal.css";
import deleteItem from "../../assets/deleteItem.png";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import whiteCloseBtn from "../../assets/whiteCloseButton.png";

function ItemModal({ isOpen, onClose, card, openConfirmationModal }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser?._id;
  const handleOverlayClick = (evt) => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEscapeKey = (evt) => {
      if (evt.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
    }
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);

  return (
    <div
      onClick={handleOverlayClick}
      className={`modal ${isOpen && "modal_opened"}`}
    >
      <div className="modal__content modal__content_preview">
        <button
          onClick={onClose}
          type="button"
          className="modal__close-btn modal__close-btn_position"
        >
          <img
            src={whiteCloseBtn}
            alt="white X image close button"
            className="modal__close-button-image modal__close-button-image_color"
          />
        </button>
        <div className="modal__image-container">
          <img
            src={card.imageUrl}
            alt={card.name}
            className="modal__image modal__image_horizontal"
          />
          <h2 className="modal__caption_horizontal">{card.name}</h2>
        </div>
        <div className="modal__card-footer modal__card-footer_horizontal">
          <div className="modal__description">
            <h2 className="modal__caption modal__caption_vertical">
              {card.name}
            </h2>
            <p className="modal__weather modal__weather_positionL">
              Weather: {card.weather}
            </p>
          </div>
          {isOwn && (
            <div className="modal__delete-block modal__delete-block_disable">
              <button
                type="button"
                onClick={() => openConfirmationModal(card)}
                className="modal__delete-btn"
              >
                <img
                  src={deleteItem}
                  alt="delete image icon"
                  className="modal__delete-image-btn"
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
