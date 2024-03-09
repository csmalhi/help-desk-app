import React, { useEffect, useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Stack, router } from 'expo-router';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { auth, db } from '../firebase'
import { useColorScheme } from '@/components/useColorScheme';
import { doc, getDoc } from "firebase/firestore";
import * as SplashScreen from 'expo-splash-screen';
import '../firebase';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tickets)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  const colorScheme = useColorScheme();

  const getUserFromDb = async (userId: string) => {
    const usersResponse = await getDoc(doc(db, `users/${userId}`))
    const admin = usersResponse?.data()?.admin;
    setIsAdmin(admin);
  }

  // display screens based on auth state
  useEffect(() => {
    if (user) {
      return router.replace('/auth/sign-in')
    }
    const subscriber = auth.onAuthStateChanged((user: any) => {
      if (user) {
        setUser(user);
        getUserFromDb(user.uid)
      } else {
        return router.replace('/auth/sign-in')
      }
      if (initializing) setInitializing(false);
    }, (error) => {
      console.log(error)
    });
    return subscriber;
  }, []);

  // select between admin and non admin flow
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        {isAdmin ?
          <Stack.Screen name="(admin-tickets)" options={{ headerShown: false }} /> :
          <Stack.Screen name="(tickets)" options={{ headerShown: false }} />}
        <Stack.Screen name="auth" options={{ headerShown: false }}></Stack.Screen>
      </Stack>
    </ThemeProvider>
  );
}
