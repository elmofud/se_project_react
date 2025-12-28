import { useContext } from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import "./Main.css";

function Main({
  weatherData,
  handleCardClick,
  clothingItems,
  isWeatherDataLoad,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const DefaultWeatherTemp = {
    temp: { F: 45, C: 7 },
  };
  return (
    <main className="main">
      <WeatherCard
        weatherData={weatherData}
        isWeatherDataLoad={isWeatherDataLoad}
        DefaultWeatherTemp={DefaultWeatherTemp}
      />
      <section className="cards">
        <p className="cards__text">
          Today is{" "}
          {isWeatherDataLoad
            ? weatherData.temp[currentTemperatureUnit]
            : DefaultWeatherTemp.temp[currentTemperatureUnit]}
          ° {currentTemperatureUnit} / You want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
