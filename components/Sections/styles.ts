import { Dimensions, StatusBar, StyleSheet } from "react-native";
import { FOOTER_HEIGHT } from "@/config";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    zIndex: 1,
  },
  sectionList: {
    padding: 16,
    maxWidth: Dimensions.get("window").width,
    minHeight: Dimensions.get("window").height - FOOTER_HEIGHT - 48,
  },
});
