import { weatherOptions } from "../../utils/constants";
import "./WeatherCard.css";
function WeatherCard({ weatherData }) {
  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });
  const filteredOptionUrl = filteredOptions[0].url;
  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temp.F}&deg; F</p>
      <img
        className="weather-card__image"
        alt="weather images"
        src={filteredOptionUrl}
      />
    </section>
  );
}

export default WeatherCard;
