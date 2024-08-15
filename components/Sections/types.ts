import { WeatherHourType, WeatherDayType } from "@/types";

export type MainSectionDataType = {
  location: string;
  description: string;
  temp: number;
  minTemp: number;
  maxTemp: number;
};

export type HourSectionDataType = {
  title: string;
  hours: Array<{ time: string; temp: number; icon: string }>;
};

export type DaySectionDataType = {
  title: string;
  days: Array<{
    dayOfWeek: string;
    dateTime: string;
    icon: string;
    minTemp: number;
    maxTemp: number;
  }>;
};

export type SectionDataType =
  | MainSectionDataType
  | HourSectionDataType
  | DaySectionDataType
  | null;

export type SectionType = {
  type: string;
  data: SectionDataType[];
}[];
