import { ImageSourcePropType } from "react-native";

import left from "./assets/images/left.png";
import profile from "./assets/images/profile.png";
import background from "./assets/images/background.jpg";

import clearDay from "./assets/images/weather/clear-day.png";
import clearNight from "./assets/images/weather/clear-night.png";
import cloudy from "./assets/images/weather/cloudy.png";
import fog from "./assets/images/weather/clear-day.png";
import partlyCloudyDay from "./assets/images/weather/partly-cloudy-day.png";
import partlyCloudyNight from "./assets/images/weather/partly-cloudy-night.png";
import rain from "./assets/images/weather/rain.png";
import snow from "./assets/images/weather/snow.png";
import wind from "./assets/images/weather/wind.png";

export const COLORS = {
  light: {
    title: "#282a36",
    subtitle: "#1a1c24",
    background: "#bdbdec",
    backgroundSecondary: "#a3a4cc",
    tint: "#585cde",
    icon: "#585cde",
    tabIconDefault: "#282a36",
    tabIconSelected: "#585cde",
  },
  dark: {
    title: "#ecedee",
    subtitle: "#f2f3f3",
    background: "#282a36",
    backgroundSecondary: "#191A21",
    tint: "#747aeb",
    icon: "#747aeb",
    tabIconDefault: "#bdbdec",
    tabIconSelected: "#747aeb",
  },
};

type ImagesType = { [key: string]: ImageSourcePropType };

export const IMAGES = {
  left,
  profile,
  background,
} as ImagesType;

export const ICONS = {
  snow: snow,
  rain: rain,
  fog: fog,
  wind: wind,
  cloudy: cloudy,
  "partly-cloudy-day": partlyCloudyDay,
  "partly-cloudy-night": partlyCloudyNight,
  "clear-day": clearDay,
  "clear-night": clearNight,
} as ImagesType;
