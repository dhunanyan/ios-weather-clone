import { CUSTOM_SPLASH_SCREEN_Z_INDEX } from "@/config";
import { StyleSheet } from "react-native";

export const styling = (width: number, height: number) =>
  StyleSheet.create({
    container: {
      backgroundColor: "#282a46",
      flex: 1,
      maxWidth: width,
      zIndex: CUSTOM_SPLASH_SCREEN_Z_INDEX,
    },
    activityIndicatorContainer: {
      padding: 16,
      minWidth: "100%",
      minHeight: height,
      flex: 1,
      alignContent: "center",
      justifyContent: "center",
    },
  });
