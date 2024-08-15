import React from "react";
import { FlatList, Image, Text, View } from "react-native";
import { BlurView } from "expo-blur";

import { HourSectionDataType } from "../types";
import { styles, sliderStyling } from "./styles";
import { ICONS } from "@/config";

export type HourSectionPropsType = {
  data: HourSectionDataType;
};

export const HourSection = ({ data }: HourSectionPropsType) => (
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
            <Text style={sliderStyles.time}>{item.time}</Text>
            <View style={sliderStyles.imageContainer}>
              <Image
                style={sliderStyles.image}
                source={ICONS[item.icon]}
                resizeMode="contain"
              />
            </View>
            <Text style={sliderStyles.temp}>{item.temp}°</Text>
          </View>
        );
      }}
    />
  </BlurView>
);
