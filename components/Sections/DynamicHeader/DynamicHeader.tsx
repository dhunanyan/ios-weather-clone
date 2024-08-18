import React from "react";
import { Animated, Text } from "react-native";

import { DynamicHeaderDataType } from "../types";
import { styles } from "./styles";

export type DynamicHeaderPropsType = {
  data: DynamicHeaderDataType;
  animatedValue: Animated.Value;
};

export const DynamicHeader = ({
  data,
  animatedValue,
}: DynamicHeaderPropsType) => {
  const animate = React.useMemo(
    () => (y1: number, y2: number, start: number, end: number) =>
      animatedValue.interpolate({
        inputRange: [y1, y2],
        outputRange: [start, end],
        extrapolate: "clamp",
      }),
    [animatedValue]
  );

  return (
    <Animated.View style={[styles.container, { top: animate(0, 80, 80, 30) }]}>
      <Animated.Text
        style={[
          styles.location,
          { transform: [{ translateY: animate(0, 120, 25, 0) }] },
        ]}
      >
        {data.location}
      </Animated.Text>
      <Animated.Text
        style={[
          styles.temp,
          {
            opacity: animate(80, 120, 1, 0),
            transform: [{ translateY: animate(0, 120, 20, 0) }],
          },
        ]}
      >
        {data.temp}°
      </Animated.Text>
      <Animated.Text
        style={[
          styles.description,
          {
            opacity: animate(0, 50, 1, 0),
            transform: [{ translateY: animate(0, 120, 15, 0) }],
          },
        ]}
      >
        {data.description}
      </Animated.Text>
      <Animated.Text
        style={[
          styles.shortenDescription,
          {
            opacity: animate(170, 200, 0, 1),
            transform: [{ translateY: animate(160, 200, -165, -170) }],
          },
        ]}
      >
        {data.shortenDescription}
      </Animated.Text>
    </Animated.View>
  );
};
