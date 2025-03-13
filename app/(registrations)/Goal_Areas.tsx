import { View, Text, TextInput, Alert, SafeAreaView, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useGlobalContext } from "@/lib/global-provider";
import { updateChildAttribute } from '@/lib/appwrite';
import { router } from "expo-router";
import CustomButton from "@/components/CustomButton";

const Goal_Areas = () => {
  const [childDevelopmentGoals, setChildDevelopmentGoals] = useState('');
  const [childCurrentChallenges, setChildCurrentChallenges] = useState('');
  const { user } = useGlobalContext(); // Fetch and update user data from global context
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!user || !user.$id) {
      Alert.alert("Error", "User ID is missing.");
      return;
    }

    if (!childDevelopmentGoals || !childCurrentChallenges) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    try {
      setIsSubmitting(true);
      const parentId = user.$id;
      const childData = {
        childDevelopmentGoals,
        childCurrentChallenges,
      };

      // Update the user's child data attribute with the selected values
      await updateChildAttribute(parentId, null, childData);

      router.push("/feedback_approach_preferences"); // Navigate to the next screen
    } catch (error) {
      console.error("Error saving data:", error);
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      Alert.alert("Error", errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className='h-full bg-primary-300'>
      <ScrollView className="flex-grow bg-white rounded-t-[35px] px-4 pt-8 mt-40">
        <Text className="mx-4 mt-5">Child Challenges and Growth Areas</Text>
        
        <View className="border-b border-gray-500 pb-1 mt-10 mx-3">
          <Text className='text-xl font-semibold mb-3 mt-5'>What are your main goals for your child’s development at this stage?</Text>
          <Text className="text-gray-500 text-xs mt-2">e.g., improving focus, building social skills, becoming more independent,  building responsibility, improving communication, managing emotions etc.</Text>
          <TextInput
            className="text-lg text-black mt-8"
            value={childDevelopmentGoals}
            onChangeText={setChildDevelopmentGoals}
            placeholder="Describe your child's goals"
            placeholderTextColor="gray"
          />
        </View>

        <View className="border-b border-gray-500 pb-1 mt-10 mx-3">
          <Text className='text-xl font-semibold mb-3 mt-10'>What challenges is your child currently facing?</Text>
          <Text className="text-gray-500 text-xs mt-2">e.g., difficulty in learning, social anxiety, emotional regulation struggles, academic struggles, self-esteem issues, bullying etc.</Text>
          <TextInput
            className="text-lg text-black mt-8"
            value={childCurrentChallenges}
            onChangeText={setChildCurrentChallenges}
            placeholder="Describe the challenges"
            placeholderTextColor="gray"
          />
        </View>
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 bg-white px-5 py-5">
        <CustomButton
          title={"Next"}
          handlePress={handleSubmit}
          containerStyles="mt-10 mx-3 bg-secondary-200"
          textStyles="text-center text-white"
          isLoading={isSubmitting}
          icon={undefined}
        />
      </View>
    </SafeAreaView>
  );
};

export default Goal_Areas;
