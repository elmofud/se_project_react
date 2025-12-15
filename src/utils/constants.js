export const coordinates = {
  latitude: 40.69576,
  longitude: -86.15886,
};

export const apiKey = "b7c782aaef42fca2764f49759ebad35d";

export const weatherOptions = [
  {
    day: true,
    condition: "clear",
    url: new URL("../assets/day/sunny.png", import.meta.url),
  },

  {
    day: true,
    condition: "clouds",
    url: new URL("../assets/day/cloudy.png", import.meta.url),
  },

  {
    day: false,
    condition: "clear",
    url: new URL("../assets/night/sunny.png", import.meta.url),
  },

  {
    day: false,
    condition: "clouds",
    url: new URL("../assets/night/cloudy.png", import.meta.url),
  },

  {
    day: true,
    condition: "rain",
    url: new URL("../assets/day/rain.png", import.meta.url),
  },

  {
    day: true,
    condition: "snow",
    url: new URL("../assets/day/snow.png", import.meta.url),
  },

  {
    day: false,
    condition: "rain",
    url: new URL("../assets/night/rain.png", import.meta.url),
  },

  {
    day: false,
    condition: "snow",
    url: new URL("../assets/night/snow.png", import.meta.url),
  },

  {
    day: true,
    condition: "fog",
    url: new URL("../assets/day/fog.png", import.meta.url),
  },

  {
    day: true,
    condition: "thunderstorm",
    url: new URL("../assets/day/storm.png", import.meta.url),
  },

  {
    day: false,
    condition: "fog",
    url: new URL("../assets/night/fog.png", import.meta.url),
  },

  {
    day: false,
    condition: "thunderstorm",
    url: new URL("../assets/night/storm.png", import.meta.url),
  },
];

export const defaultWeatherOptions = {
  day: {
    url: new URL("../assets/day/defaultDay.png", import.meta.url),
  },
  night: {
    url: new URL("../assets/night/defaultNight.png", import.meta.url),
  },
};
