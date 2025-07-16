import { Link } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
      }}
    >
      <Link href={'/home'} asChild >
        <Button title="Home" />
      </Link>
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
