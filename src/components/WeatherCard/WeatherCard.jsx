import "./WeatherCard.css";
import weatherImage from "../../assets/sunny.png";
function WeatherCard() {
  return (
    <section className="weather-card">
      <p className="weather-card__temp">75 &deg; F</p>
      <img
        className="weather-card__image"
        alt="weather images"
        src={weatherImage}
      />
    </section>
  );
}

export default WeatherCard;
