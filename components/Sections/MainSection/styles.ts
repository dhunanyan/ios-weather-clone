import { StyleSheet } from "react-native";
import { COLORS } from "@/config";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 65,
    marginBottom: 40,
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
  description: {
    textAlign: "center",
    fontSize: 18,
    color: COLORS.dark.subtitle,
    maxWidth: "80%",
    marginTop: -5,
  },
});
