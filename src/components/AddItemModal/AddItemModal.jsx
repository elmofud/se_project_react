import { useFormWithValidation } from "../../Hooks/useFormWithValidation";
import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
const AddItemModal = ({ isOpen, onClose, onAddItem, buttonText }) => {
  const defaultValues = {
    name: "",
    imageUrl: "",
    weather: "",
  };
  const { values, errors, isValid, handleChange, handleSubmit } =
    useFormWithValidation(defaultValues);

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="New garment"
      onClose={onClose}
      name="add-garment"
      onSubmit={handleSubmit(onAddItem)}
      buttonText={buttonText}
      isFormValid={isValid}
    >
      <label htmlFor="add-garment-name" className="modal__label">
        Name{" "}
        <div className="modal__input-container">
          <input
            type="text"
            className="modal__input"
            id="add-garment-name"
            placeholder="Name"
            name="name"
            value={values.name}
            onChange={handleChange}
          />
          {errors.name && <span className="modal__error">{errors.name}</span>}
        </div>
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <div className="modal__input-container">
          <input
            name="imageUrl"
            type="url"
            className="modal__input"
            id="add-garment-imageUrl"
            placeholder="Image URL"
            value={values.imageUrl}
            onChange={handleChange}
          />
          {errors.imageUrl && (
            <span className="modal__error">{errors.imageUrl}</span>
          )}
        </div>
      </label>
      <div className="modal__radio-container">
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type:</legend>
          <label
            htmlFor="add-garment-hot"
            className="modal__label modal__label_type_radio"
          >
            <input
              id="add-garment-hot"
              type="radio"
              className="modal__radio-input"
              name="weather"
              value="hot"
              checked={values.weather === `hot`}
              onChange={handleChange}
            />
            hot
          </label>
          <label
            htmlFor="add-garment-warm"
            className="modal__label modal__label_type_radio"
          >
            <input
              id="add-garment-warm"
              type="radio"
              className="modal__radio-input"
              name="weather"
              value="warm"
              checked={values.weather === `warm`}
              onChange={handleChange}
            />
            warm
          </label>
          <label
            htmlFor="add-garment-cold"
            className="modal__label modal__label_type_radio"
          >
            <input
              id="add-garment-cold"
              type="radio"
              className="modal__radio-input"
              name="weather"
              value="cold"
              checked={values.weather === `cold`}
              onChange={handleChange}
            />
            cold
          </label>
        </fieldset>
      </div>{" "}
      {errors.weather && (
        <span className="modal__error modal__error_weather">
          Please select a weather type.
        </span>
      )}
    </ModalWithForm>
  );
};
export default AddItemModal;
