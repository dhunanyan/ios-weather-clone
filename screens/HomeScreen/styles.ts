import { StyleSheet } from "react-native";
import { COLORS } from "@/config";

export const styling = (width: number, height: number) =>
  StyleSheet.create({
    container: {
      position: "relative",
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      height: height,
      width: width,
      padding: 0,
      backgroundColor: COLORS.dark.background,
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      height: height,
      width: width,
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
