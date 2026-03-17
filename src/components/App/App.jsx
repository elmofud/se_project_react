import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  getItems,
  addItem,
  deleteItem,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import Header from "../Header/Header";
import { apiKey } from "../../utils/constants";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import { filteredWeatherData, getWeather } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Profile from "../Profile/Profile";
import Registration from "../RegisterModal/Registration";
import LoginModal from "../LoginModal/LoginModal";
import * as auth from "../../utils/auth";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

import "./App.css";

function App() {
  const navigate = useNavigate();
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
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
    const token = localStorage.getItem("jwt");
    const newCardData = {
      name: inputNewItem.name,
      imageUrl: inputNewItem.imageUrl,
      weather: inputNewItem.weather,
    };

    addItem(newCardData, token)
      .then((data) => {
        setClothingItems([data.data, ...clothingItems]);
        resetForm();
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Error adding item:", error);
      });
  };

  const handleRegistration = (value, resetForm) => {
    auth
      .signup(value)
      .then(() => {
        return auth.login({ email: value.email, password: value.password });
      })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        return auth.checkToken(data.token);
      })
      .then((userData) => {
        setCurrentUser(userData.data);
        setIsLoggedIn(true);
        closeActiveModal();
        resetForm();
      })
      .catch((error) => {
        console.error("Registration error:", error);
      });
  };

  const handleLogin = (value, resetForm) => {
    if (!value.email || !value.password) {
      return;
    }
    auth
      .login({ email: value.email, password: value.password })
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          return auth.checkToken(data.token);
        }
      })
      .then((userData) => {
        setCurrentUser(userData.data);
        setIsLoggedIn(true);
        closeActiveModal();
        resetForm();
      })
      .catch((error) => {
        console.error("Token validation error:", error);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    setIsLoggedIn(false);
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .checkToken(token)
        .then((userData) => {
          setCurrentUser(userData.data);
          setIsLoggedIn(true);
        })
        .catch((error) => {
          console.error("Token validation error:", error);
        });
    }
  }, []);

  const handleCardDelete = () => {
    const token = localStorage.getItem("jwt");
    deleteItem(cardToDelete._id, token)
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

  const handleEditProfileSubmit = (updatedData) => {
    const token = localStorage.getItem("jwt");
    auth
      .updateUser(updatedData, token)
      .then((data) => {
        setCurrentUser(data.data);
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    const likeAction = isLiked ? removeCardLike : addCardLike;
    likeAction(id, token)
      .then((updatedCard) => {
        setClothingItems((prevItems) =>
          prevItems.map((item) =>
            item._id === updatedCard.data._id ? updatedCard.data : item,
          ),
        );
      })
      .catch((error) => console.error("Error updating like status:", error));
  };

  const openConfirmationModal = (card) => {
    setCardToDelete(card);
    setActiveModal("delete-confirmation");
  };

  const openRegisterModal = () => {
    setActiveModal("register");
  };

  const openEditProfileModal = () => {
    setActiveModal("edit-profile");
  };

  const openLoginModal = () => {
    setActiveModal("login");
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
        setClothingItems(data.data);
      })
      .catch(console.error);
  }, []);
  return (
    <CurrentUserContext.Provider value={currentUser}>
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
              isLoggedIn={isLoggedIn}
              openRegisterModal={openRegisterModal}
              openLoginModal={openLoginModal}
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
                    onCardLike={handleCardLike}
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
                    onEditProfile={openEditProfileModal}
                    onLogout={handleLogout}
                    onCardLike={handleCardLike}
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
                onRegister={handleRegistration}
              />
              <LoginModal
                buttonText="Log In"
                isOpen={activeModal === "login"}
                onClose={closeActiveModal}
                onLogin={handleLogin}
              />
              <EditProfileModal
                isOpen={activeModal === "edit-profile"}
                onClose={closeActiveModal}
                onUpdateUser={handleEditProfileSubmit}
                buttonText="Save Changes"
              />
            </div>
          </div>
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
