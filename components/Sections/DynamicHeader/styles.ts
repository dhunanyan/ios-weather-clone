import { StyleSheet } from "react-native";
import { COLORS, IS_PLATFORM } from "@/config";

export const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginBottom: 10,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  location: {
    color: COLORS.dark.title,
    marginBottom: -5,
    fontSize: 30,
    fontWeight: IS_PLATFORM.ANDROID ? "300" : 300,
    lineHeight: 30,
    textAlign: "center",
  },
  temp: {
    color: COLORS.dark.title,
    fontSize: 100,
    fontWeight: IS_PLATFORM.ANDROID ? "300" : 300,
    lineHeight: 100,
    textAlign: "center",
  },
  shortenDescription: {
    textAlign: "center",
    fontSize: 18,
    color: COLORS.dark.subtitle,
    marginTop: 10,
  },
  description: {
    textAlign: "center",
    fontSize: 18,
    color: COLORS.dark.subtitle,
    maxWidth: "80%",
    marginVertical: 5,
  },
});
