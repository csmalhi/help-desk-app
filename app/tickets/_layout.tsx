import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'New Ticket',
          tabBarIcon: ({ color }) => <TabBarIcon name="plus" color={color} />,
          
        }}
      />
      <Tabs.Screen
        name="my-tickets"
        options={{
          title: 'My Tickets',
          tabBarIcon: ({ color }) => <TabBarIcon name="folder-open" color={color} />,
        }}
      />
      <Tabs.Screen
        name="[id]"
        options={{
          href: null
        }}
      />
    </Tabs>
  );
}