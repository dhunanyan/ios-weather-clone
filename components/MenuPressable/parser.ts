import { LocationType, WeatherType } from "@/types";

export type MenuPressableDataType = {
  location: string;
  time: string;
  conditions: string;
  temp: string;
  minMaxTemp: string;
};

export const parseToMenuPressable = (
  { days: [{ minTemp, maxTemp, temp, conditions }] }: WeatherType,
  location: LocationType
): MenuPressableDataType => ({
  location: location.displayName,
  time: new Date().toLocaleString().split(" ")[1].slice(0, -3),
  conditions: conditions,
  temp: `${temp}°`,
  minMaxTemp: `From ${minTemp}° to ${maxTemp}`,
});
