// import { Stack } from "expo-router";
// import { Image } from "react-native";

// export default function RootLayout() {
//   return (
//     <Stack screenOptions={{
//       headerTitle: 'Pokemon Learning App',
//       headerTitleStyle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
//       headerLeft: () => <Image source={require('../assets/images/react-logo.png')} style={{ width: 30, height: 30, marginLeft: 10 }} />,
//       headerStyle: { backgroundColor: '#f5f5f5' },
//     }}>
//       <Stack.Screen name="[name]" options={{
//         presentation: 'formSheet',
//         sheetAllowedDetents: [0.5, 1],
//         sheetCornerRadius: 20,
//         sheetGrabberVisible: true,
//         headerShown: false, // Hide header for sheet
//       }} />
//     </Stack>
//   );
// }

import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{headerShown: false}} />
    

    </Stack>
  )
}
