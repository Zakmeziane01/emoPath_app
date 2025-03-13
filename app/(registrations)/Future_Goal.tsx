import { View, Text, TextInput, Alert, SafeAreaView, ScrollView, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import { useGlobalContext } from "@/lib/global-provider";
import { updateChildAttribute } from '@/lib/appwrite';
import { router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import icons from "@/constants/icons";

const Future_Goal = () => {
  const [app_outcomes_goals, setApp_outcomes_goals] = useState('');
  const { user } = useGlobalContext(); // Fetch and update user data from global context
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!user || !user.$id) {
      Alert.alert("Error", "User ID is missing.");
      return;
    }

    if (!app_outcomes_goals) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    try {
      setIsSubmitting(true);
      const parentId = user.$id;
      const childData = {
        app_outcomes_goals,
      };

      // Update the user's child data attribute with the selected values
      await updateChildAttribute(parentId, null, childData);

      router.push("/Privacy"); // Navigate to the next screen
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
        <View className='mx-4'>
        <Text className="mt-5">Future Aspirations and Goals</Text>
        <Text className='text-xl font-semibold mb-3 mt-5'>What outcomes do you hope to achieve by using this app?</Text>
        <Text className="text-gray-500 text-xs mt-2">e.g., improved communication, better emotional management, positive behavior</Text>
        </View>
        <View className="flex justify-center items-center mt-16">
        <ImageBackground
            source={icons.logo}
            resizeMode="contain"
            style={{ height: 160, width: 235 }}
            imageStyle={{ opacity: 0.2 }} // Reduced opacity for a grayish overlay
            className="flex justify-center items-center" // This ensures the image is centered within the parent container
        >
            <TextInput
            className="text-sm text-black border-2 border-gray-300 p-4 mt-8"
            value={app_outcomes_goals}
            onChangeText={setApp_outcomes_goals}
            placeholder="Describe your child’s future development goals"
            placeholderTextColor="gray"
            multiline
            numberOfLines={5}
            style={{
                width: 350, // Adjust the width to your desired size
                height: 200, // Adjust the height to your desired size
                marginTop: 0,
                paddingTop: 10,
                paddingLeft: 20,
                paddingRight: 20,
                paddingBottom: 10,
                alignSelf: 'center', // Centers the text input inside the background
                borderRadius: 20,
            }}
            />
        </ImageBackground>
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

export default Future_Goal;
