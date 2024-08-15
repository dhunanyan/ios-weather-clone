import { StyleSheet } from "react-native";
import { FOOTER_HEIGHT } from "@/config";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    height: FOOTER_HEIGHT,
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "space-between",
    flexDirection: "row",
    resizeMode: "contain",
    paddingLeft: 30,
    paddingRight: 30,
    borderTopWidth: 1,
    borderTopColor: "#bbb",
  },
  mapButton: {
    paddingTop: 10,
  },
  menuButton: {
    paddingTop: 4,
  },
  slideButtons: {
    paddingTop: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    resizeMode: "contain",
  },
  slideButton: {
    padding: 6,
  },
  slideDot: {
    borderRadius: 7 / 2,
    width: 7,
    height: 7,
  },
});
