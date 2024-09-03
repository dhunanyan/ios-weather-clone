import * as React from "react";
import {
  Animated,
  FlatList,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import FontAwesome from "@expo/vector-icons/FontAwesome";

import { getSearchSuggestions } from "@/api";
import { ParsedSuggestionsType } from "@/types";

import { parseSuggestions } from "./parser";
import { styles } from "./styles";

export const SearchBar = () => {
  const [query, setQuery] = React.useState("");
  const [suggestions, setSuggestions] = React.useState<ParsedSuggestionsType>(
    []
  );
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  const textInputRef = React.useRef<TextInput>(null);

  const pressableOpacity = React.useRef(new Animated.Value(0)).current;
  const pressableMaxWidth = React.useRef(new Animated.Value(0)).current;
  const pressableMarginLeft = React.useRef(new Animated.Value(0)).current;

  const handleFocus = () => {
    Animated.parallel([
      Animated.timing(pressableMaxWidth, {
        toValue: 50,
        duration: 250,
        useNativeDriver: false,
      }),
      Animated.timing(pressableMarginLeft, {
        toValue: 8,
        duration: 250,
        useNativeDriver: false,
      }),
    ]).start(() =>
      Animated.timing(pressableOpacity, {
        toValue: 1,
        duration: 150,
        useNativeDriver: false,
      }).start()
    );
  };

  const handleBlur = () => {
    Animated.timing(pressableOpacity, {
      toValue: 0,
      duration: 150,
      useNativeDriver: false,
    }).start(() =>
      Animated.parallel([
        Animated.timing(pressableMarginLeft, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(pressableMaxWidth, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start()
    );
  };

  const handleSearch = async (text: string) => {
    setQuery(text);

    if (text.length > 1) {
      setIsError(false);
      return;
    }
    setIsLoading(true);

    try {
      const cachedData = await AsyncStorage.getItem("countries_and_cities");
      if (cachedData) {
        const parsedData = JSON.parse(cachedData) as ParsedSuggestionsType;
        setSuggestions(parsedData);
        setIsError(false);
        setIsLoading(false);
        return;
      }

      const suggestionsData = (await getSearchSuggestions()).data;
      const parsedSuggestions = parseSuggestions(suggestionsData, text);

      setSuggestions(parsedSuggestions);

      await AsyncStorage.setItem(
        "countries_and_cities",
        JSON.stringify(parsedSuggestions)
      );

      setIsError(false);
    } catch (e) {
      setIsError(true);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelPress = () => {
    setQuery("");
    textInputRef.current?.blur();
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <Animated.View style={styles.textInputContainer}>
          <FontAwesome name="search" size={18} style={styles.searchIcon} />
          <TextInput
            ref={textInputRef}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={styles.textInput}
            placeholder="Search for cities or countries"
            value={query}
            onChangeText={handleSearch}
          />
        </Animated.View>
        <Animated.View
          style={[
            styles.cancelPressable,
            {
              opacity: pressableOpacity,
              maxWidth: pressableMaxWidth,
              marginLeft: pressableMarginLeft,
            },
          ]}
        >
          <Pressable onPress={handleCancelPress}>
            <Text style={styles.cancelPressableText}>Cancel</Text>
          </Pressable>
        </Animated.View>
      </View>

      {suggestions.length > 0 && !isLoading && !isError && (
        <FlatList
          data={suggestions}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <Pressable style={styles.resultItem}>
              <Text>{item.displayText}</Text>
            </Pressable>
          )}
          style={styles.resultsList}
        />
      )}
    </View>
  );
};
