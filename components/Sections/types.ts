export type DynamicHeaderDataType = {
  location: string;
  description: string;
  shortenDescription: string;
  temp: number;
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
  | DynamicHeaderDataType
  | HourSectionDataType
  | DaySectionDataType
  | null;

export type SectionsType = {
  type: string;
  data: SectionDataType[];
}[];
