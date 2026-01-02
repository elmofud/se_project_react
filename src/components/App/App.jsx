import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getItems, addItem } from "../../utils/api";
import Header from "../Header/Header";
import { coordinates, apiKey } from "../../utils/constants";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import { filterWeatherData, getWeather } from "../../utils/weatherApi";
import { defaultClothingItems } from "../../utils/clothingItems";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import Profile from "../Profile/Profile";

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
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState(`F`);
  const [isWeatherDataLoad, setIsWeatherDataLoad] = useState(false);
  console.log("Current render - activeModal:", activeModal);

  const onAddItem = (inputNewItem) => {
    const newCardData = {
      // _id: Date.now(),
      name: inputNewItem.name,
      imageUrl: inputNewItem.link,
      weather: inputNewItem.weather,
    };

    addItem(newCardData)
      .then((data) => {
        setClothingItems([...clothingItems, data]);
        closeAllModals();
      })
      .catch((error) => {
        console.error("Error adding item:", error);
      });
  };

  // setClothingItems([...clothingItems, newCardData]);
  const closeAllModals = () => {
    setActiveModal("");
  };

  // const handleAddItemSubmit = (items){
  //   setClothingItems([items, ...clothingItems]);
  //   closeAllModals();
  // }

  const handleToggleSwitchChange = (evt) => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
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

  const openConfirmationModal = () => {
    console.log("openconfirmationModal called");
    setActiveModal("delete-confirmation");
  };

  const handleCardDelete = () => {
    console.log("your are deleted");
  };

  useEffect(() => {
    getItems();
  });

  // Add this as a NEW useEffect, don't modify your existing one
  useEffect(() => {
    console.log("activeModal changed to:", activeModal);
  }, [activeModal]); // Notice the dependency array has activeModal

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
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  isWeatherDataLoad={isWeatherDataLoad}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  clothingItems={clothingItems}
                  handleCardClick={handleCardClick}
                />
              }
            />
          </Routes>

          <Footer />
          <div>
            <AddItemModal
              buttonText="Add garment"
              onAddItem={onAddItem}
              isOpen={activeModal === "add-garment"}
              onClose={handleCloseClick}
            />
            <ItemModal
              isOpen={activeModal === "preview"}
              onClose={handleCloseClick}
              card={selectedCard}
              openConfirmationModal={openConfirmationModal}
            />
            <DeleteConfirmationModal
              isOpen={activeModal === "delete-confirmation"}
              onClose={handleCloseClick}
              onConfirm={handleCardDelete}
              card={selectedCard}
            />
          </div>
        </div>
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
