import React, { useState } from 'react';
import { View, Text, Alert, Image, SafeAreaView } from 'react-native';
import { router } from "expo-router";

import icons from "@/constants/icons";
import FormField from '@/components/FormField';
import CustomButton from "@/components/CustomButton";  
import PickerComponent from '@/components/pickerComponent';

import { useGlobalContext } from "@/lib/global-provider";
import { updateUserAttribute } from '@/lib/appwrite';


// Function to calculate age from birthdate
const calculateAge = (birthDate: Date) => {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();

  // Adjust if birthday hasn't occurred yet this year
  if (today.getMonth() < birthDate.getMonth() || 
     (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};

const Info = () => {
  
  const { user, setUser } = useGlobalContext(); // Fetch and update user data from global context
  const [firstName, setFirstName] = useState(""); // Default to an empty string
  const [lastName, setLastName] = useState("");   // Default to an empty string
  const [birthday, setBirthday] = useState(new Date()); // Default to today
  const [isSubmitting, setIsSubmitting] = useState(false); 
  
  const handlePress = async () => {
    if (!user || !user.$id) {
      Alert.alert("Error", "User ID is missing.");
      return;
    }
  
    if (!firstName || !birthday) {
      Alert.alert("Error", "Please fill in all the fields");
      return;
    }
    
    setIsSubmitting(true);

    try {
      const age = calculateAge(birthday);
      const updatedUser = {
        ...user,
        name: `${firstName} ${lastName}`, // Combine first and last name
        birthday: birthday.toISOString(),
        age: String(age),
      };

      // Update in Appwrite
      await updateUserAttribute(user.$id, "firstName", firstName);
      await updateUserAttribute(user.$id, "lastName", lastName);
      await updateUserAttribute(user.$id, "birthday", birthday.toISOString());
      await updateUserAttribute(user.$id, "age", String(age));

      // Update the user in context state
      setUser(updatedUser);

      router.push("/kidsCount");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
<SafeAreaView className="bg-white h-full flex-1">

  <View className="items-center rounded-b-[170px] bg-primary-200  absolute top-0 left-0 right-0">
    <Image source={icons.logo} resizeMode="contain" className="my-0 w-[235px] h-[160px] mt-5" />
  </View>


  <View className="w-full justify-center min-h-[65vh] px-4 my-6 flex-1 mt-40">
    <View className="flex items-center flex-row">
      <Text className="text-xl  text-semibold ml-3">
        What's your name?
      </Text>
  </View>

  
    <FormField
          value={firstName}
          handleChangeText={setFirstName}
          placeholder="First Name *"
          otherStyles="mt-2" title={undefined} otherStyles2={undefined} containerStyles="rounded-lg"    />

 
    <FormField
          value={lastName}
          handleChangeText={setLastName}
          placeholder="Last Name *"
          otherStyles="mt-2" title={undefined} otherStyles2={undefined} containerStyles="rounded-lg"    />

    <View className="w-full justify-center self-center mt-8">
      <Text className="text-xl font-base mt-6 mb-3 ml-3">
        What's your age?
      </Text>
      <PickerComponent onValueChange={setBirthday} title={undefined} otherStyles={undefined} />
      </View>  


    <View className="mx-2 my-3">
      <CustomButton
            title="Next"
            handlePress={handlePress}
            containerStyles="mt-10 mx-3 bg-secondary-200"
            textStyles="text-center text-white"
            isLoading={isSubmitting} icon={undefined} />
    </View>
  </View>


</SafeAreaView>

  );
};

export default Info;
