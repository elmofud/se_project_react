export const coordinates = {
  latitude: 40.69576,
  longitude: -86.15886,
};

export const APIkey = "b7c782aaef42fca2764f49759ebad35d";

export const weatherOption = [
  {
    day: true,
    condition: "sunny",
    url: new URL("../assets/day/sunny.png", import.meta.url),
    href,
  },

  {
    day: true,
    condition: "cloudy",
    url: new URL("../assets/day/cloudy.png", import.meta.url),
    href,
  },

  {
    day: false,
    condition: "sunny",
    url: new URL("../assets/night/sunny.png", import.meta.url),
    href,
  },

  {
    day: false,
    condition: "cloudy",
    url: new URL("../assets/night/sunny.png", import.meta.url),
    href,
  },

  {
    day: true,
    condition: "rain",
    url: new URL("../assets/day/rain.png", import.meta.url),
    href,
  },

  {
    day: true,
    condition: "snow",
    url: new URL("../assets/day/snow.png", import.meta.url),
    href,
  },
  {
    day: false,
    condition: "rain",
    url: new URL("../assets/night/rain.png", import.meta.url),
    href,
  },

  {
    day: flase,
    condition: "snow",
    url: new URL("../assets/night/snow.png", import.meta.url),
    href,
  },

  {
    day: true,
    condition: "fog",
    url: new URL("../assets/day/fog.png", import.meta.url),
    href,
  },

  {
    day: true,
    condition: "storm",
    url: new URL("../assets/day/storm.png", import.meta.url),
    href,
  },

  day: false,
    condition: "fog",
    url: new URL("../assets/night/fog.png", import.meta.url),
    href,
  },

  {
    day: false,
    condition: "storm",
    url: new URL("../assets/night/storm.png", import.meta.url),
    href,
  },
];
