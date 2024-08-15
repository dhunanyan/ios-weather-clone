import React from "react";
import { Stack } from "expo-router";

export default () => {
  return (
    <Stack>
      <Stack.Screen name="home" options={{ headerShown: false }} />
    </Stack>
  );
};
