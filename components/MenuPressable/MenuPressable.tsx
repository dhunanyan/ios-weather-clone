import * as React from "react";

import {
  Animated,
  ImageBackground,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { BlurView } from "expo-blur";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "@expo/vector-icons/Ionicons";

import { getWeather } from "@/api";

import { MenuPressableDataType, parseToMenuPressable } from "./parser";

import { LocationType, WeatherType } from "@/types";
import { IMAGES } from "@/config";
import { styles } from "./styles";

export type MenuPressablePropsType = {
  location: LocationType;
};

export const MenuPressable = ({ location }: MenuPressablePropsType) => {
  const [data, setData] = React.useState<MenuPressableDataType | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isError, setIsError] = React.useState<boolean>(false);

  const deleteContainerTranslate = React.useRef(new Animated.Value(80)).current;
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
      useNativeDriver: false,
    })(e);

    if ((scrollX as any)._value > 0) {
      Animated.timing(deleteContainerTranslate, {
        toValue: 0,
        duration: 50,
        useNativeDriver: false,
      }).start();
    }

    if ((scrollX as any)._value < 80) {
      Animated.timing(deleteContainerTranslate, {
        toValue: 80,
        duration: 50,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleDelete = () => {
    // Call a parent function to delete the item from the list
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const cachedData = await AsyncStorage.getItem(
          `weather_menu_${location.id}`
        );

        if (cachedData) {
          const parsedData = JSON.parse(cachedData) as MenuPressableDataType;

          setData(parsedData);
          setIsLoading(false);
          return;
        }

        const response = (await getWeather(location.name)) as WeatherType;
        const menuPressableData = parseToMenuPressable(response, location);

        await AsyncStorage.setItem(
          `weather_menu_${location.id}`,
          JSON.stringify(menuPressableData)
        );

        setData(menuPressableData);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [location]);

  if (isLoading) {
    return <View style={styles.container} />;
  }

  if (data === null || isError) {
    return <View style={styles.container}>Error</View>;
  }

  return (
    <ScrollView
      style={styles.container}
      onScroll={handleScroll}
      horizontal
      contentContainerStyle={styles.containerContent}
      showsHorizontalScrollIndicator={false}
    >
      <View style={[styles.swipeContainer]}>
        <ImageBackground
          source={IMAGES.background}
          resizeMode="stretch"
          style={styles.imageBackground}
        />
        <BlurView intensity={26} style={styles.contentContainer}>
          <View style={[styles.content, styles.leftContent]}>
            <Text style={styles.location}>{data.location}</Text>
            <Text style={styles.time}>{data.time}</Text>
            <Text style={styles.conditions}>{data.conditions}</Text>
          </View>
          <View style={[styles.content, styles.rightContent]}>
            <Text style={styles.temp}>{data.temp}</Text>
            <Text style={styles.minMaxTemp}>{data.minMaxTemp}</Text>
          </View>
        </BlurView>
      </View>
      <Animated.View
        style={[
          styles.deleteContainer,
          { transform: [{ translateX: deleteContainerTranslate }] },
        ]}
      >
        <Pressable onPress={handleDelete}>
          <Ionicons name="trash" size={24} color="white" />
        </Pressable>
      </Animated.View>
    </ScrollView>
  );
};
