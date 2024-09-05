import {
  DaySectionDataType,
  DaySectionResponseType,
  HourSectionDataType,
  HourSectionResponseType,
  HeaderSectionDataType,
  HeaderSectionResponseType,
  AlertSectionDataType,
  AlertSectionResponseType,
  MenuSectionDataType,
  MenuSectionResponseType,
} from "@/types";

export const parseMenuSection = ({
  days: [{ tempmin, tempmax, temp, datetime, conditions }],
  resolvedAddress,
}: MenuSectionResponseType): MenuSectionDataType => ({
  location: resolvedAddress.split(",")[0],
  time: new Date(datetime).toLocaleString().split(" ")[1].slice(0, -3),
  conditions: conditions,
  temp: `${temp}°`,
  minMaxTemp: `From ${tempmin}° to ${tempmax}`,
});

export const parseHeaderSection = (
  {
    days: [{ tempmin, tempmax, temp, conditions, description }],
    resolvedAddress,
  }: HeaderSectionResponseType,
  isCurrentLocation: boolean
): HeaderSectionDataType => ({
  location: isCurrentLocation
    ? "Current Location"
    : `${resolvedAddress.split(",")[0]},${resolvedAddress.split(",")[2]}`,
  description: `From ${tempmin}° to ${tempmax}° ${description}`,
  shortenDescription: `${temp}° | ${conditions}`,
  temp,
});

export const parseAlertSection = ({
  alerts,
}: AlertSectionResponseType): AlertSectionDataType =>
  alerts.map(({ event, description, headline, id }) => ({
    title: event,
    description: description,
    footer: headline,
    id,
  }));

export const parseDaySection = ({
  days,
}: DaySectionResponseType): DaySectionDataType => ({
  title: `Forecast ${days.length} Days`,
  days: days.map(({ datetime, icon, tempmin, tempmax }) => ({
    dayOfWeek: new Date(datetime).toString().split(" ")[0] + ".",
    dateTime: datetime,
    icon: icon,
    minTemp: tempmin,
    maxTemp: tempmax,
  })),
});

export const parseHourSection = ({
  days: [{ hours, sunrise, sunset, conditions }],
}: HourSectionResponseType): HourSectionDataType => {
  const parsedHours: HourSectionDataType["hours"] = hours.map(
    ({ datetime: time, temp, icon }) => ({
      time: time.split(":")[0],
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

  const currentHour = Number(new Date().toLocaleTimeString().split(":")[0]);
  parsedHours.slice(currentHour).concat(parsedHours.slice(0, currentHour));

  parsedHours[0].text = "Now";

  return {
    title: conditions,
    hours: parsedHours,
  };
};
