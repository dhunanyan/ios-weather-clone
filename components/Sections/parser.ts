import { WeatherType } from "@/types";
import {
  DaySectionDataType,
  HourSectionDataType,
  DynamicHeaderDataType,
  SectionsType,
  AlertSectionDataType,
  SECTION_TYPES,
} from "./types";

export const parseToDynamicHeader = ({
  location,
  days: [{ minTemp, maxTemp, description, temp, conditions }],
}: WeatherType): DynamicHeaderDataType => ({
  location,
  description: `From ${minTemp}° to ${maxTemp}° ${description}`,
  shortenDescription: `${temp}° | ${conditions}`,
  temp,
});

export const parseToAlertSection = ({
  alerts,
}: WeatherType): AlertSectionDataType => ({
  alerts: alerts.map(({ title, description, info, id }) => ({
    title,
    description,
    info,
    id,
  })),
});

export const parseToDaySection = ({
  days,
}: WeatherType): DaySectionDataType => ({
  title: `Forecast ${days.length} Days`,
  days: days.map(({ dayOfWeek, dateTime, icon, minTemp, maxTemp }) => ({
    dayOfWeek: dayOfWeek,
    dateTime: dateTime,
    icon: icon,
    minTemp: minTemp,
    maxTemp: maxTemp,
  })),
});

export const parseToHourSection = ({
  days: [{ hours, sunrise, sunset, conditions: title }],
}: WeatherType): HourSectionDataType => {
  const parsedHours: HourSectionDataType["hours"] = hours.map(
    ({ time, temp, icon }) => ({
      time: time,
      temp: temp,
      icon: icon,
      text: undefined,
    })
  );

  const sunriseHour = {
    time: sunrise,
    temp: undefined,
    text: "Sunrise",
    icon: "sunrise",
  };
  const sunsetHour = {
    time: sunset,
    temp: undefined,
    text: "Sunset",
    icon: "sunrise",
  };

  const sunriseHourTime = sunriseHour.time.split(":")[0];
  const sunsetHourTime = sunsetHour.time.split(":")[0];

  const sunriseIndex =
    parsedHours.findIndex((hour) => hour.time === sunriseHourTime) + 1;
  parsedHours.splice(sunriseIndex, 0, sunriseHour);

  const sunsetIndex =
    parsedHours.findIndex((hour) => hour.time === sunsetHourTime) + 1;
  parsedHours.splice(sunsetIndex, 0, sunsetHour);

  return {
    title,
    hours: parsedHours,
  };
};

export const parseSections = (data: WeatherType): SectionsType => [
  {
    type: SECTION_TYPES.BLANK_SECTION,
    data: [{}],
  },
  {
    type: SECTION_TYPES.ALERT_SECTION,
    data: [parseToAlertSection(data)],
  },
  {
    type: SECTION_TYPES.HOUR_SECTION,
    data: [parseToHourSection(data)],
  },
  {
    type: SECTION_TYPES.DAY_SECTION,
    data: [parseToDaySection(data)],
  },
];
