import { COLORS, SLIDER_SCREEN_BACKGROUND_Z_INDEX } from "@/config";
import { StyleSheet } from "react-native";

export const styling = (width: number) =>
  StyleSheet.create({
    container: {
      marginVertical: 5,
    },
    containerContent: {
      height: "100%",
      minWidth: "100%",
      paddingHorizontal: 16,
    },
    errorContainer: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    errorIcon: {
      color: COLORS.dark.title,
      marginRight: 10,
    },
    errorText: {
      fontSize: 22,
      fontWeight: "200",
      color: COLORS.dark.title,
    },
    swipeContainer: {
      width: width - 16 * 2,
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      alignContent: "center",
      height: "100%",
      position: "relative",
      borderRadius: 20,
      overflow: "hidden",
    },
    deleteBox: {
      backgroundColor: "red",
      justifyContent: "center",
      alignItems: "center",
      width: 100,
      height: 80,
    },
    imageBackground: {
      flex: 1,
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: SLIDER_SCREEN_BACKGROUND_Z_INDEX,
    },
    contentContainer: {
      padding: 16,
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    contentContainerNotLoaded: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    content: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "space-between",
      height: "100%",
    },
    leftContent: {
      alignItems: "flex-start",
    },
    rightContent: {
      alignItems: "flex-end",
    },
    location: {
      fontSize: 20,
      lineHeight: 20,
      fontWeight: "500",
      color: "#f1f1f1",
    },
    time: {
      fontSize: 12,
      lineHeight: 12,
      fontWeight: "600",
      color: "#f1f1f1",
      marginTop: 5,
    },
    conditions: {
      fontSize: 12,
      lineHeight: 12,
      fontWeight: "500",
      marginTop: 32,
      color: "#f1f1f1",
    },
    temp: {
      fontSize: 50,
      lineHeight: 50,
      fontWeight: "400",
      color: "#f1f1f1",
    },
    minMaxTemp: {
      fontSize: 12,
      lineHeight: 12,
      fontWeight: "500",
      marginTop: 32,
      color: "#f1f1f1",
    },
    deleteContainer: {
      width: 80,
      height: "100%",
      backgroundColor: "#fa4b4b",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 20,
      marginLeft: 5,
    },
  });
