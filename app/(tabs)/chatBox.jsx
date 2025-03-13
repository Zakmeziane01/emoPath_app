import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  SafeAreaView,Image
} from 'react-native';
import React, { useState } from 'react';
import TabsContainer from '@/components/TabsContainer';
import { Ionicons } from '@expo/vector-icons';
import icons from "@/constants/icons";
import CardButton from '../../components/cardButton';
import {getParentAndChildAttributesByUserId } from "@"

const ChatBox = () => {
  const [selectedEmotion, setSelectedEmotion] = useState('');
  const [userInput, setUserInput] = useState('');
    // Set prompt based on selected topic
  const getPlaceholderText = () => {
    switch (selectedImage) {
      case 'social':
        return "Describe the social misbehavior";
      case 'health':
        return "What health-related issue occurred?";
      case 'communications':
        return "Describe the communication breakdown";
      case 'behavior':
        return "What was the specific behavior issue?";
      case 'school':
        return "Describe the academic issue or difficulty";
      case 'cognitive':
        return "What cognitive challenges or behavior were observed?";
      default:
        return "Write your answer here...";
    }
  };
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageSelect = (imageKey) => {
    setSelectedImage(imageKey);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView className="bg-primary-200 flex-1 p-6">

        <View className="mt-7">

        <View className="flex-row items-center justify-center">
        <Image
          source={icons.id}
          className="w-20 h-20 rounded-full"
        />
      </View>

      <Text className="text-xl text-center mt-4 font-bold">What can I help with?</Text>

      <View className="relative mt-6">
        <TextInput
          className="border-2 rounded-2xl p-6 mx-6 border-gray-300 h-20 bg-white"
          placeholder={getPlaceholderText()}  // Dynamically set the placeholder
          placeholderTextColor="gray"
          multiline
          value={userInput}
          onChangeText={setUserInput}
        />
        <TouchableOpacity className="absolute right-10 top-1/2 -translate-y-1/2 bg-primary-300 w-8 h-8 rounded-full items-center justify-center">
          <Ionicons name="send" size={14} color="white" />
        </TouchableOpacity>
      </View>


        {/* Scrollable Category Buttons */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-2">
          <View className="flex-row">
            <CardButton imageSource={icons.behavior} label="Behavior" isSelected={selectedImage === 'behavior'} onPress={() => handleImageSelect('behavior')} />
            <CardButton imageSource={icons.school} label="School" isSelected={selectedImage === 'school'} onPress={() => handleImageSelect('school')} />
            <CardButton imageSource={icons.social} label="Social" isSelected={selectedImage === 'social'} onPress={() => handleImageSelect('social')} />
            <CardButton imageSource={icons.health} label="Health" isSelected={selectedImage === 'health'} onPress={() => handleImageSelect('health')} />
            <CardButton imageSource={icons.communications} label="Communs" isSelected={selectedImage === 'communications'} onPress={() => handleImageSelect('communications')} />
            <CardButton imageSource={icons.cognitive} label="Cognitive" isSelected={selectedImage === 'cognitive'} onPress={() => handleImageSelect('cognitive')} />
          </View>
        </ScrollView>

        <View className="mt-10 mx-8">
          <Text className="text-base font-semibold text-center">Select the child's current emotion</Text>
          <Text className="text-xs mt-2 mx-3 ml-6">Select the emotion that best describes how the child is feeling right now to help us respond appropriately.</Text>
      </View>

       <View>  
      <ScrollView> 
        <TabsContainer options={['Furious', 'Angry', 'Frustrated', 'Upset', 'Annoyed', 'Calm']} value={selectedEmotion} handleChangeText={setSelectedEmotion} />
      </ScrollView>
      </View> 



        </View>

      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default ChatBox;
