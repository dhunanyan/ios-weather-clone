import {
  COLORS,
  MODAL_SCREEN_Z_INDEX,
  SLIDER_SCREEN_BACKGROUND_Z_INDEX,
} from "@/config";
import { StyleSheet } from "react-native";

export const styling = (height: number) =>
  StyleSheet.create({
    container: {
      position: "absolute",
      top: height,
      left: 8,
      right: 8,
      borderRadius: 25,
      overflow: "hidden",
      zIndex: MODAL_SCREEN_Z_INDEX,

      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
      alignContent: "center",

      // Box shadow for iOS
      shadowColor: "#000",
      shadowOffset: { width: 0, height: -5 },
      shadowOpacity: 0.5,
      shadowRadius: 12,
      // Elevation for Android
      elevation: 10,
    },
    imageBackground: {
      flex: 1,
      width: "100%",
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      zIndex: SLIDER_SCREEN_BACKGROUND_Z_INDEX,
    },
    pressables: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
    pressable: {
      padding: 16,
    },
    pressableText: {
      fontSize: 16,
      color: COLORS.dark.title,
    },
    line: {
      width: 75,
      height: 4,
      backgroundColor: "grey",
      marginVertical: 15,
      borderRadius: 2,
    },
    children: {
      pointerEvents: "none",
    },
  });
