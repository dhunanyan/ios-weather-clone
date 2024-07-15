import React from "react";
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
} from "react-native";

import { COLORS } from "@/constants";

export type HomeScreenProps = {
  navigation?: any;
};

// THIS IS OnBoarding screen from the https://www.youtube.com/watch?v=7ZkwC8NKPzM&list=PLahfUqRzswtQo_i9hhfnQ_LU3toCM_7U-

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { width, height } = Dimensions.get("window");

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.dark.background} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.dark.background,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
