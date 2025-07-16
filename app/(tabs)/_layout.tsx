import Theme from "@/utils/colors";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Theme.white,
        tabBarInactiveTintColor: Theme.secondary,
        tabBarStyle: {
          backgroundColor: Theme.background.primary,
          height: 65,
        },
        tabBarLabelStyle: {
          fontSize: 14,
        },
        tabBarIconStyle: {
          marginBottom: 2,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Flights",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "lock-closed" : "lock-closed-outline"}
              size={20}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "settings" : "settings-outline"}
              size={20}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
