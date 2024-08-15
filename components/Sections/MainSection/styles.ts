import { StyleSheet } from "react-native";
import { COLORS } from "@/config";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 65,
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
    fontSize: 86,
    fontWeight: 300,
    lineHeight: 86,
    textAlign: "center",
    marginTop: 10,
  },
  description: {
    textAlign: "center",
    fontSize: 18,
    color: COLORS.dark.subtitle,
    maxWidth: "80%",
  },
  range: {
    textAlign: "center",
    fontSize: 18,
    color: COLORS.dark.subtitle,
  },
});
