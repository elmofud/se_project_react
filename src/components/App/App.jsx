import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getItems, addItem, deleteItem } from "../../utils/api";
import Header from "../Header/Header";
import { apiKey } from "../../utils/constants";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import { filteredWeatherData, getWeather } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import Profile from "../Profile/Profile";
import Registration from "../RegisterModal/Registration";
import  LoginModal  from "../LoginModal/LoginModal";
import * as auth from "../../utils/auth";

import "./App.css";

function App() {
  const fallbackWeather = {
    type: "warm",
    condition: "",
    temp: { F: 45, C: 7 },
    city: "Your location",
    isDay: true,
  };

  const [weatherData, setWeatherData] = useState(fallbackWeather);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState(`F`);
  const [isWeatherDataLoad, setIsWeatherDataLoad] = useState(false);
  const [isLoading , setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);


  const fetchWeather = (coords) => {
    setIsWeatherDataLoad(false);
    getWeather(coords, apiKey)
      .then((data) => {
        const filteredDate = filteredWeatherData(data);
        setWeatherData(filteredDate);
        setIsWeatherDataLoad(true);
      })
      .catch((error) => {
        console.error("Error fetching weather:", error);
        setIsWeatherDataLoad(false);
      });
  };

  const handleAddItem = (inputNewItem, resetForm) => {
    const newCardData = {
      name: inputNewItem.name,
      imageUrl: inputNewItem.imageUrl,
      weather: inputNewItem.weather,
    };

    addItem(newCardData)
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
        resetForm();
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Error adding item:", error);
      });
  };

  const handleRegister = (value, resetForm) => {
    auth
    .signup(value)
      .then(() => {
        return auth.login({email: value.email, password: value.password}) ;
      })
      .then((data) => { 
        setCurrentUser(data.user);
        resetForm();
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Registration error:", error);
      }); 

  const handleCardDelete = () => {
    deleteItem(cardToDelete._id)
      .then(() => {
        setClothingItems(
          clothingItems.filter((item) => item._id !== cardToDelete._id),
        );
        closeActiveModal();
        setCardToDelete(null);
      })
      .catch((error) => console.error("Error deleting item:", error));
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

   



  const openConfirmationModal = (card) => {
    setCardToDelete(card);
    setActiveModal("delete-confirmation");
  };

  const openRegisterModal = () => {
    setActiveModal("register");
  };

  const closeActiveModal = () => {
    setActiveModal("");
    setCardToDelete(null);
  };

   useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        fetchWeather({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
      },
      (error) => {
        console.error("Unable to retrieve location:", error);
        setIsWeatherDataLoad(false);
      },
    );
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
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
                  handleAddClick={handleAddClick}
                />
              }
            />
          </Routes>

          <Footer />
          <div>
            <AddItemModal
              buttonText="Add garment"
              onAddItem={handleAddItem}
              isOpen={activeModal === "add-garment"}
              onClose={closeActiveModal}
            />
            <ItemModal
              isOpen={activeModal === "preview"}
              onClose={closeActiveModal}
              card={selectedCard}
              openConfirmationModal={openConfirmationModal}
            />
            <DeleteConfirmationModal
              isOpen={activeModal === "delete-confirmation"}
              onConfirm={handleCardDelete}
              onClose={closeActiveModal}
            />
            <Registration
              isOpen={activeModal === "register"}
              onClose={closeActiveModal}
              buttonText="Sign Up"
              onRegister={openRegisterModal}
            />
          </div>
        </div>
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
