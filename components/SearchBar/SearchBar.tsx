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

import { addLocation, getSearchSuggestions } from "@/api";
import { ParsedSuggestionsType, SuggestionsType } from "@/types";

import { parseSuggestions } from "./parser";
import { styles } from "./styles";

export type SearchBarPropsType = {
  menuScreenOverflowOpacity: Animated.Value;
  menuScreenPressableOpacity: Animated.Value;
  menuScreenInnerContainerTranslateY: Animated.Value;
};

export const SearchBar = ({
  menuScreenOverflowOpacity,
  menuScreenPressableOpacity,
  menuScreenInnerContainerTranslateY,
}: SearchBarPropsType) => {
  const [query, setQuery] = React.useState("");
  const [suggestions, setSuggestions] = React.useState<ParsedSuggestionsType>(
    []
  );
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  const textInputRef = React.useRef<TextInput>(null);

  const containerMarginBottom = React.useRef(new Animated.Value(10)).current;
  const pressableOpacity = React.useRef(new Animated.Value(0)).current;
  const pressableMaxWidth = React.useRef(new Animated.Value(0)).current;
  const pressableMarginLeft = React.useRef(new Animated.Value(0)).current;

  const handleFocus = () => {
    Animated.parallel([
      Animated.timing(menuScreenPressableOpacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }),
      Animated.timing(menuScreenOverflowOpacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: false,
      }),
    ]).start(() =>
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
        Animated.timing(containerMarginBottom, {
          toValue: 0,
          duration: 250,
          useNativeDriver: false,
        }),
        Animated.timing(menuScreenInnerContainerTranslateY, {
          toValue: -50,
          duration: 250,
          useNativeDriver: false,
        }),
      ]).start(() =>
        Animated.timing(pressableOpacity, {
          toValue: 1,
          duration: 150,
          useNativeDriver: false,
        }).start()
      )
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
        Animated.timing(containerMarginBottom, {
          toValue: 10,
          duration: 250,
          useNativeDriver: false,
        }),
        Animated.timing(menuScreenInnerContainerTranslateY, {
          toValue: 0,
          duration: 250,
          useNativeDriver: false,
        }),
        Animated.timing(menuScreenOverflowOpacity, {
          toValue: 0,
          duration: 250,
          useNativeDriver: false,
        }),
        Animated.timing(menuScreenPressableOpacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: false,
        }),
      ]).start()
    );
  };

  const handleSearch = async (text: string) => {
    setQuery(text);

    if (!text.length) {
      setIsError(false);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);

    try {
      const cachedData = await AsyncStorage.getItem("countries_and_cities");

      if (cachedData) {
        const parsedData = JSON.parse(cachedData) as SuggestionsType;
        const parsedSuggestions = parseSuggestions(parsedData, text);
        setSuggestions(parsedSuggestions);
        setIsError(false);
        setIsLoading(false);
        return;
      }

      const suggestionsData = (await getSearchSuggestions()).data;
      await AsyncStorage.setItem(
        "countries_and_cities",
        JSON.stringify(suggestionsData)
      );

      const parsedSuggestions = parseSuggestions(suggestionsData, text);
      setSuggestions(parsedSuggestions);
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

  const handleSuggestionPress = async (city: string) => {
    // OPEN MODAL LOGIC
  };

  return (
    <Animated.View
      style={[styles.container, { marginBottom: containerMarginBottom }]}
    >
      <View style={styles.searchBarContainer}>
        <Animated.View style={styles.textInputContainer}>
          <FontAwesome name="search" size={18} style={styles.searchIcon} />
          <TextInput
            ref={textInputRef}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={styles.textInput}
            placeholderTextColor="#626c80"
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

      {!!query && suggestions.length > 0 && !isError && (
        <FlatList
          style={styles.flatList}
          data={suggestions}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <Pressable
              style={styles.flatListItem}
              onPress={() => handleSuggestionPress(item.city)}
            >
              {!isLoading && (
                <Text style={styles.flatListItemText}>{item.displayText}</Text>
              )}
            </Pressable>
          )}
        />
      )}
    </Animated.View>
  );
};
