import React, { useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Alert,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FormField from '@/components/FormField';
import CustomButton from "../../components/CustomButton";

import { Redirect } from "expo-router";
import { useGlobalContext } from "@/lib/global-provider";
import { router } from "expo-router";

import { login, getCurrentUser, signIn } from "@/lib/appwrite";
import icons from "@/constants/icons";

const Auth = () => {

  const { refetch, setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setIsSubmitting] = useState(false); // Track the submission state (loading)
  const [form, setForm] = useState({ // Manage form state (email and password)
    email: "",
    password: "",
  });

  

  const handleLogin = async () => {
    const result = await login(); 
    if (result) {
      refetch(); 
      router.replace("/chatBox"); 
    } else {
      Alert.alert("Error", "Google Sign Up Failed");
    }
  };
  
  const submit = async () => {  // Called when the submit button is pressed
    if (form.email == "" || form.password === "") { // Check if email or password is empty
      Alert.alert("Error", "Please fill in all the fields"); // Alert if fields are missing
      return;
    }

    setIsSubmitting(true); // Set submitting state to true while handling the request

    try {
      await signIn({ email: form.email, password: form.password }); // Call signIn function with email and password
      const result = await getCurrentUser(); // Get the current logged-in user's data
      console.log(result); // Log the result (current user)
      setUser(result); // Set the user state with the retrieved data
      setIsLogged(true); // Update login status to true
        router.push("/chatBox"); // Redirect to the welcome screen
    } catch (error) {
      Alert.alert("Sorry, the details you entered are incorrect. Please try again."); // Show error message if login fails
    } finally {
      setIsSubmitting(false); 
    }
  };

  return (
    <SafeAreaView className="bg-primary-100 h-full flex-1">
        
    <View className="items-center rounded-b-[170px] bg-primary-200 p-6 absolute top-0 left-0 right-0">
        <Image source={icons.login} resizeMode='contain' className="my-0 w-[200px] h-[160px] mt-5" />
    </View>

  <View className="w-full justify-center min-h-[65vh] px-4 my-6 flex-1 mt-40">
      <View className="flex items-center flex-row">
          <Text className="text-3xl text-secondary text-semibold font-psemibold ml-3"> Log In </Text> 
      </View>

      <FormField
          placeholder="Email"
          value={form.email}
          handleChangeText={(e: string) => setForm({ ...form, email: e })}
          otherStyles='margin-top-2'
          keyboardType='email-address' title={undefined} otherStyles2={undefined} containerStyles={undefined}/>
          <FormField
          placeholder="Password"
          value={form.password}
          handleChangeText={(e: string) => setForm({ ...form, password: e })} title={undefined} otherStyles={undefined} otherStyles2={undefined} containerStyles={undefined}/>

        
      <CustomButton
          title="Sign Up"
          handlePress={submit}
          containerStyles="mx-3"
          textStyles="text-white"
          isLoading={isSubmitting} icon={undefined}        />



      <CustomButton
        title="Continue with Google"
        handlePress={handleLogin}
        containerStyles="mx-3 mb-3"
        textStyles="text-lg font-rubik-medium text-white ml-2"
        isLoading={false}
        icon={<Image source={icons.google} className="w-6 h-6" resizeMode="contain" />}
      />

      {/* Already have an account? */}
      <View className="justify-center pt-5 flex-row gap-2">
        <Text className="text-lg text-primary-300  font-pregular">Don't have an account?</Text>
        <TouchableOpacity onPress={() => router.replace("/sign-up")}>
          <Text className="text-lg font-psemibold text-secondary">Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>

  </SafeAreaView>
  );
};

export default Auth 