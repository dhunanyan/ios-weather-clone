import axios from "axios";
import { WeatherResponseType, WeatherType } from "@/types";

const parseWeatherResponse = (obj: WeatherResponseType): WeatherType => ({
  location: obj.address,
  days: obj.days.map(
    ({
      datetime,
      tempmin,
      tempmax,
      sunrise,
      sunset,
      description,
      conditions,
      hours,
      temp,
      icon,
    }) => ({
      dayOfWeek: new Date(datetime).toString().split(" ")[0] + ".",
      dateTime: datetime,
      minTemp: +(tempmin / 3).toString().split(".")[0],
      maxTemp: +(tempmax / 3).toString().split(".")[0],
      temp: +(temp / 3).toString().split(".")[0],
      sunrise: `${sunrise.split(":")[0]}:${sunrise.split(":")[1]}`,
      sunset: `${sunset.split(":")[0]}:${sunset.split(":")[1]}`,
      description: description,
      conditions: conditions,
      icon: icon,
      hours: hours.map(({ datetime, temp, icon }) => ({
        time: datetime.split(":")[0],
        temp: +(temp / 3).toString().split(".")[0],
        icon: icon,
      })),
    })
  ),
  alerts: obj.alerts.map(({ event, description, headline, id }) => ({
    title: event,
    description: description,
    info: headline,
    id,
  })),
});

const BASE_URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";

export const getWeather = async (
  location: string = "London"
): Promise<WeatherType> =>
  parseWeatherResponse(
    (
      await axios.get(
        `${BASE_URL}/${location}?key=${process.env.EXPO_PUBLIC_WEATHER_API_KEY?.toString()}`
      )
    ).data
  );

// import { WeatherType } from "@/types";
// import { parseWeatherResponse } from "./helpers";
// import { LONDON, WARSAW } from "./local_snapshot";

// export const getWeather = async (
//   location: string = "London"
// ): Promise<WeatherType> =>
//   parseWeatherResponse(location === "London" ? LONDON : WARSAW);
