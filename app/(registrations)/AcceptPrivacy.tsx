import { View, Text, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import icons from "@/constants/icons"; // Assuming icons are imported
import CustomButton from "@/components/CustomButton"; // Assuming CustomButton is imported
import { router } from "expo-router";

const AcceptPrivacy = () => {
  const [accepted, setAccepted] = useState(false);

  const handleRejectPress = () => {
    if (!accepted) {
      Alert.alert("Action Required", "You must accept the privacy policy before proceeding.");
    }
  };

  return (
    <View className="h-full">
      {/* Background Image */}
      <Image
        source={icons.privacy}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          resizeMode: "cover",
        }}
      />

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}>
        {/* Header Section */}
        <View className="items-center flex-1 mt-20">
          <View className="items-center mt-10">
            <Image
              source={icons.dataPrivacy}
              className="w-[250px] h-[100px]"
              resizeMode="contain"
            />
          </View>

          <View className="items-center">
            <Text className="font-rubik-bold text-primary-400 mt-10 font-semibold text-lg">
              Getting Better Together
            </Text>

            {/* Privacy Policy Text */}
            <View className="mt-5 mx-10 items-center">
              <Text className="text-black">
                At EmoPath, we are committed to protecting your privacy while enhancing your experience. To continuously improve our platform, we may collect diagnostic and usage data, including interaction patterns, emotional trends, and feature engagement.
                This data helps us refine our recommendations, personalize insights, and optimize app performance.
                However, we do not collect personal details such as your name, private messages, or sensitive information. Any data gathered is anonymized and used solely to enhance your experience with EmoPath.
                Would you like to enable optional data collection to help us improve EmoPath’s features and insights while ensuring your privacy remains safeguarded?
              </Text>
            </View>
          </View>
        </View>

        {/* Buttons Section */}
        <View className="justify-center px-3 mt-10 mx-4 mb-10">
          <CustomButton
            title="Accept"
            handlePress={() => {
              setAccepted(true);
              router.push("/welcome");
            }}
            containerStyles="w-full"
            textStyles="text-white"
            isLoading={undefined}
            icon={undefined}
          />
          
          {/* Reject Button */}
          <CustomButton
            title="Reject"
            handlePress={handleRejectPress}
            containerStyles="w-full font-psemibold bg-primary-200"
            textStyles="text-white"
            isLoading={undefined}
            icon={undefined}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default AcceptPrivacy;
