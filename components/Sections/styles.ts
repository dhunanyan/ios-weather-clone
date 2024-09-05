import { StatusBar, StyleSheet } from "react-native";

export const styling = (width: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight as number,
      maxWidth: width,
      zIndex: 1,
    },
    sectionList: {
      marginTop: 16,
      paddingHorizontal: 16,
      minWidth: "100%",
      height: "100%",
    },
    activityIndicatorContainer: {
      marginTop: 16,
      paddingHorizontal: 16,
      minWidth: "100%",
      flex: 1,
      alignContent: "center",
      justifyContent: "center",
    },
    errorTextContainer: {
      marginTop: 16,
      paddingHorizontal: 16,
      minWidth: "100%",
    },
  });
