import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";


export default function RootLayout() {
  return (
    <React.Fragment>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
    </React.Fragment>
  );
}