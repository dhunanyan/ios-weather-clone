export type LocationType = { id: string; location: string };

type WeatherResponseHourType = {
  datetime: string;
  temp: number;
  icon: string;
};

type WeatherResponseDayType = {
  datetime: string;
  datetimeEpoch: number;
  tempmax: number;
  tempmin: number;
  temp: number;
  sunrise: string;
  sunset: string;
  description: string;
  conditions: string;
  icon: string;
  hours: WeatherResponseHourType[];
};

type WeatherResponseAlertType = {
  event: string;
  headline: string;
  description: string;
  id: string;
};

export type WeatherResponseType = {
  resolvedAddress: string;
  address: string;
  timezone: string;
  description: string;
  days: WeatherResponseDayType[];
  alerts: WeatherResponseAlertType[];
};

export type WeatherHourType = {
  time: string;
  temp: number;
  icon: string;
};

export type WeatherDayType = {
  dayOfWeek: string;
  dateTime: string;
  minTemp: number;
  maxTemp: number;
  temp: number;
  sunrise: string;
  sunset: string;
  description: string;
  conditions: string;
  icon: string;
  hours: WeatherHourType[];
};

export type WeatherAlertType = {
  title: string;
  description: string;
  info: string;
  id: string;
};

export type WeatherType = {
  location: string;
  days: WeatherDayType[];
  alerts: WeatherAlertType[];
};
