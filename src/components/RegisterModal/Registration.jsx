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
    return password.length >= 8 ? "" : "Password must be at least 8 characters";
  };

  const isFormValid =
    values.name.trim() &&
    values.email.trim() &&
    values.password.trim() &&
    !errors.email &&
    !errors.password;

  const handleRegisterSubmit = (evt) => {
    evt.preventDefault();
    const emailError = validateEmail(values.email);
    const passwordError = validatePassword(values.password);
    if (emailError || passwordError) {
      setErrors({
        name: "",
        avatar: "",
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
          onChange={handleChange}
        />
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
          onChange={handleChange}
        />
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
          onChange={handleChange}
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
          onChange={handleChange}
        />
        {errors.password && (
          <span className="modal__error">{errors.password}</span>
        )}
      </label>
      <button
        type="button"
        className="modal__switch-btn"
        onClick={onLoginClick}
      >
        or Log In
      </button>
    </ModalWithForm>
  );
};

export default Registration;
