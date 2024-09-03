import * as React from "react";
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  FlatList,
  PanResponder,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getLocations, getUserLocation } from "@/api";
import { COLORS } from "@/config";

import { SliderScreen } from "../SliderScreen";
import { MenuScreen } from "../MenuScreen";

import { LocationsType } from "@/types";

import { styling } from "./styles";

export const HomeScreen = () => {
  const { width, height } = Dimensions.get("window");
  const styles = styling(width, height);

  const [locations, setLocations] = React.useState<LocationsType>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isError, setIsError] = React.useState<boolean>(false);

  const slideAnim = React.useRef(new Animated.Value(1)).current;
  const menuVisible = React.useRef(1);

  const toggleMenu = (value: number) => {
    menuVisible.current = value;

    return Animated.timing(slideAnim, {
      toValue: value,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handlePanResponder = React.useMemo(() => {
    return PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
      },
      onPanResponderMove: (_, gestureState) => {
        const newValue = Math.min(Math.max(gestureState.dx / width, 0), 1);
        slideAnim.setValue(newValue);
      },
      onPanResponderRelease: (_, gestureState) => {
        const threshold = 0.5;
        const toValue = gestureState.dx / width > threshold ? 1 : 0;
        toggleMenu(toValue);
      },
    });
  }, []);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const cachedData = await AsyncStorage.getItem("weather_locations");
        if (cachedData) {
          const parsedData = JSON.parse(cachedData) as LocationsType;
          setLocations(parsedData);
          setIsLoading(false);
          setIsError(false);
          return;
        }
        const locationsData = await getLocations();

        const userLocation = await getUserLocation();

        if (userLocation !== null) {
          locationsData.unshift({
            id: "CURRENT_LOCATION",
            name: userLocation,
            displayName: "Current Location",
          });
        }

        await AsyncStorage.setItem(
          "weather_locations",
          JSON.stringify(locationsData)
        );

        setLocations(locationsData);
        setIsLoading(false);
        setIsError(false);
      } catch (error) {
        setIsError(true);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" color={COLORS.dark.title} />
        </View>
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorTextContainer}>
          <Text>Something went wrong when fetching locations</Text>
        </View>
      </SafeAreaView>
    );
  }

  const menuTranslateX = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width],
  });

  return (
    <SafeAreaView style={styles.container}>
      <SliderScreen
        locations={locations}
        onMenuIconPress={() => toggleMenu(0)}
      />
      {menuTranslateX && (
        <MenuScreen
          panResponder={handlePanResponder}
          onGoBackPress={() => toggleMenu(1)}
          translateXValue={menuTranslateX}
          locations={locations}
        />
      )}
    </SafeAreaView>
  );
};
