import { AuthProvider } from "@/context/authContext";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import "react-native-url-polyfill/auto";

export default function RootLayout() {
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  const isAuthenticated = session !== null;
  console.log(isAuthenticated)
  return (
    <React.Fragment>
      <StatusBar style="auto" />
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Protected guard={isAuthenticated}>
            <Stack.Screen name="(tabs)" />
          </Stack.Protected>

          <Stack.Protected guard={!isAuthenticated}>
            <Stack.Screen name="(auth)/index" />
          </Stack.Protected>
        </Stack>
      </AuthProvider>
    </React.Fragment>
  );
}