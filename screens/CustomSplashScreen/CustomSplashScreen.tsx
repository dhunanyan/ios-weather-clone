import * as React from "react";
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  View,
} from "react-native";
import { COLORS } from "@/config";
import { styling } from "./styles";

export const CustomSplashScreen = () => {
  const { width, height } = Dimensions.get("window");
  const styles = styling(width, height);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.activityIndicatorContainer}>
        <ActivityIndicator size="large" color={COLORS.dark.title} />
      </View>
    </SafeAreaView>
  );
};
