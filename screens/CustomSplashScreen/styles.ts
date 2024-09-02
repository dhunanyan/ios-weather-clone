import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#282a46",
    flex: 1,
    maxWidth: Dimensions.get("window").width,
    zIndex: 1,
  },
  activityIndicatorContainer: {
    padding: 16,
    minWidth: "100%",
    minHeight: Dimensions.get("window").height,
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
});
