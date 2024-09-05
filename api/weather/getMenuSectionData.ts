import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { parseMenuSection } from "./parser";
import {
  SECTIONS,
  LocationType,
  MenuSectionDataType,
  MenuSectionResponseType,
} from "@/types";

export const getMenuSectionData = async (location: LocationType) => {
  const cachedData = await AsyncStorage.getItem(
    `${SECTIONS.MENU_SECTION}_${location.id}`
  );

  if (cachedData) {
    return JSON.parse(cachedData) as MenuSectionDataType;
  }

  const {
    EXPO_PUBLIC_WEATHER_API_BASE_URL: BASE_URL,
    EXPO_PUBLIC_WEATHER_API_KEY: API_KEY,
  } = process.env;

  const response = (
    await axios.get(
      `${BASE_URL}/${location.name}/today?unitGroup=metric&elements=datetime,resolvedAddress,tempmax,tempmin,temp,description,icon&include=days&key=${API_KEY}&contentType=json`
    )
  ).data as MenuSectionResponseType;

  const parsedData = parseMenuSection(response) as MenuSectionDataType;

  await AsyncStorage.setItem(
    `${SECTIONS.MENU_SECTION}_${location.id}`,
    JSON.stringify(parsedData)
  );

  return parsedData;
};
