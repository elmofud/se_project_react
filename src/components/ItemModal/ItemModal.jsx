import { useEffect } from "react";
import "./ItemModal.css";
import deleteItem from "../../assets/deleteItem.png";
import whiteCloseBtn from "../../assets/whiteCloseButton.png";
function ItemModal({ isOpen, onClose, card, openConfirmationModal }) {
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
      <div className="modal__content modal_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close modal__close--psotion"
        >
          <img
            src={whiteCloseBtn}
            alt="white X image close button"
            className="modal__close-button-image"
          />
        </button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__card-footer">
          <div className="modal__description">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          <div className="modal__delete-block">
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
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
