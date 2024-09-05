import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { parseHourSection } from "./parser";
import {
  SECTIONS,
  LocationType,
  HourSectionDataType,
  HourSectionResponseType,
} from "@/types";

export const getHourSectionData = async (location: LocationType) => {
  const cachedData = await AsyncStorage.getItem(
    `${SECTIONS.HOUR_SECTION}_${location.id}`
  );

  if (cachedData) {
    return JSON.parse(cachedData) as HourSectionDataType;
  }

  const {
    EXPO_PUBLIC_WEATHER_API_BASE_URL: BASE_URL,
    EXPO_PUBLIC_WEATHER_API_KEY: API_KEY,
  } = process.env;

  const response = (
    await axios.get(
      `${BASE_URL}/${location.name}/today?unitGroup=metric&elements=conditions,datetime,temp,sunrise,sunset,icon&include=hours&key=${API_KEY}&contentType=json`
    )
  ).data as HourSectionResponseType;

  const parsedData = parseHourSection(response) as HourSectionDataType;

  await AsyncStorage.setItem(
    `${SECTIONS.HOUR_SECTION}_${location.id}`,
    JSON.stringify(parsedData)
  );

  return parsedData;
};
