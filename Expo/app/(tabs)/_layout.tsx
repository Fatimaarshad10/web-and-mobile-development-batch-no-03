import { Tabs } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function RootLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'red' }}>

      <Tabs.Screen name="index" options={{
        title: "Home", tabBarIcon: ({ color }) => (
          <FontAwesome name="home" size={24} color={color} />
        )
      }} />
      <Tabs.Screen name="login" options={{ title: "Login" }} />

    </Tabs>
  )
}
