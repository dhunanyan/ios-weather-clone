import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  imageBackground: {
    flex: 1,
    width: "100%",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    zIndex: -1,
  },
});
