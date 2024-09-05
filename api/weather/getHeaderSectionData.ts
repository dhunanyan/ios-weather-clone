import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { parseHeaderSection } from "./parser";
import {
  SECTIONS,
  LocationType,
  HeaderSectionDataType,
  HeaderSectionResponseType,
} from "@/types";

export const getHeaderSectionData = async (location: LocationType) => {
  const cachedData = await AsyncStorage.getItem(
    `${SECTIONS.HEADER_SECTION}_${location.id}`
  );

  if (cachedData) {
    return JSON.parse(cachedData) as HeaderSectionDataType;
  }

  const {
    EXPO_PUBLIC_WEATHER_API_BASE_URL: BASE_URL,
    EXPO_PUBLIC_WEATHER_API_KEY: API_KEY,
  } = process.env;

  const response = (
    await axios.get(
      `${BASE_URL}/${location.name}/today?unitGroup=metric&elements=resolvedAddress,tempmax,tempmin,temp,description,conditions,icon&include=days&key=${API_KEY}&contentType=json`
    )
  ).data as HeaderSectionResponseType;

  const isCurrentLocation = location.id === "CURRENT_LOCATION";

  const parsedData = parseHeaderSection(
    response,
    isCurrentLocation
  ) as HeaderSectionDataType;

  await AsyncStorage.setItem(
    `${SECTIONS.HEADER_SECTION}_${location.id}`,
    JSON.stringify(parsedData)
  );

  return parsedData;
};
