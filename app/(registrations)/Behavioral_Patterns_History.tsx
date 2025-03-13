import { View, Text, TextInput, Alert, SafeAreaView, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useGlobalContext } from "@/lib/global-provider";
import { updateChildAttribute } from '@/lib/appwrite';
import { router } from "expo-router";
import CustomButton from "@/components/CustomButton";

const Behavioral_Patterns_History = () => {
  const [recentBehavior, setRecentBehavior] = useState('');
  const [behaviorTriggers, setBehaviorTriggers] = useState('');
  const { user } = useGlobalContext(); // Fetch and update user data from global context
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!user || !user.$id) {
      Alert.alert("Error", "User ID is missing.");
      return;
    }

    if (!recentBehavior || !behaviorTriggers) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    try {
      setIsSubmitting(true);
      const parentId = user.$id;
      const childData = {
        recentBehavior,
        behaviorTriggers,
      };

      // Update the user's child data attribute with the selected values
      await updateChildAttribute(parentId, null, childData);

      router.push("/Emotional_Social_Dev"); // Navigate to the next screen
    } catch (error) {
      console.error("Error saving data:", error);
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      Alert.alert("Error", errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className='h-full bg-primary-300 '>
      <ScrollView className="flex-grow bg-white rounded-t-[35px] px-4 pt-8 mt-40">
        <Text className="mx-4 mt-5">Behavioral Patterns and History</Text>
        <View className="border-b border-gray-500 pb-1 mt-10 mx-3">
          <Text className='text-xl font-semibold mb-3 mt-5'>How would you describe your child’s recent behavior at home?</Text>
          <Text className="text-gray-500 text-xs mt-2">e.g., frequent tantrums, showing empathy, being defiant, cooperative, challenging, helpful, etc.</Text>
          <TextInput
            className="text-lg text-black mt-8"
            value={recentBehavior}
            onChangeText={setRecentBehavior}
            placeholder=""
            placeholderTextColor="transparent"
          />
        </View>

        <View className="border-b border-gray-500 pb-1 mt-10 mx-3">
          <Text className='text-xl font-semibold mb-3 mt-10'>Are there any specific situations or triggers that tend to lead to misbehavior?</Text>
          <Text className="text-gray-500 text-xs mt-2">e.g., sibling rivalry, lack of sleep, stress, changes in routine, etc.</Text>
          <TextInput
            className="text-lg text-black mt-8"
            value={behaviorTriggers}
            onChangeText={setBehaviorTriggers}
            placeholder=""
            placeholderTextColor="transparent"
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

export default Behavioral_Patterns_History;
