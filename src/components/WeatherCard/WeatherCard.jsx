import "./WeatherCard.css";
import weatherImage from "../../assets/sunny.png";
function WeatherCard({ weatherData }) {
  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temp.F}&deg; F</p>
      <img
        className="weather-card__image"
        alt="weather images"
        src={weatherImage}
      />
    </section>
  );
}

export default WeatherCard;
