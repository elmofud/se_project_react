import React, { useEffect } from "react";
import closeButton from "../../assets/BlackCloseButton.png";
import "./DeleteConfirmationModal.css";

function DeleteConfirmationModal({ isOpen, onClose, onConfirm }) {
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
      <div className="modal__content modal__content_padding">
        <button type="button" className="modal__close-btn " onClick={onClose}>
          <img
            src={closeButton}
            alt="black close button"
            className="modal__close-button-image modal__close-button-image--confirm"
          />
        </button>
        <div className="modal__text-content">
          <p className="modal__warning-msg">
            Are you sure you want to delete the item?
            <br /> This action is irreversible!
          </p>
        </div>
        <div className="modal__buttonContent">
          <button
            type="button"
            className="modal__confirm-btn"
            onClick={onConfirm}
          >
            Yes, delete Item
          </button>
          <button type="button" className="modal__cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
