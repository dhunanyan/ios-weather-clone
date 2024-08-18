import { StyleSheet } from "react-native";
import { COLORS } from "@/config";

export const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    marginVertical: 10,
    marginBottom: 120,
    paddingHorizontal: 10,
    minHeight: 140,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  title: {
    color: COLORS.dark.title,
    flex: 1,
    fontSize: 13,
    width: "100%",
    justifyContent: "center",
    marginVertical: 10,
    textTransform: "uppercase",
  },
  line: {
    backgroundColor: "#bbb",
    height: 1,
    width: "100%",
  },
  slider: {
    width: "100%",
    flexDirection: "column",
    marginVertical: 10,
  },
});

export const sliderStyling = (isFirstIndex: boolean, isLastIndex: boolean) =>
  StyleSheet.create({
    slide: {
      width: "100%",
      maxHeight: 30 + (isFirstIndex || isLastIndex ? 0 : 5),
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingTop: isFirstIndex ? 0 : 5,
      marginTop: isFirstIndex ? 0 : 5,
      paddingBottom: isLastIndex ? 0 : 5,
      marginBottom: isLastIndex ? 0 : 5,
    },
    dayOfWeek: {
      fontSize: 21,
      fontWeight: 700,
      color: COLORS.dark.title,
      width: 52,
    },
    imageContainer: {
      flex: 1,
      maxWidth: 24,
      height: 41,
    },
    image: {
      flex: 1,
      width: "100%",
      height: "100%",
    },
    range: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: 160,
    },
    progressBar: {
      backgroundColor: COLORS.dark.backgroundSecondary,
      width: 80,
      height: 5,
      borderRadius: 5,
      marginHorizontal: 7,
    },
    minTemp: {
      fontFamily: "DMSansBold",
      fontSize: 18,
      color: COLORS.dark.subtitle,
      opacity: 0.6,
    },
    maxTemp: {
      fontFamily: "DMSansBold",
      fontSize: 18,
      color: COLORS.dark.subtitle,
    },
  });
