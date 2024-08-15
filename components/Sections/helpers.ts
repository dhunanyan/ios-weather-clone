import { WeatherType } from "@/types";
import {
  DaySectionDataType,
  HourSectionDataType,
  MainSectionDataType,
  SectionType,
} from "./types";

export const SECTION_TYPES = {
  MAIN_SECTION: "MAIN_SECTION",
  HOUR_SECTION: "HOUR_SECTION",
  DAY_SECTION: "DAY_SECTION",
};

const parseToMainSection = (data: WeatherType): MainSectionDataType => ({
  location: data.location,
  description: `From ${data.days[0].minTemp}° to ${data.days[0].maxTemp}° ${data.days[0].description}`,
  temp: data.days[0].temp,
});

const parseToDaySection = (data: WeatherType): DaySectionDataType => ({
  title: `Forecast ${data.days.length} Days`,
  days: data.days.map((day) => ({
    dayOfWeek: day.dayOfWeek,
    dateTime: day.dateTime,
    icon: day.icon,
    minTemp: day.minTemp,
    maxTemp: day.maxTemp,
  })),
});

const parseToHourSection = (data: WeatherType): HourSectionDataType => {
  const hours: HourSectionDataType["hours"] = data.days[0].hours.map(
    (hour) => ({
      time: hour.time,
      temp: hour.temp,
      icon: hour.icon,
      text: undefined,
    })
  );

  const sunrise = {
    time: data.days[0].sunrise,
    temp: undefined,
    text: "Sunrise",
    icon: "sunrise",
  };
  const sunset = {
    time: data.days[0].sunset,
    temp: undefined,
    text: "Sunset",
    icon: "sunrise",
  };

  const sunriseIndex =
    hours.findIndex((hour) => hour.time === sunrise.time.split(":")[0]) + 1;
  hours.splice(sunriseIndex, 0, sunrise);

  const sunsetIndex =
    hours.findIndex((hour) => hour.time === sunset.time.split(":")[0]) + 1;
  hours.splice(sunsetIndex, 0, sunset);

  return {
    title: data.days[0].conditions,
    hours: hours,
  };
};

export const getSections = (data: WeatherType): SectionType => [
  {
    type: SECTION_TYPES.MAIN_SECTION,
    data: [parseToMainSection(data)],
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
