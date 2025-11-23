import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Home() {
  return (
    <View className="flex-1 items-center justify-center bg-blue-200">
      <Text className="text-xl font-bold text-red-600">
        <Link href={'/login'}>Navigate to login</Link>
      </Text>
    </View>
  );
}
