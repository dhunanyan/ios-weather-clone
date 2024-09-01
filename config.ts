import { Animated, ImageSourcePropType, Platform } from "react-native";

import left from "./assets/images/left.png";
import profile from "./assets/images/profile.png";
import background from "./assets/images/background.jpg";

import sunrise from "./assets/images/weather/sunrise.png";
import sunset from "./assets/images/weather/sunset.png";
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
  sunrise: sunrise,
  sunset: sunset,
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

export const PLATFORMS = {
  ANDROID: "android",
  IOS: "ios",
  MACOS: "macos",
  WEB: "web",
  WINDOW: "windows",
};

export const IS_PLATFORM = {
  ANDROID: Platform.OS === PLATFORMS.ANDROID,
  IOS: Platform.OS === PLATFORMS.IOS,
  MACOS: Platform.OS === PLATFORMS.MACOS,
  WEB: Platform.OS === PLATFORMS.WEB,
  WINDOW: Platform.OS === PLATFORMS.WINDOW,
};

export const FOOTER_HEIGHT = IS_PLATFORM.IOS ? 44 + 36 : 44;
export const HEADER_OFFSET = 110;
