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
  description: data.description,
  temp: data.days[0].temp,
  minTemp: data.days[0].minTemp,
  maxTemp: data.days[0].maxTemp,
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

const parseToHourSection = (data: WeatherType): HourSectionDataType => ({
  title: data.days[0].description,
  hours: data.days[0].hours.map((hour) => ({
    time: hour.time,
    temp: hour.temp,
    icon: hour.icon,
  })),
});

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
