import React from "react";
import { ActivityIndicator, Animated, Text, View } from "react-native";

import { getHeaderSectionData } from "@/api";

import {
  AnimatedValuesType,
  HeaderSectionDataType,
  LocationType,
} from "@/types";
import { COLORS } from "@/config";

import { styles } from "./styles";

export type HeaderSectionPropsType = {
  location: LocationType;
  animatedValues: AnimatedValuesType;
};

export const HeaderSection = ({
  location,
  animatedValues,
}: HeaderSectionPropsType) => {
  const {
    containerMaxHeight,
    locationTranslateY,
    shortenDescriptionOpacity,
    shortenDescriptionTransform,
    tempOpacity,
    tempTransform,
    descriptionOpacity,
    descriptionTransform,
  } = animatedValues;
  const [data, setData] = React.useState<HeaderSectionDataType | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isError, setIsError] = React.useState<boolean>(false);

  React.useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        const headerSectionData = await getHeaderSectionData(location);

        setData(headerSectionData);
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
    <Animated.View
      style={[styles.container, { maxHeight: containerMaxHeight }]}
    >
      <Animated.Text
        style={[
          styles.location,
          { transform: [{ translateY: locationTranslateY }] },
        ]}
      >
        {data.location}
      </Animated.Text>
      <Animated.Text
        style={[
          styles.shortenDescription,
          {
            opacity: shortenDescriptionOpacity,
            transform: [{ translateY: shortenDescriptionTransform }],
          },
        ]}
      >
        {data.shortenDescription}
      </Animated.Text>
      <Animated.Text
        style={[
          styles.temp,
          {
            opacity: tempOpacity,
            transform: [{ translateY: tempTransform }],
          },
        ]}
      >
        {data.temp}°
      </Animated.Text>
      <Animated.Text
        style={[
          styles.description,
          {
            opacity: descriptionOpacity,
            transform: [{ translateY: descriptionTransform }],
          },
        ]}
      >
        {data.description}
      </Animated.Text>
    </Animated.View>
  );
};
