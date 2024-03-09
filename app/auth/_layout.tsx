import React from 'react';
import { Stack } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '/auth/sign-in',
};

const AuthStack = () => {
  return (
    <Stack>
      <Stack.Screen 
        name="sign-in"
                options={{
          title: 'Sign in',
          headerStyle: { backgroundColor: '#f4511e' },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} 
      />
      <Stack.Screen 
        name="sign-up"
                options={{
          title: 'Sign up',
          headerStyle: { backgroundColor: '#f4511e' },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} 
      />
      <Stack.Screen 
        name="verify-email"
                options={{
          title: 'Verify Email',
          headerStyle: { backgroundColor: '#f4511e' },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} 
      />
      <Stack.Screen 
        name="forgot-password"
                options={{
          title: 'Forgot Password',
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

export default AuthStack;
