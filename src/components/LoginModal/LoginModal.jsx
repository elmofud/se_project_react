import { useState } from "react";
import { useForm } from "../../Hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

const LoginModal = ({
  isOpen,
  onClose,
  onLogin,
  buttonText,
  onRegisterClick,
}) => {
  const defaultValues = {
    email: "",
    password: "",
  };
  const { values, handleChange, handleReset } = useForm(defaultValues);
  const [errors, setErrors] = useState({
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

  const isFormValid =
    values.email.trim() &&
    values.password.trim() &&
    !errors.email &&
    !errors.password;

  const handleLoginSubmit = (evt) => {
    evt.preventDefault();
    const emailError = validateEmail(values.email);
    const passwordError = validatePassword(values.password);
    if (emailError || passwordError) {
      setErrors({
        email: emailError,
        password: passwordError,
      });
      return;
    }
    setErrors({ email: "", password: "" });
    onLogin(values, handleReset);
  };

  return (
    <ModalWithForm
      name="login"
      title="Login"
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleLoginSubmit}
      isFormValid={isFormValid}
      alternateButton={
        <button
          type="button"
          className="modal__alternate-btn"
          onClick={onRegisterClick}
        >
          or Sign Up
        </button>
      }
    >
      <label htmlFor="login-email" className="modal__label">
        Email
        <input
          required
          id="login-email"
          type="email"
          name="email"
          value={values.email}
          className="modal__input"
          onChange={(evt) => {
            handleChange(evt);
            setErrors({ ...errors, email: validateEmail(evt.target.value) });
          }}
        />
        {errors.email && <span className="modal__error">{errors.email}</span>}
      </label>
      <label htmlFor="login-password" className="modal__label">
        Password
        <input
          required
          id="login-password"
          type="password"
          name="password"
          value={values.password}
          className="modal__input"
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

export default LoginModal;
