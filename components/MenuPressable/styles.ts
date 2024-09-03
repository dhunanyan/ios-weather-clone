import { StyleSheet } from "react-native";
import { COLORS } from "@/config";

export const styles = StyleSheet.create({
  container: {
    minWidth: "100%",
    position: "relative",
    minHeight: 92,
    borderRadius: 20,
    marginVertical: 5,
    backgroundColor: COLORS.dark.backgroundSecondary,
    overflow: "hidden",
  },
  imageBackground: {
    flex: 1,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1,
  },
  contentContainer: {
    padding: 16,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
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
});
