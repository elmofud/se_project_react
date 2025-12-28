import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import { coordinates, apiKey } from "../../utils/constants";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { filterWeatherData, getWeather } from "../../utils/weatherApi";
import { defaultClothingItems } from "../../utils/clothingItems";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    condition: "",
    temp: { F: 999, C: 999 },
    city: "",
    isDay: false,
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [selectedWeather, setSelectedWeather] = useState("");
  const [inputClothesName, setInputClothesName] = useState("");
  const [inputClothesUrl, setInputClothesUrl] = useState("");
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState(`F`);
  const [isWeatherDataLoad, setIsWeatherDataLoad] = useState(false);

  const handleClothesSubmit = (evt) => {
    evt.preventDefault();
    const newItem = {
      _id: Date.now(),
      name: inputClothesName,
      imageUrl: inputClothesUrl,
      weather: selectedWeather,
    };
    handleAddItem(newItem);
  };

  const handleAddItem = (newItem) => {
    setClothingItems([...clothingItems, newItem]);
    setActiveModal("");
  };

  const handleToggleSwitchChange = (evt) => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleClothesUrlChange = (evt) => {
    setInputClothesUrl(evt.target.value);
  };

  const handleClothesNameChange = (evt) => {
    setInputClothesName(evt.target.value);
  };

  const handleOptionChange = (evt) => {
    setSelectedWeather(evt.target.value);
  };
  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleCloseClick = () => {
    setActiveModal("");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filterDate = filterWeatherData(data);
        setWeatherData(filterDate);
        setIsWeatherDataLoad(true);
      })
      .catch(console.error);
  }, []);
  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header
            handleAddClick={handleAddClick}
            weatherData={weatherData}
            currentTemperatureUnit={currentTemperatureUnit}
            setCurrentTemperatureUnit={setCurrentTemperatureUnit}
          />
          <Main
            weatherData={weatherData}
            handleCardClick={handleCardClick}
            clothingItems={clothingItems}
            isWeatherDataLoad={isWeatherDataLoad}
          />
          <Footer />
          <div>
            <ModalWithForm
              title="New garment"
              buttonText="Add garment"
              // activeModal={activeModal}
              onClose={handleCloseClick}
              onSubmit={handleClothesSubmit}
              name="add-garment"
              isOpen={activeModal === "add-garment"}
            >
              <label htmlFor="name" className="modal__label">
                Name{" "}
                <input
                  required
                  type="text"
                  className="modal__input"
                  id="name"
                  placeholder="Name"
                  value={inputClothesName}
                  onChange={handleClothesNameChange}
                />
              </label>
              <label htmlFor="imageUrl" className="modal__label">
                Image{" "}
                <input
                  required
                  type="url"
                  className="modal__input"
                  id="imageUrl"
                  placeholder="Image URL"
                  value={inputClothesUrl}
                  onChange={handleClothesUrlChange}
                />
              </label>
              <fieldset className="modal__radio-buttons">
                <legend className="modal__legend">
                  Select the weather type:
                </legend>
                <label
                  htmlFor="hot"
                  className="modal__label modal__label_type_radio"
                >
                  <input
                    id="hot"
                    type="radio"
                    className="modal__radio-input"
                    name="climate"
                    value="hot"
                    checked={selectedWeather === `hot`}
                    onChange={handleOptionChange}
                  />
                  hot
                </label>
                <label
                  htmlFor="warm"
                  className="modal__label modal__label_type_radio"
                >
                  <input
                    id="warm"
                    type="radio"
                    className="modal__radio-input"
                    name="climate"
                    value="warm"
                    checked={selectedWeather === `warm`}
                    onChange={handleOptionChange}
                  />
                  warm
                </label>
                <label
                  htmlFor="cold"
                  className="modal__label modal__label_type_radio"
                >
                  <input
                    id="cold"
                    type="radio"
                    className="modal__radio-input"
                    name="climate"
                    value="cold"
                    checked={selectedWeather === `cold`}
                    onChange={handleOptionChange}
                  />
                  cold
                </label>
              </fieldset>
            </ModalWithForm>
            <ItemModal
              isOpen={activeModal === "preview"}
              onClose={handleCloseClick}
              card={selectedCard}
            />
          </div>
        </div>
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
