import React from "react";
import { Animated, Dimensions, Pressable, View } from "react-native";
import { BlurView } from "expo-blur";

import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { COLORS } from "@/config";

import { styles } from "./styles";

export type FooterPropsType = {
  buttons: Array<string>;
  onMenuIconPress: () => void;
  scrollX: Animated.Value;
};

export const Footer = ({
  buttons,
  onMenuIconPress,
  scrollX,
}: FooterPropsType) => {
  return (
    <BlurView intensity={50} style={styles.container}>
      <Pressable style={styles.mapButton}>
        <FontAwesome6 name="map-location" size={24} color={COLORS.dark.title} />
      </Pressable>
      <View style={styles.slideButtons}>
        {buttons.map((id, index) => {
          const { width } = Dimensions.get("window");

          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [7, 30, 7],
            extrapolate: "clamp",
          });

          const dotColor = scrollX.interpolate({
            inputRange,
            outputRange: [
              "rgba(255, 255, 255, 0.15)",
              COLORS.dark.title,
              "rgba(255, 255, 255, 0.15)",
            ],
            extrapolate: "clamp",
          });

          return (
            <Pressable key={id} style={[styles.slideButton]}>
              <Animated.View
                style={[
                  styles.slideDot,
                  {
                    width: dotWidth,
                    backgroundColor: dotColor,
                  },
                ]}
              />
            </Pressable>
          );
        })}
      </View>
      <Pressable style={styles.menuButton} onPress={onMenuIconPress}>
        <MaterialCommunityIcons
          name="menu"
          size={32}
          color={COLORS.dark.title}
        />
      </Pressable>
    </BlurView>
  );
};
