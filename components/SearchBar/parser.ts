import { ParsedSuggestionsType, SuggestionsType } from "@/types";

export const parseSuggestions = (
  data: SuggestionsType,
  query: string
): ParsedSuggestionsType => {
  const lowerCaseQuery = query.toLowerCase();

  const filteredData = data.reduce((acc: ParsedSuggestionsType, item) => {
    item.cities.forEach((city) => {
      const isFound =
        item.country.toLowerCase().includes(lowerCaseQuery) ||
        item.iso2.toLowerCase().includes(lowerCaseQuery) ||
        item.iso3.toLowerCase().includes(lowerCaseQuery) ||
        city.toLowerCase().includes(lowerCaseQuery);

      if (isFound) {
        const displayText = `${item.country}, ${city}`;
        acc.push({ city, displayText });
      }
    });

    return acc;
  }, []);

  return filteredData;
};
