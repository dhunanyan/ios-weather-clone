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
  hours: Array<WeatherResponseHourType>;
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
  days: Array<WeatherResponseDayType>;
  alerts: Array<WeatherResponseAlertType>;
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
  hours: Array<WeatherHourType>;
};

export type WeatherAlertType = {
  title: string;
  description: string;
  info: string;
  id: string;
};

export type WeatherType = {
  location: string;
  days: Array<WeatherDayType>;
  alerts: Array<WeatherAlertType>;
};

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

export type ParsedSuggestionType = {
  name: string;
  displayText: string;
};

export type ParsedSuggestionsType = Array<ParsedSuggestionType>;
