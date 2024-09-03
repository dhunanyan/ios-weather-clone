import { COLORS } from "@/config";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 34,
    width: "100%",
    marginVertical: 5,
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
    color: COLORS.dark.background,
    paddingHorizontal: 8,
  },
  textInput: {
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
  resultsList: {
    maxHeight: 200,
  },
  resultItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});
