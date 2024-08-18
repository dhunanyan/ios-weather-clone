import React from "react";
import { Text, View } from "react-native";
import { BlurView } from "expo-blur";
import Foundation from "@expo/vector-icons/Foundation";

import { styles } from "./styles";
import { WeatherAlertType } from "@/types";
import { AlertSectionDataType } from "../types";
import { COLORS } from "@/config";

export type AlertSectionPropsType = {
  data: AlertSectionDataType;
};

export const AlertSection = ({ data: { alerts } }: AlertSectionPropsType) => (
  <View style={styles.container}>
    {alerts.map(({ title, description, info, id }) => (
      <BlurView key={id} intensity={50} style={styles.alertContainer}>
        <View style={styles.titleContainer}>
          <Foundation style={styles.icon} name="alert" size={24} />
          <Text style={styles.title}>{title}</Text>
        </View>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.info}>{info}</Text>
      </BlurView>
    ))}
  </View>
);
