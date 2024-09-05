import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { parseAlertSection } from "./parser";

import {
  SECTIONS,
  LocationType,
  AlertSectionDataType,
  AlertSectionResponseType,
} from "@/types";

export const getAlertSectionData = async (location: LocationType) => {
  const cachedData = await AsyncStorage.getItem(
    `${SECTIONS.ALERT_SECTION}_${location.id}`
  );

  if (cachedData) {
    return JSON.parse(cachedData) as AlertSectionDataType;
  }

  const {
    EXPO_PUBLIC_WEATHER_API_BASE_URL: BASE_URL,
    EXPO_PUBLIC_WEATHER_API_KEY: API_KEY,
  } = process.env;

  const response = (
    await axios.get(
      `${BASE_URL}/${location.name}/today?unitGroup=metric&elements=datetime&include=alerts&key=${API_KEY}&contentType=json`
    )
  ).data as AlertSectionResponseType;

  const parsedData = parseAlertSection(response) as AlertSectionDataType;

  await AsyncStorage.setItem(
    `${SECTIONS.ALERT_SECTION}_${location.id}`,
    JSON.stringify(parsedData)
  );

  return parsedData;
};
