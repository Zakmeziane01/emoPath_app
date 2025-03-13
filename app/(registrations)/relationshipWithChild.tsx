import { Text, View, Alert, SafeAreaView, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useGlobalContext } from "@/lib/global-provider";
import { updateChildAttribute } from '@/lib/appwrite';
import { router } from 'expo-router';
import DisplayHolder from "@/components/DisplayHolder";
import CustomButton from "@/components/CustomButton";

const RelationshipWithChild = () => {
  const { user } = useGlobalContext(); // Fetching user data from global context
  const [selectedValues1, setSelectedValues1] = useState<string[]>([]); // State for first question
  const [selectedValues2, setSelectedValues2] = useState<string[]>([]); // State for second question
  const [isSubmitting, setIsSubmitting] = useState(false); // State to track form submission status

  // Career path options for selection
  const pickerItems = [
    { label: 'Close', value: 'Close',  },
    { label: 'Distant', value: 'Distant' },
    { label: 'Supportive', value: 'Supportive' },
    { label: 'Challenging', value: 'Challenging' },
  ];

  const pickerItems2 = [
    { label: 'Daily', value: 'Daily',  },
    { label: 'Weekly', value: 'Weekly' },
    { label: 'Rarely', value: 'Rarely' },
  ];


  const handlePressOption = (value: string, question: number) => {
    if (question === 1) {
      if (selectedValues1.includes(value)) {
        // If already selected, remove the value
        setSelectedValues1(selectedValues1.filter(item => item !== value));
      } else {
        // If not selected, check the count before adding
        if (selectedValues1.length < 2) {
          setSelectedValues1([...selectedValues1, value]);
        } else {
          Alert.alert("Limit Reached", "You can select a maximum of 2 options.");
        }
      }
    } else if (question === 2) {
      if (selectedValues2.includes(value)) {
        // If already selected, remove the value
        setSelectedValues2(selectedValues2.filter(item => item !== value));
      } else {
        // If not selected, check the count before adding
        if (selectedValues2.length < 2) { // Allow up to 2 selections for the second question


          setSelectedValues2([...selectedValues2, value]);
        } else {
          Alert.alert("Limit Reached", "You can select a maximum of 2 options.");
        }
      }
    }
  };


  // Handles form submission and updates user data
  const handlePress = async () => {
    if (!user || !user.$id) {
    Alert.alert("Error", "User ID is missing.");
    return;
    }

    if (selectedValues1.length < 1 || selectedValues2.length < 1) {
      Alert.alert("Error", "Please select at least one option for both questions");
      return;
    }

      setIsSubmitting(true);
      const parentId = user.$id;
      const childData = {
        relationshipWithChild: selectedValues1.join(', ').substring(0, 500),
        oneOnOneTimeFrequency: selectedValues2.join(', ').substring(0, 500),
        };



    try {
      // Update the user's career path attribute with selected values
      await updateChildAttribute(parentId, null, childData); // Join selected values into a string

      router.push("/Parenting_Communication_Style"); // Navigate to next screen
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred';
      Alert.alert("Error", message); // Show error message if update fails

    } finally {
      setIsSubmitting(false); // Reset submission state
    }
  };

  return (
<SafeAreaView className="h-full bg-primary-300">

  <View className="flex-grow bg-white rounded-t-[35px] px-4 pt-8 mt-8">
    <ScrollView className="h-full">
    <Text className="mx-4 mt-5">Relationship with the Child</Text>
    <Text className="text-xl text-secondary font-medium font-pmedium mx-4 mt-8">
        How would you describe your relationship with your child?
    </Text>
    <View className="mt-5">
        <DisplayHolder
          options={pickerItems}
          selectedValues={selectedValues1}
          onPressOption={handlePressOption}
          questionNumber={1}
        />
      </View>

      <Text className="text-xl text-secondary font-medium font-pmedium mx-4 mt-5">
        How often do you have one-on-one time with your child?
      </Text>
      <View className="mt-5 mb-20">
        <DisplayHolder
          options={pickerItems2}
          selectedValues={selectedValues2}
          onPressOption={handlePressOption}
          questionNumber={2}
        />
      </View>
    </ScrollView>
  </View>


  <View className="absolute bottom-0 left-0 right-0 bg-white px-5 py-5">
    <CustomButton
      title="Next"
      handlePress={handlePress}
      containerStyles="bg-secondary-200"
      textStyles="text-center text-white"
      isLoading={isSubmitting}
      icon={undefined}
    />
  </View>
</SafeAreaView>


  );
};

export default RelationshipWithChild;
