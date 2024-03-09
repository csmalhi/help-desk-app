import React, { useEffect, useState } from 'react';
import { Stack, router } from 'expo-router';
import { Pressable } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { auth, db } from '../../firebase'
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export const unstable_settings = {
  initialRouteName: 'index',
};


export default function AdminLayout() {
  const [initializing, setInitializing] = useState(true);

  const logout = () => {
    signOut(auth).then(() => {
      console.log("User signed out!")
      router.push({
        pathname: `/auth/sign-in`
      })
    });
  }

  const getUserFromDb = async (userId: string) => {
    const usersResponse = await getDoc(doc(db, `users/${userId}`))
    const admin = usersResponse?.data()?.admin;
    if (!admin) {
      router.replace('/(tickets)')
    }
  }

  // display screens based on auth state
  useEffect(() => {
    const subscriber = auth.onAuthStateChanged((user: any) => {
      if (user) {
        getUserFromDb(user.uid)
      } else {
        router.replace('/auth/sign-in')
      }
      if (initializing) setInitializing(false);
    }, (error) => {
      console.log(error)
    });
    return subscriber
  })

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
