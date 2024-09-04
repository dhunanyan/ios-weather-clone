import { COLORS } from "@/config";
import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: "100%",
    marginTop: 5,
    position: "relative",
    zIndex: 1,
  },
  searchBarContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  textInputContainer: {
    backgroundColor: COLORS.dark.backgroundSecondary,
    borderRadius: 8,
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
  },
  searchIcon: {
    color: "#626c80",
    paddingLeft: 8,
  },
  textInput: {
    fontSize: 16,
    width: "100%",
    color: COLORS.dark.title,
    height: 34,
    paddingHorizontal: 8,
  },
  cancelPressable: {
    width: "100%",
  },
  cancelPressableText: {
    color: COLORS.dark.title,
  },
  flatList: {
    backgroundColor: COLORS.dark.background,
    position: "absolute",
    top: 40,
    left: -16,
    right: -16,
    zIndex: 2,
    height: Dimensions.get("window").height - 40,
    width: Dimensions.get("window").width,
  },
  flatListItem: {
    padding: 16,
    borderBottomWidth: 1,
    backgroundColor: "rgba(0, 0, 0, 0.55)",
  },
  flatListItemText: {
    color: COLORS.dark.title,
  },
});
