import { StyleSheet } from "react-native";
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
  });
