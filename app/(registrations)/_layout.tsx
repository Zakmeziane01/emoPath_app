import React from 'react'
import { Stack } from "expo-router";

const RegistartionsLayout = () => {
  return (

<Stack>
      <Stack.Screen
          name="welcome"
          options={{
            headerShown: false, 
          }}
        />

    <Stack.Screen
          name="info"
          options={{
            headerShown: false, 
          }}
        />

    <Stack.Screen
          name="kidsCount"
          options={{
            headerShown: false, 
          }}
        />

    <Stack.Screen
          name="relationshipWithChild"
          options={{
            headerShown: false, 
          }}
        />

    <Stack.Screen
          name="Parenting_Communication_Style"
          options={{
            headerShown: false, 
          }}
        />

      <Stack.Screen
          name="ParentingChallenges"
          options={{
            headerShown: false, 
          }}
        />

      <Stack.Screen
          name="PersonalityTemperament"
          options={{
            headerShown: false, 
          }}
        />

      <Stack.Screen
          name="InterestsPreferences"
          options={{
            headerShown: false, 
          }}
        />

      <Stack.Screen
          name="Behavioral_Patterns_History"
          options={{
            headerShown: false, 
          }}
        />

      <Stack.Screen
          name="Emotional_Social_Dev"
          options={{
            headerShown: false, 
          }}
        />

      <Stack.Screen
          name="Goal_Areas"
          options={{
            headerShown: false, 
          }}
        />

      <Stack.Screen
          name="feedback_approach_preferences"
          options={{
            headerShown: false, 
          }}
        />

      <Stack.Screen
          name="Future_Goal"
          options={{
            headerShown: false, 
          }}
        />

        
      <Stack.Screen
          name="Privacy"
          options={{
            headerShown: false, 
          }}
        />

      <Stack.Screen
          name="AcceptPrivacy"
          options={{
            headerShown: false, 
          }}
        />     
        
</Stack>
  )
}

export default RegistartionsLayout