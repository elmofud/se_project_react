import "./ModalWithForm.css";
import closeButton from "../../assets/closeButton.png";
import { Children } from "react";
function ModalWithForm({ children, buttonText, title, activeModal }) {
  return (
    <div className={`modal ${activeModal === "add-garment" && "modal_opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button type="button" className="modal__close">
          <img
            src={closeButton}
            alt="close button X"
            className="modal__close-button-image"
          />
        </button>
        <form className="modal__form">
          {children}
          <button className="modal__submit" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
