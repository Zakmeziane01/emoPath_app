import { View, Text, TextInput, TouchableOpacity, Image, Alert, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import { useGlobalContext } from "@/lib/global-provider";
import { updateChildAttribute, uploadAvatar } from '@/lib/appwrite';
import { router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import icons from "@/constants/icons";




const KidsCount = () => {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [grade, setGrade] = useState('');
  const [gender, setGender] = useState('');
  const { user } = useGlobalContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const avatars = [
    icons.id6,
    icons.id2,
    icons.id3, 
    icons.id4,
    icons.id5,
    icons.id7,
    icons.id8,
    icons.id9
  ];


  const handleSubmit = async () => {
    if (!user || !user.$id) {
      Alert.alert("Error", "User ID is missing.");
      return;
    }
  
    if (!name || !age || !grade || !gender || !selectedAvatar) {
      Alert.alert("Error", "Please fill in all fields and select an avatar.");
      return;
    }
  
    try {
      setIsSubmitting(true);
      const parentId = user.$id;
  
      let avatarFile = null;
  
      // If selectedAvatar is a local image (number), resolve it to a URI
      if (typeof selectedAvatar === "number") {
        const resolvedAsset = Image.resolveAssetSource(selectedAvatar);
        if (!resolvedAsset || !resolvedAsset.uri) {
          throw new Error("Failed to resolve avatar image URI.");
        }
  
        avatarFile = {
          uri: resolvedAsset.uri,
          type: "image/png", // Adjust based on expected type
          name: `avatar_${Date.now()}.png`, // Generate a unique name
        };
      }
  
      if (!avatarFile) {
        throw new Error("Invalid avatar format.");
      }
  
      // Upload the avatar to Appwrite
      const avatarFileId = await uploadAvatar(avatarFile);
  
      const childData = {
        name,
        age,
        grade,
        gender,
        avatar: avatarFileId,
      };

      await updateChildAttribute(parentId, null, childData);
      Alert.alert("Success", "Child data saved successfully!");
      router.push("/relationshipWithChild");
    } catch (error) {
      console.error("Error saving data:", error);
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      Alert.alert("Error", errorMessage);

    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className='mt-5 '>
      <Text className='text-2xl font-semibold mb-3 mt-10 mx-10'>Select Your Avatar</Text>
      <View className='flex-row flex-wrap justify-center bg-primary-200 mt-5 p-4 rounded-tl-2xl rounded-br-2xl mx-4'>
  {avatars.map((avatar, index) => (
    <TouchableOpacity 
      key={index} 
      onPress={() => setSelectedAvatar(avatar)} 
      className='m-2 shadow-sm'>
      <View className='w-20 h-20 flex items-center justify-center'>
        <Image 
          source={avatar} 
          className='w-20 h-20 rounded-full' 
          style={{
            opacity: selectedAvatar === avatar ? 1 : 0.5, // Full opacity for selected, 50% for unselected
          }} 
        />
      </View>
    </TouchableOpacity>
  ))}
</View>



      <View className="mt-10 space-y-5 mx-10">
        <View className="border-b border-gray-500 pb-1 mt-5">
          <Text className="text-gray-500 text-xs">Child's Name</Text>
          <TextInput
            className="text-lg text-black"
            value={name}
            onChangeText={setName}
            placeholder=""
            placeholderTextColor="transparent"
          />
        </View>

        <View className="border-b border-gray-500 pb-1 mt-5">
          <Text className="text-gray-500 text-xs">Age</Text>
          <TextInput
            className="text-lg text-black"
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
            placeholder=""
            placeholderTextColor="transparent"
          />
        </View>

        <View className="border-b border-gray-500 pb-1 mt-5">
          <Text className="text-gray-500 text-xs">Grade</Text>
          <TextInput
            className="text-lg text-black"
            value={grade}
            onChangeText={setGrade}
            placeholder=""
            placeholderTextColor="transparent"
          />
        </View>

        <View className="border-b border-gray-500 pb-1 mt-5">
          <Text className="text-gray-500 text-xs">Gender</Text>
          <TextInput
            className="text-lg text-black"
            value={gender}
            onChangeText={setGender}
            placeholder=""
            placeholderTextColor="transparent"
          />
        </View>

      </View>


      <View className="mx-4 my-3 mt-10">
      <CustomButton
          title={isSubmitting ? "Saving..." : "Next"}
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

export default KidsCount;
