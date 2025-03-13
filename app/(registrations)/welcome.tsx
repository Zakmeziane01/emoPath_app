import { View, Text, SafeAreaView, Image } from 'react-native'
import React from 'react'
import icons from "@/constants/icons";
import CustomButton from "@/components/CustomButton";  
import { router } from "expo-router";


const Welcome = () => {
  return (
<SafeAreaView className='flex-1 bg-white'>
  <View className='flex-1 bg-white'> 

    <View className="flex-1">
      {/* Parent Container */}
      <View className="items-center rounded-b-[170px] p-10 absolute top-0 left-0 right-0"> 
        <Image 
          source={icons.welcoming} 
          className="my-0 w-[400px] h-[250px] mt-5"
        />
        <View className="absolute top-0 left-0 right-0 bottom-0 bg-white opacity-80" />
      </View>
    </View>

    <View className='mb-10 items-center'>
    <Image 
          source={icons.welcomeAdd} 
          className="w-[310px] h-[150px] mt-5"
        />
    </View>

    <View className="justify-center px-3  mt-10 mb-10">
        <CustomButton
          title="Let's go" // This sets the button's label to "Continue with Email".
          handlePress={() => router.push("/chatBox")} //This is an empty function that will handle the button press event.
          containerStyles="w-full mt-7 font-psemibold bg-secondary-200"
          textStyles="text-white" isLoading={undefined} icon={undefined}/> 
      </View>

  </View>
</SafeAreaView>


  )
}

export default Welcome