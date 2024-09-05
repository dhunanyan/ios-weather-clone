import React from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { BlurView } from "expo-blur";

import { HourSectionDataType, LocationType } from "@/types";
import { styles, sliderStyling } from "./styles";
import { COLORS, ICONS } from "@/config";
import { getHourSectionData } from "@/api";

export type HourSectionPropsType = {
  location: LocationType;
};

export const HourSection = ({ location }: HourSectionPropsType) => {
  const [data, setData] = React.useState<HourSectionDataType | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isError, setIsError] = React.useState<boolean>(false);

  React.useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        const hourSectionData = await getHourSectionData(location);
        setData(hourSectionData);
      } catch (error) {
        setIsError(true);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [location]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" color={COLORS.dark.title} />
        </View>
      </View>
    );
  }

  if (isError || data === null) {
    return (
      <View style={styles.container}>
        <View style={styles.errorTextContainer}>
          <Text>Something went wrong</Text>
        </View>
      </View>
    );
  }

  return (
    <BlurView intensity={50} style={styles.container}>
      <Text style={styles.title}>{data.title}</Text>
      <View style={styles.line} />
      <FlatList
        horizontal
        data={data.hours}
        style={styles.slider}
        keyExtractor={(item) => item.time}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          const sliderStyles = sliderStyling(index);

          return (
            <View style={sliderStyles.slide}>
              <Text style={sliderStyles.time}>
                {item.text && item.text === "Now" ? item.text : item.time}
              </Text>
              <View style={sliderStyles.imageContainer}>
                <Image
                  style={sliderStyles.image}
                  source={ICONS[item.icon]}
                  resizeMode="contain"
                />
              </View>
              {item.temp && <Text style={sliderStyles.temp}>{item.temp}°</Text>}
              {item.text && item.text !== "Now" && (
                <Text style={sliderStyles.text}>{item.text}</Text>
              )}
            </View>
          );
        }}
      />
    </BlurView>
  );
};
