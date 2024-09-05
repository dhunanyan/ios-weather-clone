import { Animated } from "react-native";

export type WeatherBaseResponseType = {
  queryCost: number;
  latitude: number;
  longitude: number;
  address: string;
  timezone: string;
  tzoffset: number;
};

export type HeaderSectionResponseType = {
  resolvedAddress: string;
  days: Array<{
    tempmax: number;
    tempmin: number;
    temp: number;
    conditions: string;
    description: string;
    icon: string;
  }>;
} & WeatherBaseResponseType;

export type AlertSectionResponseType = {
  alerts: Array<{
    id: string;
    event: string;
    headline: string;
    description: string;
  }>;
} & WeatherBaseResponseType;

export type HourSectionResponseType = {
  days: Array<{
    datetime: string;
    temp: number;
    sunrise: string;
    sunset: string;
    icon: string;
    conditions: string;
    hours: Array<{
      datetime: string;
      temp: number;
      icon: string;
    }>;
  }>;
} & WeatherBaseResponseType;

export type DaySectionResponseType = {
  days: Array<{
    datetime: string;
    tempmax: number;
    tempmin: number;
    icon: string;
  }>;
} & WeatherBaseResponseType;

export type MenuSectionResponseType = {
  resolvedAddress: string;
  days: Array<{
    datetime: string;
    tempmax: number;
    tempmin: number;
    temp: number;
    conditions: string;
    icon: string;
  }>;
} & WeatherBaseResponseType;

export type LocationType = {
  displayText: string;
  name: string;
  id: string;
};

export type LocationsType = Array<LocationType>;

export type SuggestionType = {
  iso2: string;
  iso3: string;
  country: string;
  cities: Array<string>;
};

export type SuggestionsType = Array<SuggestionType>;

export type SuggestionsResponseType = {
  error: boolean;
  msg: string;
  data: SuggestionsType;
};

export type MenuSectionDataType = {
  location: string;
  time: string;
  conditions: string;
  temp: string;
  minMaxTemp: string;
};

export type HeaderSectionDataType = {
  location: string;
  description: string;
  shortenDescription: string;
  temp: number;
};

export type AlertSectionDataType = Array<{
  title: string;
  description: string;
  footer: string;
  id: string;
}>;

export type HourSectionDataType = {
  title: string;
  hours: Array<{ time: string; temp?: number; icon: string; text?: string }>;
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

export const SECTIONS = {
  MENU_SECTION: "HOUR_SECTION" as "HOUR_SECTION",
  HEADER_SECTION: "HEADER_SECTION" as "HEADER_SECTION",
  ALERT_SECTION: "ALERT_SECTION" as "ALERT_SECTION",
  HOUR_SECTION: "HOUR_SECTION" as "HOUR_SECTION",
  DAY_SECTION: "DAY_SECTION" as "DAY_SECTION",
};

export type SectionDataType = {
  MENU_SECTION: MenuSectionDataType;
  HEADER_SECTION: HeaderSectionDataType;
  ALERT_SECTION: AlertSectionDataType;
  HOUR_SECTION: HourSectionDataType;
  DAY_SECTION: DaySectionDataType;
};

export type SectionResponseType = {
  MENU_SECTION: MenuSectionResponseType;
  HEADER_SECTION: HeaderSectionResponseType;
  ALERT_SECTION: AlertSectionResponseType;
  HOUR_SECTION: HourSectionResponseType;
  DAY_SECTION: DaySectionResponseType;
};

export type SectionResponseTypes =
  | MenuSectionResponseType
  | HeaderSectionResponseType
  | AlertSectionResponseType
  | HourSectionResponseType
  | DaySectionResponseType;

export type SectionTypes =
  | "MENU_SECTION"
  | "HEADER_SECTION"
  | "ALERT_SECTION"
  | "HOUR_SECTION"
  | "DAY_SECTION";

export type AnimatedValuesType = { [key: string]: Animated.Value };
