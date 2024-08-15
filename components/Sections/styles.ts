import { Dimensions, StatusBar, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: "100%",
    paddingTop: StatusBar.currentHeight,
    zIndex: 1,
  },
  scrollView: {
    height: "100%",
  },
  sectionList: {
    padding: 16,
    maxWidth: Dimensions.get("window").width,
  },
});
