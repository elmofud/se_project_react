import { useEffect } from "react";

import "./ModalWithForm.css";
import closeButton from "../../assets/closeButton.png";
function ModalWithForm({
  children,
  buttonText,
  title,
  onClose,
  name,
  isOpen,
  onSubmit,
}) {
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
      className={`modal modal_type_${name} ${isOpen ? `modal_opened` : ``} `}
    >
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          <img
            src={closeButton}
            alt="black X image close"
            className="modal__close-button-image"
          />
        </button>
        <form className="modal__form" name={name} onSubmit={onSubmit}>
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
