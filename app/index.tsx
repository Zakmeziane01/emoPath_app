//HOME PAGE 
import React from 'react';
import { View, Text, Image } from 'react-native'; 
import { Redirect, router } from "expo-router";


import icons from "@/constants/icons";
import CustomButton from "@/components/CustomButton";  
import Loader from '@/components/Loader'
import { useGlobalContext } from '@/lib/global-provider';



export default function  App() {
  
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/sign-in" />;


  return (

     <View className='h-full '>
          <Image
            source={icons.welcome}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              resizeMode: "cover", 
            }}
          />
      <View className="items-center flex-1 mt-20">
          <Loader isLoading={loading} />

          <View className="items-center mt-10">
            <Image
              source={icons.logo}
              className="w-[280px] h-[100px]"
              resizeMode="contain"
            />
          </View>
      </View>

      <View className='mx-5 '>          
        <Text className="font-rubik-bold text-primary-400 text-center mt-40 font-base">
        <Text className="text-white">DISCOVER</Text> the 'why' behind your child's behavior and 
        <Text className="text-white"> EMPOWER</Text> your parenting with insights.
        </Text>
        </View> 

      <View className="justify-center px-3  mt-10 mb-20">
        <CustomButton
          title="Ready to start" // This sets the button's label to "Continue with Email".
          handlePress={() => router.push("/sign-up")} //This is an empty function that will handle the button press event.
          containerStyles="w-full mt-7 font-psemibold bg-secondary-200"
          textStyles="text-white" isLoading={undefined} icon={undefined}/> 
      </View>
      </View>

      );
      }