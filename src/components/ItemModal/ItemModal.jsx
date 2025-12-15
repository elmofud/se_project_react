import "./ItemModal.css";
import whiteCloseBtn from "../../assets/whiteCloseButton.png";
function ItemModal({ isOpen, onClose, card }) {
  return (
    <div onClick={onClose} className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content modal_type_image">
        <button onClick={onClose} type="button" className="modal__close">
          <img
            src={whiteCloseBtn}
            alt="white X image close button"
            className="modal__close-button-image"
          />
        </button>
        <img src={card.link} alt={card.name} className="modal__image" />
        <div className="modal__card-footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
