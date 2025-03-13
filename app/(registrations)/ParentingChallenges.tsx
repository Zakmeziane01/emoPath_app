import { View, Text, TextInput, TouchableOpacity, Image, Alert, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import { useGlobalContext } from "@/lib/global-provider";
import { updateUserAttribute} from '@/lib/appwrite';
import { router } from "expo-router";
import CustomButton from "@/components/CustomButton";





const ParentingChallenges = () => {

  const [parentingChallenges, setparentingChallenges] = useState('');
  const [familyDynamics, setfamilyDynamics] = useState('');
  const { user, setUser } = useGlobalContext(); // Fetch and update user data from global context
  const [isSubmitting, setIsSubmitting] = useState(false);




  const handleSubmit = async () => {
    if (!user || !user.$id) {
      Alert.alert("Error", "User ID is missing.");
      return;
    }
  
    if (!parentingChallenges || !familyDynamics) {
      Alert.alert("Error", "Please fill in all fields and select an avatar.");
      return;
    }
  
    try {
      setIsSubmitting(true);
      const updatedUser = {
        ...user,
        parentingChallenges,
        familyDynamics, 
      };

      await updateUserAttribute(user.$id, "parentingChallenges", parentingChallenges);
      await updateUserAttribute(user.$id, "familyDynamics", familyDynamics);

      setUser(updatedUser);
      Alert.alert("Success", "Child data saved successfully!");
      router.push("/PersonalityTemperament");
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
      <View className="flex-grow bg-white rounded-t-[35px] px-4 pt-8 mt-40 ">
            <Text className="mx-4 mt-5">Parenting Challenges</Text>
        <View className="border-b border-gray-500 pb-1 mt-5 mx-3">
        <Text className='text-xl font-semibold mb-3 mt-10'>What specific challenges do you face as a parent?</Text>
          <Text className="text-gray-500 text-xs mt-2">e.g., balancing work and family, managing screen time, handling teenage issues, etc</Text>
          <TextInput
            className="text-lg text-black mt-8"
            value={parentingChallenges}
            onChangeText={setparentingChallenges}
            placeholder=""
            placeholderTextColor="transparent"
          />
        </View>

        <View className="border-b border-gray-500 pb-1 mt-10 mx-3">
        <Text className='text-xl font-semibold mb-3 mt-10'>Do family dynamics affect your parenting?</Text>
          <Text className="text-gray-500 text-xs mt-2">Single parenting, co-parenting, financial difficulties, etc</Text>
          <TextInput
            className="text-lg text-black mt-8"
            value={familyDynamics}
            onChangeText={setfamilyDynamics}
            placeholder=""
            placeholderTextColor="transparent"
          />
        </View>

      </View>


      <View className="absolute bottom-0 left-0 right-0 bg-white px-5 py-5">
      <CustomButton
          title={ "Next"}
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


export default ParentingChallenges