import React from "react";
import { Animated, View } from "react-native";

import { DynamicHeaderDataType } from "../types";
import { styles } from "./styles";

export type DynamicHeaderPropsType = {
  data: DynamicHeaderDataType;
  animatedValues: { [key: string]: Animated.Value };
};

export const DynamicHeader = ({
  data,
  animatedValues,
}: DynamicHeaderPropsType) => {
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
