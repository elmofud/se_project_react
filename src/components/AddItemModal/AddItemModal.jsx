import { useForm } from "../../Hooks/useForm";
import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
const AddItemModal = ({
  isOpen,
  onClose,
  onAddItem,
  // inputClothesName,
  // inputClothesUrl,
  // handleClothesNameChange,
  // handleClothesUrlChange,
  // handleOptionChange,
  // selectedWeather,
  buttonText,
}) => {
  const defaultValues = {
    name: "",
    link: "",
    weatherType: "",
  };
  const { values, handleChange } = useForm(defaultValues);
  console.log(values);

  const handleClothesSubmit = (evt) => {
    evt.preventDefault();
    onAddItem(values);
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="New garment"
      onClose={onClose}
      name="add-garment"
      onSubmit={handleClothesSubmit}
      buttonText={buttonText}
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
          // value={inputClothesName}
          value={values.name}
          // onChange={handleClothesNameChange}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          required
          name="link"
          type="url"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          // value={inputClothesUrl}
          // onChange={handleClothesUrlChange}
          value={values.link}
          onChange={handleChange}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            type="radio"
            className="modal__radio-input"
            name="weatherType"
            value="hot"
            checked={values.weatherType === `hot`}
            // onChange={handleOptionChange}
            onChange={handleChange}
          />
          hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            type="radio"
            className="modal__radio-input"
            name="weatherType"
            value="warm"
            checked={values.weatherType === `warm`}
            // onChange={handleOptionChange}
            onChange={handleChange}
          />
          warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            type="radio"
            className="modal__radio-input"
            name="weatherType"
            value="cold"
            checked={values.weatherType === `cold`}
            // onChange={handleOptionChange}
            onChange={handleChange}
          />
          cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};
export default AddItemModal;
