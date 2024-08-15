import React from "react";
import { Pressable, View } from "react-native";
import { BlurView } from "expo-blur";

import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { COLORS } from "@/config";
import { styles } from "./styles";

export type FooterPropsType = {
  activeSlideId: string;
  buttons: string[];
  onButtonPress: (index: number) => void;
};

export const Footer = ({
  activeSlideId,
  buttons,
  onButtonPress,
}: FooterPropsType) => {
  return (
    <BlurView intensity={50} style={styles.container}>
      <Pressable style={styles.mapButton}>
        <FontAwesome6 name="map-location" size={24} color={COLORS.dark.title} />
      </Pressable>
      <View style={styles.slideButtons}>
        {buttons.map((id, index) => (
          <Pressable
            key={id}
            style={[styles.slideButton]}
            onPress={() => onButtonPress(index)}
          >
            <View
              style={[
                styles.slideDot,
                {
                  backgroundColor:
                    activeSlideId === id
                      ? COLORS.dark.title
                      : "rgba(255, 255, 255, 0.15)",
                },
              ]}
            />
          </Pressable>
        ))}
      </View>
      <Pressable style={styles.menuButton}>
        <MaterialCommunityIcons
          name="menu"
          size={32}
          color={COLORS.dark.title}
        />
      </Pressable>
    </BlurView>
  );
};
