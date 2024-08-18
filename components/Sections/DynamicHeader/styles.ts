import { StyleSheet } from "react-native";
import { COLORS } from "@/config";

export const styles = StyleSheet.create({
  container: {
    zIndex: 2,
    justifyContent: "flex-start",
    alignItems: "center",
    left: 0,
    right: 0,
    pointerEvents: "none",
    overflow: "hidden",
  },
  location: {
    color: COLORS.dark.title,
    fontSize: 30,
    fontWeight: 500,
    lineHeight: 30,
    textAlign: "center",
  },
  temp: {
    color: COLORS.dark.title,
    fontSize: 100,
    fontWeight: 300,
    lineHeight: 100,
    textAlign: "center",
    marginTop: 10,
  },
  shortenDescription: {
    textAlign: "center",
    fontSize: 18,
    color: COLORS.dark.subtitle,
    marginVertical: 5,
  },
  description: {
    textAlign: "center",
    fontSize: 18,
    color: COLORS.dark.subtitle,
    maxWidth: "80%",
    marginVertical: 5,
  },
});
