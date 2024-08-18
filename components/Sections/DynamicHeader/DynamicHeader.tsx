import React from "react";
import { Animated, Text } from "react-native";

import { DynamicHeaderDataType } from "../types";
import { styles } from "./styles";
import { HEADER_OFFSET } from "@/config";

export type DynamicHeaderPropsType = {
  data: DynamicHeaderDataType;
  animatedValue: Animated.Value;
};

export const DynamicHeader = ({
  data,
  animatedValue,
}: DynamicHeaderPropsType) => {
  const {
    opacityDescription,
    opacityTemp,
    translateHeader,
    opacityShortenDescription,
    translateShortenDescription,
  } = React.useMemo(() => {
    return {
      opacityDescription: animatedValue.interpolate({
        inputRange: [0, 20],
        outputRange: [1, 0],
        extrapolate: "clamp",
      }),
      opacityTemp: animatedValue.interpolate({
        inputRange: [80, 130],
        outputRange: [1, 0],
        extrapolate: "clamp",
      }),
      translateHeader: animatedValue.interpolate({
        inputRange: [0, 200],
        outputRange: [0, -HEADER_OFFSET],
        extrapolate: "clamp",
      }),
      opacityShortenDescription: animatedValue.interpolate({
        inputRange: [170, 200],
        outputRange: [0, 1],
        extrapolate: "clamp",
      }),
      translateShortenDescription: animatedValue.interpolate({
        inputRange: [160, 200],
        outputRange: [-170, -185],
        extrapolate: "clamp",
      }),
    };
  }, [animatedValue]);

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ translateY: translateHeader }] },
      ]}
    >
      <Animated.Text style={[styles.location]}>{data.location}</Animated.Text>
      <Animated.Text style={[styles.temp, { opacity: opacityTemp }]}>
        {data.temp}°
      </Animated.Text>
      <Animated.Text
        style={[styles.description, { opacity: opacityDescription }]}
      >
        {data.description}
      </Animated.Text>
      <Animated.Text
        style={[
          styles.shortenDescription,
          {
            opacity: opacityShortenDescription,
            transform: [{ translateY: translateShortenDescription }],
          },
        ]}
      >
        {data.shortenDescription}
      </Animated.Text>
    </Animated.View>
  );
};
