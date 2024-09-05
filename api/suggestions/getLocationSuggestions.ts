import { SuggestionsResponseType, SuggestionsType } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const BASE_URL = "https://countriesnow.space/api/v0.1";

export const getLocationSuggestions = async (): Promise<
  SuggestionsType | []
> => {
  const cachedData = await AsyncStorage.getItem("countries_and_cities");

  if (cachedData) {
    return JSON.parse(cachedData) as SuggestionsType;
  }

  const {
    data: { data },
  } = (await axios.get(`${BASE_URL}/countries`)) as {
    data: SuggestionsResponseType;
  };

  await AsyncStorage.setItem("countries_and_cities", JSON.stringify(data));

  return data;
};
