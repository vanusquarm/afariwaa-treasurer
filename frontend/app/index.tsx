import { Redirect } from 'expo-router';
import { Platform } from 'react-native';

export default function Index() {
  return <Redirect href={Platform.OS === 'web' ? '/(tabs)' : '/(auth)/login'} />;
}
