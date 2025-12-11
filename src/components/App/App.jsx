import React from "react";
import { useState } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState({ type: "cold" });
  const [activeModal, setActiveModal] = useState("");
  return (
    <div className="page">
      <div className="page__content">
        <Header />
        <Main weatherData={weatherData} />
        <div>
          <ModalWithForm
            title="New garment"
            buttonText="Add garment"
            activeModal={activeModal}
          >
            <label htmlFor="name" className="modal__label">
              Name{" "}
              <input
                type="text"
                className="modal__input"
                id="name"
                placeholder="Name"
              />
            </label>
            <label htmlFor="imageUrl" className="modal__label">
              Image{" "}
              <input
                type="url"
                className="modal__input"
                id="imageUrl"
                placeholder="Image URL"
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
                />
                Hot
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
                />
                cold
              </label>
            </fieldset>
          </ModalWithForm>
        </div>
      </div>
    </div>
  );
}

export default App;
