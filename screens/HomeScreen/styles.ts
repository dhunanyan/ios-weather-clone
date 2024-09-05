import { StyleSheet } from "react-native";
import { COLORS, SLIDER_SCREEN_BACKGROUND_Z_INDEX } from "@/config";

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
      paddingTop: -60,
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
    deleteCache: {
      backgroundColor: "#303030",
      position: "absolute",
      zIndex: 99999999,
      top: "auto",
      bottom: 60,
      left: 30,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 8,
      // Box shadow for iOS
      shadowColor: "#000",
      shadowOffset: { width: -5, height: 4 },
      shadowOpacity: 0.5,
      shadowRadius: 12,
      // Elevation for Android
      elevation: 10,
    },
    deleteCacheText: {
      color: "#f1f1f1",
      fontWeight: "700",
    },
  });
