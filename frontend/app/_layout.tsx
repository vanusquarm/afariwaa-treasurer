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
          <StatusBar barStyle="dark-content" />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen
              name="resident-detail"
              options={{
                presentation: 'card',
                animationEnabled: true,
              }}
            />
            <Stack.Screen
              name="announcement-detail"
              options={{
                presentation: 'card',
                animationEnabled: true,
              }}
            />
            <Stack.Screen
              name="event-detail"
              options={{
                presentation: 'card',
                animationEnabled: true,
              }}
            />
            <Stack.Screen
              name="maintenance-detail"
              options={{
                presentation: 'card',
                animationEnabled: true,
              }}
            />
          </Stack>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
