// import axios from "axios";
// import { parseWeatherResponse } from "./helpers";

// const BASE_URL =
//   "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";
// const API_KEY = "WC57EA7Y7QY4ZJ673R3KUXWF4";

// export const getWeather = async (
//   location: string = "London"
// ): Promise<object> =>
//   parseWeatherResponse(
//     (await axios.get(`${BASE_URL}/${location}?key=${API_KEY}`)).data
//   );

import { parseWeatherResponse } from "./helpers";
import { LONDON, WARSAW } from "./local_snapshot";

export const getWeather = async (
  location: string = "London"
): Promise<object> =>
  parseWeatherResponse(location === "London" ? LONDON : WARSAW);
