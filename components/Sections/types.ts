export type BlankSectionDataType = {};

export type DynamicHeaderDataType = {
  location: string;
  description: string;
  shortenDescription: string;
  temp: number;
};

export type AlertSectionDataType = {
  alerts: Array<{
    title: string;
    description: string;
    info: string;
    id: string;
  }>;
};

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

export type SectionDataType =
  | BlankSectionDataType
  | AlertSectionDataType
  | HourSectionDataType
  | DaySectionDataType
  | null;

export type SectionsType = {
  type: string;
  data: SectionDataType[];
}[];

export const SECTION_TYPES = {
  HOUR_SECTION: "HOUR_SECTION",
  ALERT_SECTION: "ALERT_SECTION",
  BLANK_SECTION: "BLANK_SECTION",
  DAY_SECTION: "DAY_SECTION",
};
