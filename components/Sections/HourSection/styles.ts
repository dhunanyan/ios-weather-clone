import { StyleSheet } from "react-native";
import { COLORS } from "@/config";

export const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    marginVertical: 10,
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
  },
  line: {
    backgroundColor: "#bbb",
    height: 1,
    width: "100%",
  },
  slider: {
    height: 80,
    flexDirection: "row",
    marginVertical: 10,
  },
});

export const sliderStyling = (index: number) =>
  StyleSheet.create({
    slide: {
      flexDirection: "column",
      alignItems: "center",
      paddingLeft: index === 0 ? 0 : 5,
      marginLeft: index === 0 ? 0 : 5,
      paddingRight: index === 23 ? 0 : 5,
      marginRight: index === 23 ? 0 : 5,
    },
    time: {
      fontSize: 13,
      color: COLORS.dark.title,
    },
    imageContainer: {
      flex: 1,
      width: 24,
    },
    image: {
      flex: 1,
      width: "100%",
    },
    temp: {
      fontFamily: "DMSansBold",
      fontSize: 18,
      fontWeight: 700,
      color: COLORS.dark.subtitle,
    },
  });
