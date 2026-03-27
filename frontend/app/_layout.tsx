import 'react-native-get-random-values';
import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <StatusBar style="dark" />
          <Stack initialRouteName="(auth)" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen
              name="resident-detail"
              options={{
                presentation: 'card',
              }}
            />
            <Stack.Screen
              name="announcement-detail"
              options={{
                presentation: 'card',
              }}
            />
            <Stack.Screen
              name="event-detail"
              options={{
                presentation: 'card',
              }}
            />
            <Stack.Screen
              name="maintenance-detail"
              options={{
                presentation: 'card',
              }}
            />
          </Stack>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
