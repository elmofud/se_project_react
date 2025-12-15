import { useEffect } from "react";

import "./ModalWithForm.css";
import closeButton from "../../assets/closeButton.png";
import { Children } from "react";
// function ModalWithForm({ children, buttonText, title, activeModal, onClose }) {
  function ModalWithForm({children,buttonText, title, isOpen, onClose}) {}
const handleClothesSubmit = (evt) => {
    evt.preventDefault();
  };

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
    if (activeModal) {
      document.addEventListener("keydown", handleEscapeKey);
    }
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [activeModal, onClose]);

  return (
    <div
      onClick={handleOverlayClick}
className="{`}"    >
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          <img
            src={closeButton}
            alt="black X image close button"
            className="modal__close-button-image"
          />
        </button>
        <form className="modal__form" onSubmit={handleClothesSubmit}>
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
