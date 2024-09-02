import * as React from "react";
import * as SplashScreen from "expo-splash-screen";
import { Stack } from "expo-router";

import { useFonts } from "expo-font";
import "react-native-reanimated";
import { IS_PLATFORM } from "@/config";

import { CustomSplashScreen } from "@/screens";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isAppReady, setAppReady] = React.useState(false);

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    DMSansBold: require("../assets/fonts/DMSans-Bold.ttf"),
    DMSansMedium: require("../assets/fonts/DMSans-Medium.ttf"),
    DMSansRegular: require("../assets/fonts/DMSans-Regular.ttf"),
  });

  React.useEffect(() => {
    if (loaded) {
      setAppReady(true);
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!isAppReady) {
    return <CustomSplashScreen />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
          contentStyle: {
            marginBottom: IS_PLATFORM.IOS ? -36 : 0,
          },
        }}
      />
    </Stack>
  );
}
