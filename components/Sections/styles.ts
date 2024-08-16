import { Dimensions, StatusBar, StyleSheet } from "react-native";
import { FOOTER_HEIGHT } from "@/config";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    maxWidth: Dimensions.get("window").width,
    zIndex: 1,
  },
  sectionList: {
    padding: 16,
    minWidth: "100%",
    minHeight: Dimensions.get("window").height - FOOTER_HEIGHT,
  },
  activityIndicatorContainer: {
    padding: 16,
    minWidth: "100%",
    minHeight: Dimensions.get("window").height - FOOTER_HEIGHT,
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  errorTextContainer: {
    padding: 16,
    minWidth: "100%",
    minHeight: Dimensions.get("window").height - FOOTER_HEIGHT,
  },
});
