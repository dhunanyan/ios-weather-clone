import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { parseDaySection } from "./parser";

import {
  SECTIONS,
  LocationType,
  DaySectionDataType,
  DaySectionResponseType,
} from "@/types";

export const getDaySectionData = async (location: LocationType) => {
  const cachedData = await AsyncStorage.getItem(
    `${SECTIONS.DAY_SECTION}_${location.id}`
  );

  if (cachedData) {
    return JSON.parse(cachedData) as DaySectionDataType;
  }

  const {
    EXPO_PUBLIC_WEATHER_API_BASE_URL: BASE_URL,
    EXPO_PUBLIC_WEATHER_API_KEY: API_KEY,
  } = process.env;

  const response = (
    await axios.get(
      `${BASE_URL}/${location.name}/next30days?unitGroup=metric&elements=datetime,tempmax,tempmin,icon&include=days&key=${API_KEY}&contentType=json`
    )
  ).data as DaySectionResponseType;

  const parsedData = parseDaySection(response) as DaySectionDataType;

  await AsyncStorage.setItem(
    `${SECTIONS.DAY_SECTION}_${location.id}`,
    JSON.stringify(parsedData)
  );

  return parsedData;
};
