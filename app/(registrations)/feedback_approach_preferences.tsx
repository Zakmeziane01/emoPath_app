import { View, Text, TextInput, Alert, SafeAreaView, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useGlobalContext } from "@/lib/global-provider";
import { updateChildAttribute } from '@/lib/appwrite';
import { router } from "expo-router";
import CustomButton from "@/components/CustomButton";

const feedback_approach_preferences = () => {
  const [rewards_incentives_responses, setRewards_incentives_responses] = useState('');
  const [gamified_tasks_interest, setGamified_tasks_interest] = useState('');
  const { user } = useGlobalContext(); // Fetch and update user data from global context
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!user || !user.$id) {
      Alert.alert("Error", "User ID is missing.");
      return;
    }

    if (!rewards_incentives_responses || !gamified_tasks_interest) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    try {
      setIsSubmitting(true);
      const parentId = user.$id;
      const childData = {
        rewards_incentives_responses,
        gamified_tasks_interest,
      };

      // Update the user's child data attribute with the selected values
      await updateChildAttribute(parentId, null, childData);

      router.push("/Future_Goal"); // Navigate to the next screen
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
        <Text className="mx-4 mt-5">Feedback and Approach Preferences</Text>
        
        <View className="border-b border-gray-500 pb-1 mt-10 mx-3">
          <Text className='text-xl font-semibold mb-3 mt-5'>What are your preferred rewards or incentives for your child?</Text>
          <Text className="text-gray-500 text-xs mt-2">e.g., extra playtime, a special treat, positive reinforcement, praise, etc.</Text>
          <TextInput
            className="text-lg text-black mt-8"
            value={rewards_incentives_responses}
            onChangeText={setRewards_incentives_responses}
            placeholder="Describe your preferred rewards/incentives"
            placeholderTextColor="gray"
          />
        </View>

        <View className="border-b border-gray-500 pb-1 mt-10 mx-3">
          <Text className='text-xl font-semibold mb-3 mt-10'>Would your child be open to gamified tasks or challenges to encourage positive behavior?</Text>
          <Text className="text-gray-500 text-xs mt-2">e.g., using challenges, points, or earning badges to engage your child.</Text>
          <TextInput
            className="text-lg text-black mt-8"
            value={gamified_tasks_interest}
            onChangeText={setGamified_tasks_interest}
            placeholder="Describe your interest in gamified tasks"
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

export default feedback_approach_preferences;
