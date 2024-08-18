import { WeatherResponseType, WeatherType } from "@/types";

export const parseWeatherResponse = (
  obj: WeatherResponseType
): WeatherType => ({
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
