import * as React from "react";
import { ImageBackground, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getWeather } from "@/api";

import { MenuPressableDataType, parseToMenuPressable } from "./parser";

import { LocationType, WeatherType } from "@/types";
import { IMAGES } from "@/config";
import { styles } from "./styles";
import { BlurView } from "expo-blur";

export type MenuPressablePropsType = {
  location: LocationType;
};

export const MenuPressable = ({ location }: MenuPressablePropsType) => {
  const [data, setData] = React.useState<MenuPressableDataType | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isError, setIsError] = React.useState<boolean>(false);

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
    <View style={styles.container}>
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
  );
};
