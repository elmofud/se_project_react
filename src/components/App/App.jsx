import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import { coordinates, apiKey } from "../../utils/constants";
import AddItemModal from "../AddItemModal/AddItemModal";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import { filterWeatherData, getWeather } from "../../utils/weatherApi";
import { defaultClothingItems } from "../../utils/clothingItems";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

import "./App.css";
import AddItemModal from "../AddItemModal/AddItemModal";

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
            <AddItemModal />
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
