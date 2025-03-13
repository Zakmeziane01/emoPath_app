import { View, Text, Image, SafeAreaView, Dimensions, Alert, TouchableOpacity  } from 'react-native';
import React from 'react';
import icons from "@/constants/icons";
import { useRouter } from "expo-router"; 
import NextButton from "@/components/NextButton";  
import { useGlobalContext } from "@/lib/global-provider";
import { logout } from "@/lib/appwrite"; // Import the logout function
import { Redirect } from "expo-router";

const screenWidth = Dimensions.get("window").width;

const Profile = () => {

  const { refetch, isLogged } = useGlobalContext();
  const router = useRouter(); 

    // Handle sign-out logic
    const handleSignOut = async () => {
      const result = await logout();
      if (result) {
        refetch(); // Refetch user data to update login state
        Alert.alert("Success", "You have logged out successfully.");
      } else {
        Alert.alert("Error", "Failed to log out.");
      }
    };
  
    // Redirect to login if the user is not logged in
    if (!isLogged) return <Redirect href="/sign-in" />;

  return (
<SafeAreaView className="flex-1 bg-white">
            
<View className="mx-6 bg-primary-200 rounded-lg">
  <Text className="text-4xl font-semibold ml-3 mt-3">Child</Text>
  <Text className="text-sm font-semibold mt-2 ml-3">MISBEHAVIOR FREQUENCY</Text>

  <View className="flex-row items-center justify-between">
    {/* Misbehavior Frequency Section (Left Side) */}
    <View className="mr-6 p-4 rounded-lg flex-col items-center">
      <Image
        source={icons.id}
        className="w-16 h-16 rounded-full"
        resizeMode="contain"
      />
      <Text className="mt-2 font-bold">40%</Text>

      <Image
        source={icons.id2}
        className="w-16 h-16 rounded-full"
        resizeMode="contain"
      />
      <Text className="mt-2 font-bold">90%</Text>

      <Image
        source={icons.id3}
        className="w-16 h-16 rounded-full"
        resizeMode="contain"
      />
      <Text className="mt-2 font-bold">60%</Text>
    </View>

    {/* Main Profile Image and Text (Center) */}
    <View className="items-center">
      <Image
        source={icons.id2}
        className="w-40 h-40 rounded-full mt-4"
      />
      <Text className="mt-4 text-base font-semibold text-center">
        IMPROVING{"\n"}COMMUNICATIONS
      </Text>
    </View>

    {/* Name & Birthday Section (Right Side) */}
  <View className="ml-2 p-4 rounded-lg flex-col items-center mb-10">
    <View>
        <Image
          source={icons.goal}
          className="w-8 h-10"
          resizeMode="contain"
        />
      </View>
      <Text className="mt-2 font-medium">two weeks</Text>

      {/* Birthday Icon with Border */}
      <View className="mt-4">
        <Image
          source={icons.birthday}
          className="w-8 h-10"
          resizeMode="contain"
        />
      </View>
      <Text className="font-medium">5</Text>
    </View>
  </View>
</View>



    <View className='mt-3 bg-primary-200 flex-row items-center justify-between mx-6 p-3 rounded-lg'>
        <Image
        source={icons.analysis}
        className="w-14 h-14 rounded-full"
        resizeMode="contain"
      />
      <Text className="ml-3 text-black text-sm">Insights into Your Child’s Development</Text>
      <NextButton onPress={() => router.push("/analysis")} />           
   </View>



   <View className='mx-6'>
        <TouchableOpacity className='bg-primary-200 flex-row items-center justify-between p-3 mt-3 rounded-t-lg'>
            <View className="flex-row items-center">
              <Image source={icons.edit} className="w-8 h-8 rounded-full" />
              <Text className="ml-4 text-black text-sm font-semibold">Edit Profile</Text>
            </View>
            <NextButton onPress={() => router.push("/editProfile")} />
        </TouchableOpacity>

        <TouchableOpacity className='bg-primary-200 flex-row items-center justify-between p-3'>
          <View className="flex-row items-center">
            <Image source={icons.help} className="w-8 h-8 rounded-full" />
            <Text className="ml-4 text-black text-sm font-semibold">Help</Text>
          </View>
          <NextButton onPress={() => router.push("/help")} />
        </TouchableOpacity>

        <TouchableOpacity className='bg-primary-200 flex-row items-center justify-between p-3'>
          <View className="flex-row items-center">
            <Image source={icons.setting} className="w-8 h-8 rounded-full" />
            <Text className="ml-4 text-black text-sm font-semibold">Setting</Text>
          </View>
          <NextButton onPress={() => router.push("/setting")} />
        </TouchableOpacity>

        <TouchableOpacity className='bg-primary-200 flex-row items-center justify-between p-3 mb-3 rounded-b-lg'>
        <View className="flex-row items-center">
          <Image source={icons.exit} className="w-8 h-8 rounded-full" />
          <Text className="ml-4 text-black text-sm font-semibold">Sign Out</Text>
        </View>
        <NextButton onPress={handleSignOut} />
      </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};

export default Profile;
