import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";
import { useContext } from "react";
import "./WeatherCard.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
function WeatherCard({ weatherData, isWeatherDataLoad, defaultWeatherTemp }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  let weatherOption;
  if (filteredOptions.length === 0) {
    weatherOption = defaultWeatherOptions[weatherData.isDay ? "day" : "night"];
  } else {
    weatherOption = filteredOptions[0];
  }

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {isWeatherDataLoad
          ? weatherData.temp[currentTemperatureUnit]
          : defaultWeatherTemp.temp[currentTemperatureUnit]}
        ° {currentTemperatureUnit}
      </p>
      <img
        className="weather-card__image"
        alt={`Card showing ${weatherOption?.day ? "day" : "night"} time ${
          weatherOption?.condition
        } weather`}
        src={weatherOption?.url}
      />
    </section>
  );
}

export default WeatherCard;
