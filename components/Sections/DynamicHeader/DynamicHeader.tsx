import React from "react";
import { Animated, View } from "react-native";

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
    () => (inputRange: number[], outputRange: string[] | number[]) =>
      animatedValue.interpolate({
        inputRange: inputRange,
        outputRange: outputRange,
        extrapolate: "clamp",
      }),
    [animatedValue]
  );

  return (
    <Animated.View
      style={[styles.container, { maxHeight: animate([0, 120], [250, 50]) }]}
    >
      <Animated.Text
        style={[
          styles.location,
          { transform: [{ translateY: animate([0, 60], [25, 0]) }] },
        ]}
      >
        {data.location}
      </Animated.Text>
      <Animated.Text
        style={[
          styles.shortenDescription,
          {
            opacity: animate([0, 20, 80], [0, 0, 1]),
            transform: [{ translateY: animate([0, 80], [-10, 0]) }],
          },
        ]}
      >
        {data.shortenDescription}
      </Animated.Text>
      <Animated.Text
        style={[
          styles.temp,
          {
            opacity: animate([0, 60], [1, 0]),
            transform: [{ translateY: animate([0, 60], [20, 0]) }],
          },
        ]}
      >
        {data.temp}°
      </Animated.Text>
      <Animated.Text
        style={[
          styles.description,
          {
            opacity: animate([0, 20], [1, 0]),
            transform: [{ translateY: animate([0, 20], [15, 0]) }],
          },
        ]}
      >
        {data.description}
      </Animated.Text>
    </Animated.View>
  );
};
