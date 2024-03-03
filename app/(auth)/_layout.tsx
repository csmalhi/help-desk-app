import React from 'react';
import { Stack } from 'expo-router';

const AuthStack = () => {
  return (
    <Stack>
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="sign-up" />
      <Stack.Screen name="verify-email" />
      <Stack.Screen name="forgot-password" />
    </Stack>
  );
}

export default AuthStack;
