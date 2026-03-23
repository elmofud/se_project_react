import { useState, useEffect, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./EditProfileModal.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function EditProfileModal({ isOpen, onClose, onUpdateUser, buttonText }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [errors, setErrors] = useState({ name: "", avatar: "" });
  const validateUrl = (url) => {
    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?(www\\.)?([\\w-]+\\.)+[\\w-]{2,}(\\/\\S*)?$",
      "i",
    );
    return urlPattern.test(url);
  };

  const validateName = (name) => {
    if (!name.trim()) {
      return "Name cannot be empty.";
    } else if (name.trim().length < 2) {
      return "Name must be at least 2 characters.";
    } else if (name.trim().length > 40) {
      return "Name cannot exceed 40 characters.";
    } else {
      return "";
    }
  };

  const validateAvatar = (url) => {
    if (!url.trim()) {
      return "Avatar URL cannot be empty.";
    } else if (!validateUrl(url.trim())) {
      return "Please enter a valid URL.";
    } else {
      return "";
    }
  };

  const isFormValid =
    name.trim() && avatar.trim() && !errors.name && !errors.avatar;

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
    }
  }, [currentUser, isOpen]);

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
      isFormValid={isFormValid}
    >
      <label htmlFor="edit-profile-name" className="modal__label">
        Name
        <input
          required
          type="text"
          id="edit-profile-name"
          name="name"
          placeholder="Name"
          className="modal__input"
          value={name}
          onChange={(evt) => {
            const value = evt.target.value;
            setName(value);
            setErrors({ ...errors, name: validateName(value) });
          }}
        />
        {errors.name && <span className="modal__error">{errors.name}</span>}
      </label>
      <label htmlFor="edit-profile-avatar" className="modal__label">
        Avatar URL
        <input
          required
          type="url"
          className="modal__input"
          id="edit-profile-avatar"
          placeholder="Avatar URL"
          name="avatar"
          value={avatar}
          onChange={(evt) => {
            const value = evt.target.value;
            setAvatar(value);
            setErrors({ ...errors, avatar: validateAvatar(value) });
          }}
        />
        {errors.avatar && <span className="modal__error">{errors.avatar}</span>}
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
