import * as React from "react";
import { ActivityIndicator, SafeAreaView, View } from "react-native";
import { COLORS } from "@/config";
import { styles } from "./styles";

export const CustomSplashScreen = () => (
  <SafeAreaView style={styles.container}>
    <View style={styles.activityIndicatorContainer}>
      <ActivityIndicator size="large" color={COLORS.dark.title} />
    </View>
  </SafeAreaView>
);
