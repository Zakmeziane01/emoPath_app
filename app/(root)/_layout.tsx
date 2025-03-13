import React from 'react'
import { Stack } from "expo-router";

const _layout = () => {
  return (

<Stack>
      <Stack.Screen
          name="analysis"
          options={{
            headerShown: false, // Sign-in screen without header
          }}
        />
      <Stack.Screen
          name="editProfile"
          options={{
            headerShown: false, // Sign-in screen without header
          }}
        />
      <Stack.Screen
          name="help"
          options={{
            headerShown: false, // Sign-in screen without header
          }}
        />
        <Stack.Screen
      name="setting"
      options={{
        headerShown: false, // Sign-in screen without header
      }}
    />
        <Stack.Screen
      name="sign-out"
      options={{
        headerShown: false, // Sign-in screen without header
      }}
    />
</Stack>
  )
}

export default _layout