import { StyleSheet } from "react-native";
import { COLORS } from "@/config";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.dark.background,
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 16,
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 9999999,
    overflow: "hidden",
    // Box shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: -20, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    // Elevation for Android
    elevation: 10,
  },
  pressable: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 5,
    marginRight: "auto",
  },
  icon: {
    height: "100%",
    color: COLORS.dark.title,
    marginRight: 2.5,
  },
  title: {
    height: "100%",
    lineHeight: 22,
    fontSize: 22,
    color: COLORS.dark.title,
  },
  flatList: {
    width: "100%",
  },
});
