import { View, Text, Image, Alert, TouchableOpacity, SafeAreaView} from 'react-native';
import React, { useState } from 'react';
import { router, Redirect } from 'expo-router';
import icons from "@/constants/icons";
import { createUser, login} from "@/lib/appwrite";
import FormField from '@/components/FormField';
import CustomButton from "../../components/CustomButton";
import { useGlobalContext } from "@/lib/global-provider";

import { StatusBar } from 'expo-status-bar';

const SignUp = () => {

  
    const { setUser, setIsLogged, refetch, loading, isLogged } = useGlobalContext();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({
      username: "",
      email: "",
      password: "",
    });
  
  // Sign Up with Email & Password
  const handleSignUp = async () => {
    if (!form.email || !form.password || !form.username) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await createUser({
        email: form.email,
        password: form.password,
        username: form.username,
      });

      if (result) {
        setUser(result); // Set user details in the global context
        setIsLogged(true); // Set the logged-in state to true
        refetch();
        router.replace("/info");
      }
    } catch (error: any) {
        if (error.message) {
          if (error.message.includes("already exists")) {
            Alert.alert("Error", "The account is already registered.");
          } else {
            Alert.alert("Error", String(error)); // General error message
          }
        } else {
          Alert.alert("Error", "An unexpected error occurred.");
        }
      } finally {
        setIsSubmitting(false);
      }
    };

 // If the user is already logged in, go to the chatBox
   if (!loading && isLogged) return <Redirect href="/" />;   //!loading → The app finished checking, isLogged → The user is logged in. 

  const handleGoogleSignUp = async () => {
    const result = await login(); 
    if (result) {
      refetch(); 
    } else {
      Alert.alert("Error", "Google Sign Up Failed");
    }
  };


  return (
    <SafeAreaView className="bg-white h-full flex-1">
        
      <View className="items-center rounded-b-[170px] bg-primary-200 p-6 absolute top-0 left-0 right-0">
          <Image source={icons.logo} resizeMode='contain' className="my-0 w-[235px] h-[160px] mt-5" />
      </View>

    <View className="w-full justify-center min-h-[65vh] px-4 my-6 flex-1 mt-40">
        <View className="flex items-center flex-row">
            <Text className="text-3xl text-secondary text-semibold font-psemibold ml-3"> Sign Up </Text> 
        </View>

        <FormField
            placeholder="Username"
            value={form.username}
            handleChangeText={(e: string) => setForm({ ...form, username: e })}
            otherStyles='mt-2' title={undefined} otherStyles2={undefined} containerStyles={undefined}/>
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
            handlePress={handleSignUp}
            containerStyles="mt-10  mx-3"
            textStyles="text-white"
            isLoading={isSubmitting} icon={undefined}        />


        <CustomButton
          title="Continue with Google"
          handlePress={handleGoogleSignUp}
          containerStyles="mt-10 mx-3"
          textStyles="text-lg font-rubik-medium text-white ml-2"
          isLoading={false}
          icon={<Image source={icons.google} className="w-6 h-6" resizeMode="contain" />}
        />

        {/* Already have an account? */}
        <View className="justify-center pt-5 flex-row gap-2">
          <Text className="text-lg text-primary-300  font-pregular">Already have an account?</Text>
          <TouchableOpacity onPress={() => router.replace("/sign-in")}>
            <Text className="text-lg font-psemibold text-secondary">Log in</Text>
          </TouchableOpacity>
        </View>
      </View>

      <StatusBar backgroundColor="#5bb450" style="light" />
    </SafeAreaView>
  );
};

export default SignUp;
