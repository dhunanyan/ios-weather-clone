import * as React from "react";
import * as SplashScreen from "expo-splash-screen";
import { Stack } from "expo-router";

import { useFonts } from "expo-font";
import "react-native-reanimated";
import { Platform } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    DMSansBold: require("../assets/fonts/DMSans-Bold.ttf"),
    DMSansMedium: require("../assets/fonts/DMSans-Medium.ttf"),
    DMSansRegular: require("../assets/fonts/DMSans-Regular.ttf"),
  });

  React.useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
          contentStyle: {
            marginBottom: Platform.OS === "ios" ? -36 : 0,
          },
        }}
      />
    </Stack>
  );
}
