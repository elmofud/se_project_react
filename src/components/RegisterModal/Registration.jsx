import { useState } from "react";
import { useForm } from "../../Hooks/useForm";
import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const Registration = ({
  isOpen,
  onClose,
  onRegister,
  buttonText,
  onLoginClick,
}) => {
  const defaultValues = {
    name: "",
    avatar: "",
    email: "",
    password: "",
  };
  const { values, handleChange, handleReset } = useForm(defaultValues);
  const [errors, setErrors] = useState({
    name: "",
    avatar: "",
    email: "",
    password: "",
  });

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email) ? "" : "Invalid email address";
  };

  const validatePassword = (password) => {
    if (password.length < 8) {
      return "Password must be at least 8 characters";
    } else if (password.length > 50) {
      return "Password cannot exceed 50 characters";
    }
    return "";
  };

  const validateName = (name) => {
    if (!name.trim()) {
      return "Name cannot be empty.";
    } else if (name.trim().length < 2) {
      return "Name must be at least 2 characters.";
    } else if (name.trim().length > 40) {
      return "Name cannot exceed 40 characters.";
    }
    return "";
  };

  const validateAvatar = (url) => {
    if (!url.trim()) {
      return "";
    } else if (!/^https?:\/\/\S+$/.test(url.trim())) {
      return "Please enter a valid URL.";
    }
    return "";
  };

  const isFormValid =
    values.name.trim() &&
    values.email.trim() &&
    values.password.trim() &&
    !errors.email &&
    !errors.password &&
    !errors.name &&
    !errors.avatar;

  const handleRegisterSubmit = (evt) => {
    evt.preventDefault();
    const emailError = validateEmail(values.email);
    const passwordError = validatePassword(values.password);
    const nameError = validateName(values.name);
    const avatarError = validateAvatar(values.avatar);
    if (emailError || passwordError || nameError || avatarError) {
      setErrors({
        name: nameError,
        avatar: avatarError,
        email: emailError,
        password: passwordError,
      });
      return;
    }
    setErrors({ name: "", avatar: "", email: "", password: "" });
    onRegister(values, handleReset);
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Register"
      onClose={onClose}
      name="register"
      onSubmit={handleRegisterSubmit}
      buttonText={buttonText}
      isFormValid={isFormValid}
      alternateButton={
        <button
          type="button"
          className="modal__alternate-btn"
          onClick={onLoginClick}
        >
          or Log In
        </button>
      }
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          required
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          name="name"
          value={values.name}
          onChange={(evt) => {
            handleChange(evt);
            setErrors({ ...errors, name: validateName(evt.target.value) });
          }}
        />
        {errors.name && <span className="modal__error">{errors.name}</span>}
      </label>

      <label htmlFor="avatar" className="modal__label">
        Avatar URL{" "}
        <input
          type="url"
          className="modal__input"
          id="avatar"
          placeholder="Avatar URL"
          name="avatar"
          value={values.avatar}
          onChange={(evt) => {
            handleChange(evt);
            setErrors({ ...errors, avatar: validateAvatar(evt.target.value) });
          }}
        />
        {errors.avatar && <span className="modal__error">{errors.avatar}</span>}
      </label>

      <label htmlFor="email" className="modal__label">
        Email{" "}
        <input
          required
          type="email"
          className="modal__input"
          id="email"
          placeholder="Email"
          name="email"
          value={values.email}
          onChange={(evt) => {
            handleChange(evt);
            setErrors({ ...errors, email: validateEmail(evt.target.value) });
          }}
        />
        {errors.email && <span className="modal__error">{errors.email}</span>}
      </label>
      <label htmlFor="password" className="modal__label">
        Password{" "}
        <input
          required
          type="password"
          className="modal__input"
          id="password"
          placeholder="Password"
          name="password"
          value={values.password}
          onChange={(evt) => {
            handleChange(evt);
            setErrors({
              ...errors,
              password: validatePassword(evt.target.value),
            });
          }}
        />
        {errors.password && (
          <span className="modal__error">{errors.password}</span>
        )}
      </label>
    </ModalWithForm>
  );
};

export default Registration;
