import { WeatherResponseType, WeatherType } from "@/types";

export const parseWeatherResponse = (
  obj: WeatherResponseType
): WeatherType => ({
  location: obj.address,
  description: obj.description,
  days: obj.days.map((day) => ({
    dayOfWeek: new Date(day.datetime).toString().split(" ")[0] + ".",
    dateTime: day.datetime,
    minTemp: +(day.tempmin / 3).toString().split(".")[0],
    maxTemp: +(day.tempmax / 3).toString().split(".")[0],
    temp: +(day.temp / 3).toString().split(".")[0],
    sunrise: `${day.sunrise.split(":")[0]}:${day.sunrise.split(":")[1]}`,
    sunset: `${day.sunset.split(":")[0]}:${day.sunset.split(":")[1]}`,
    description: day.description,
    conditions: day.conditions,
    icon: day.icon,
    hours: day.hours.map((hour) => ({
      time: hour.datetime.split(":")[0],
      temp: +(hour.temp / 3).toString().split(".")[0],
      icon: hour.icon,
    })),
  })),
});
