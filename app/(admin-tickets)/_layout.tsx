import React from 'react';
import { Stack, router } from 'expo-router';
import { Pressable } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { auth } from '../../firebase'
import { signOut } from 'firebase/auth';

export const unstable_settings = {
  initialRouteName: 'index',
};

const logout = () => {
  signOut(auth).then(() => {
    console.log("User signed out!")
    router.push({
      pathname: `/auth/sign-in`
    })
  });
}

export default function AdminLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Admin Tickets',
          headerStyle: { backgroundColor: '#f4511e' },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: () => (
            <Pressable onPress={logout}>
              {({ pressed }) => (
                <FontAwesome
                  name="sign-out"
                  size={25}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: 'Ticket Details',
          headerStyle: { backgroundColor: '#f4511e' },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack>
  );
}
