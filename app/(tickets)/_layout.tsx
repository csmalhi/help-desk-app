import React from 'react';
import Colors from '@/constants/Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs, router } from 'expo-router';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { Pressable } from 'react-native';
import { auth } from '../../firebase'
import { signOut } from 'firebase/auth';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

const logout = () => {
  signOut(auth).then(() => {
    console.log("User signed out!")
    router.push({
      pathname: `/auth/sign-in`
    })
  });
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Submit a new ticket',
          headerStyle: { backgroundColor: '#f4511e' },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          tabBarIcon: ({ color }) => <TabBarIcon name="plus" color={color} />,  
        }}
      />
      <Tabs.Screen
        name="my-tickets"
        options={{
          title: 'My Tickets',
          headerStyle: { backgroundColor: '#f4511e' },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          tabBarIcon: ({ color }) => <TabBarIcon name="folder-open" color={color} />,
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
      <Tabs.Screen
        name="[id]"
        options={{
          title: "Ticket Details",
          headerStyle: { backgroundColor: '#f4511e' },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          href: null,

        }}
      />
    </Tabs>
  );
}
