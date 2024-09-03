import { SuggestionsResponseType } from "@/types";
import axios from "axios";

const BASE_URL = "https://countriesnow.space/api/v0.1";

export const getSearchSuggestions =
  async (): Promise<SuggestionsResponseType> =>
    (await axios.get(`${BASE_URL}/countries`)).data;
