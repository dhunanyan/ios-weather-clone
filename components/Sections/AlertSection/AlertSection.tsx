import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { BlurView } from "expo-blur";
import Foundation from "@expo/vector-icons/Foundation";

import { AlertSectionDataType, LocationType } from "@/types";
import { COLORS } from "@/config";

import { styles } from "./styles";
import { getAlertSectionData } from "@/api";

export type AlertSectionPropsType = {
  location: LocationType;
};

export const AlertSection = ({ location }: AlertSectionPropsType) => {
  const [data, setData] = React.useState<AlertSectionDataType | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isError, setIsError] = React.useState<boolean>(false);

  React.useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        const alertSectionData = await getAlertSectionData(location);

        setData(alertSectionData);
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

  if (!data.length) {
    return null;
  }

  return (
    <View style={styles.container}>
      {data.map(({ title, description, footer, id }) => (
        <BlurView key={id} intensity={50} style={styles.alertContainer}>
          <View style={styles.titleContainer}>
            <Foundation style={styles.icon} name="alert" size={24} />
            <Text style={styles.title}>{title}</Text>
          </View>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.footer}>{footer}</Text>
        </BlurView>
      ))}
    </View>
  );
};
