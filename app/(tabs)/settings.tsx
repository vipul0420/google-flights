import CustomButton from "@/components/Button";
import { useAuth } from "@/context/authContext";
import Theme from "@/utils/colors";
import { router } from "expo-router";
import { Alert, StyleSheet, Text, View } from "react-native";

const Settings = () => {
  const { user, signOut, loading, session } = useAuth();

  const disabled = session === null;

  const handleSignOut = async () => {
    Alert.alert(
      "Are you sure?",
      "Do you really want to sign out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Sign Out",
          style: "destructive",
          onPress: async () => {
            try {
              await signOut();
              router.replace("/(auth)")
            } catch (error: any) {
              Alert.alert("Error", error.message);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.email}>Logged in as: {user?.email}</Text>

      <CustomButton
        title="Signout"
        theme="secondary"
        onPress={handleSignOut}
        disabled={disabled}
        loading={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.background.primary,
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: Theme.secondary,
  },
  email: {
    fontSize: 16,
    marginBottom: 30,
    color: "#666",
    textDecorationLine: "underline",
  },
});

export default Settings;
