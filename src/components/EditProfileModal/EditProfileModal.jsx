import { useState, useEffect, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./EditProfileModal.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function EditProfileModal({ isOpen, onClose, onUpdateUser, buttonText }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
    }
  }, [curenetUser, isOpen]);

  const handleEditProfileSubmit = (evt) => {
    evt.preventDefault();
    onUpdateUser({ name, avatar });
  };

  return (
    <ModalWithForm
      title="Change profile data"
      name="edit-profile"
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleEditProfileSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          required
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          className="modal__input"
          value={name}
          onChange={(evt) => setName(evt.target.value)}
        />
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar URL
        <input
          required
          type="url"
          className="modal__input"
          id="avatar"
          placeholder="Avatar URL"
          name="avatar"
          value={avatar}
          onChange={(evt) => setAvatar(evt.target.value)}
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
