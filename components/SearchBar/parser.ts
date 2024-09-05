import { LocationsType, SuggestionsType } from "@/types";

export const parseSuggestions = (
  data: SuggestionsType,
  query: string
): LocationsType => {
  const lowerCaseQueryArr = query
    .toLowerCase()
    .replaceAll(/,\s*/gi, "@")
    .replaceAll(/\s+/gi, "@")
    .replaceAll(/@+/gi, "@")
    .split("@");

  return data.reduce((acc: LocationsType, item) => {
    item.cities.forEach((name) => {
      const isFound = lowerCaseQueryArr.every(
        (queryPart) =>
          item.country.toLowerCase().includes(queryPart) ||
          item.iso2.toLowerCase().includes(queryPart) ||
          item.iso3.toLowerCase().includes(queryPart) ||
          name.toLowerCase().includes(queryPart)
      );

      if (isFound) {
        const displayText = `${item.country}, ${name}`;
        acc.push({ id: name, name, displayText });
      }
    });

    return acc;
  }, []);
};
