import { Dimensions, StyleSheet } from "react-native";
import { COLORS } from "@/config";

export const styling = (width: number, height: number) =>
  StyleSheet.create({
    container: {
      backgroundColor: COLORS.dark.background,
      justifyContent: "center",
      flex: 1,
      padding: 0,
      position: "relative",
    },
    imageBackground: {
      flex: 1,
      height: height,
      width: width,
      position: "absolute",
      top: 0,
      left: 0,
      zIndex: 1,
    },
    activityIndicatorContainer: {
      padding: 16,
      height: height,
      width: width,
      flex: 1,
      alignContent: "center",
      justifyContent: "center",
    },
    errorTextContainer: {
      padding: 16,
      height: height,
      width: width,
    },
  });
