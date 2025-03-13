import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import icons from "@/constants/icons"; // Assuming icons are imported
import CustomButton from "@/components/CustomButton"; // Assuming CustomButton is imported
import { router } from "expo-router";

const Privacy = () => {
  const [isExpanded, setIsExpanded] = useState(false);

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
            source={icons.lock}
            className="w-[350px] h-[150px]"
            resizeMode="contain"
            />
          </View>

          <View className="items-center">
            <Text className="font-rubik-bold text-primary-400 mt-10 font-semibold text-lg">
              EmpoPath Respects Your Privacy
            </Text>

            {/* Short overview text positioned below */}
            {!isExpanded && (
              <View className=" mt-5 items-center">
                <Text className="text-black mx-14">
                  Here is a short overview of our privacy policy. EmoPath respects your privacy and ensures that your personal information remains safe and secure. We are committed to transparency and make sure to inform you about how we handle your data.
                </Text>

                {/* Learn More Button - Directly Below Text */}
                <TouchableOpacity onPress={() => setIsExpanded(true)} className="mt-2 mr-60">
                  <Text style={{ color: "black", fontWeight: "600" }}>Learn More</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        {/* Privacy Policy Text */}
        {isExpanded && (
          <View className="mx-7 mt-5">
            <Text className="text-black">
              {`We collect information in the following ways:

1. Personal Information: When you register an account, we may ask for your name, email address, and other personal details.
2. Behavioral Data: We may collect information about how you interact with the platform, including your emotional patterns, preferences, and behaviors based on your inputs and interactions within the app. This may include text entries, responses to prompts, and interaction history.
3. Usage Data: We gather data related to your usage of the platform, such as device information, IP address, and log data.
4. Location Data: If you enable location services, we may collect and store your location data to improve user experience, depending on your preferences.

How We Use Your Information:
The information we collect is used to:
- Provide Services: To personalize your experience on emoPath, recommend personalized actions, and track progress.
- Improve Features: To enhance the app's features, such as emotional insights and personalized guidance.
- Support & Communication: To respond to your inquiries, send updates, and provide customer support.
- Research & Development: To analyze usage trends and improve the app’s functionality, ensuring the most beneficial recommendations for you.

Data Sharing and Disclosure:
We do not share your personal information with third parties unless required by law or for the purposes of improving our services. We may share non-personal, aggregated information with third parties for research and analytics purposes. We will never sell your personal data.

Security:
We implement a variety of security measures to protect your personal information. Your data is encrypted both in transit and at rest. However, no method of electronic storage is 100% secure, and we cannot guarantee absolute security.

Data Retention:
We retain your personal data as long as necessary to fulfill the purposes outlined in this Privacy Policy. You may request to delete your account at any time by contacting us, and we will remove your personal data upon request, subject to applicable legal retention requirements.

Your Rights:
You have the following rights regarding your personal data:
- Access & Update: You can access, update, or correct your personal information through your account settings.
- Data Deletion: You may request the deletion of your personal information by contacting us.
- Withdraw Consent: You can withdraw your consent for data collection at any time, but please note that this may impact your ability to use certain features of the platform.

Children’s Privacy:
emoPath is not intended for use by children under the age of 13. We do not knowingly collect personal information from children under 13. If we learn that we have collected personal information from a child under 13, we will take steps to delete such information.

Changes to This Privacy Policy:
We may update this Privacy Policy from time to time. Any changes will be communicated to you via email or through a notification within the app. By continuing to use emoPath, you agree to the updated terms of this Privacy Policy.

Contact Us:
If you have any questions about this Privacy Policy or your personal data, please contact us at [Contact Information].`}
            </Text>

            {/* Show Less Button - Below Expanded Text */}
            <TouchableOpacity onPress={() => setIsExpanded(false)} className="mt-5 items-center">
              <Text style={{ color: "black", fontWeight: "600" }}>Show Less</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Next Button (Only when text is collapsed) */}
        {!isExpanded && (
          <View className="justify-center px-3 mt-10">
            <CustomButton
              title="Next"
              handlePress={() => router.push("/AcceptPrivacy")}
              containerStyles="w-full mt-7 font-psemibold bg-secondary-200"
              textStyles="text-white"
              isLoading={undefined}
              icon={undefined}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Privacy;
