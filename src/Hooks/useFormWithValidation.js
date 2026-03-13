import { useState } from "react";

export function useFormWithValidation(defaultValue) {
  const [values, setValues] = useState(defaultValue);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "name":
        if (!value.trim()) {
          error = "Name is required.";
        }
        break;
      case "imageUrl":
        if (!value.trim()) {
          error = "Image URL is required.";
        } else {
          try {
            new URL(value);
          } catch {
            error = "Please enter a valid URL.";
          }
        }
        break;
      case "weather":
        if (!value) {
          error = "Weather type is required.";
        }
        break;
      default:
        break;
    }
    return error;
  };

  const validateForm = (newValues) => {
    const newErrors = {};
    let formIsValid = true;
    Object.keys(newValues).forEach((key) => {
      const error = validateField(key, newValues[key]);
      if (error) {
        newErrors[key] = error;
        formIsValid = false;
      }
    });
    setErrors(newErrors);
    setIsValid(formIsValid);
    return formIsValid;
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    const newValues = { ...values, [name]: value };
    setValues(newValues);
    // Update errors for this field
    const error = validateField(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    validateForm(newValues);
  };

  const handleSubmit = (onSubmit) => (evt) => {
    evt.preventDefault();
    if (validateForm(values)) {
      onSubmit(values, handleReset);
    }
  };

  const handleReset = () => {
    setValues(defaultValue);
    setErrors({});
    setIsValid(false);
  };

  return {
    values,
    errors,
    isValid,
    handleChange,
    handleSubmit,
    handleReset,
  };
}
