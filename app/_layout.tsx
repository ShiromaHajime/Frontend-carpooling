import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import '../global.css';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ToastProvider } from '@/components/Toast';
import { GlobalProvider } from '@/utils/Provider';
import { useAuth0, Auth0Provider } from 'react-native-auth0';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GlobalProvider>
      <ToastProvider position="top">
        <Auth0Provider domain={"dev-voifjkzdk2go4y1p.us.auth0.com"} clientId={"j60v2zaXLYBkylThZBPAm35tErH6ZmQF"}>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="test" options={{ headerShown: false }} />
            <Stack.Screen name="(account)" options={{ headerShown: false }} />
            <Stack.Screen name="(home)" options={{ headerShown: false }} />
          </Stack>
        </Auth0Provider>
      </ToastProvider>
    </GlobalProvider>
  );
}
