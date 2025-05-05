import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  SafeAreaView,
  Alert
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import icons from "@/constants/icons";
import CardButton from '../../components/cardButton';
import { getParentAndChildAttributesByUserId } from "@/lib/appwrite";


const TabsContainer = ({ activeTab }) => {
  return (
    <View className="flex-row justify-around bg-white border-b border-gray-200 p-2">
      <Text className={`text-lg ${activeTab === "Chat" ? "font-bold text-primary-500" : "text-gray-500"}`}>
        Chat
      </Text>
    </View>
  );
};

const ChatBox = () => {
  const [selectedEmotion, setSelectedEmotion] = useState('');
  const [userInput, setUserInput] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [familyAttributes, setFamilyAttributes] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(true);
  const scrollViewRef = useRef();

  // API URL  - railway url 
  const API_URL = "https://emopathapi-production-2330.up.railway.app";
  const USER_ID = "67bb554f002db9391265"; 

  // Load chat history and check if first-time user
  useEffect(() => {
    const loadChatHistory = async () => {
      try {
        const response = await fetch(`${API_URL}/chat_history/${USER_ID}`);
        const data = await response.json();
        
        if (data.messages && Array.isArray(data.messages) && data.messages.length > 0) {
          setChatHistory(data.messages);
          setIsFirstTimeUser(false);
        } else {
          setIsFirstTimeUser(true);
          // Initialize with empty array to prevent mapping errors
          setChatHistory([]);
        }
      } catch (error) {
        console.error("Error loading chat history:", error);
        // Initialize with empty array on error
        setChatHistory([]);
      }
    };

    loadChatHistory();
  }, []);

  // Handle first-time user onboarding
  useEffect(() => {
    const handleFirstTimeUser = async () => {
      if (!isFirstTimeUser) return;
      
      try {
        setIsLoading(true);
        const familyData = await getParentAndChildAttributesByUserId(USER_ID);

        // Check if familyData is valid with at least some data
        if (familyData && (familyData.parent || (familyData.children && familyData.children.length > 0))) {
          setFamilyAttributes(familyData);
          
          // Add userId to the family data
          const requestData = {
            userId: USER_ID,
            parent: familyData.parent || {},
            children: Array.isArray(familyData.children) ? familyData.children : []
          };

          const response = await fetch(`${API_URL}/onboarding/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
          });

          const responseData = await response.json();

          if (response.ok) {
            // Add initial system response to chat history
            setChatHistory([{
              id: responseData.message_id || "system-init",
              type: 'system',
              content: responseData.message || "Welcome to EmoPath!",
              matched_cases: Array.isArray(responseData.matched_cases) ? responseData.matched_cases : []
            }]);
            
            setIsFirstTimeUser(false);
          } else {
            setChatHistory([{
              type: 'error',
              content: 'Sorry, I had trouble loading your initial recommendations.'
            }]);
          }
        } else {
          setChatHistory([{
            type: 'error',
            content: 'Unable to load your family profile data. Please ensure your profile is complete.'
          }]);
        }
      } catch (error) {
        console.error("Error in onboarding process:", error);
        setChatHistory([{
          type: 'error',
          content: 'Sorry, I had trouble connecting to the recommendation service.'
        }]);
      } finally {
        setIsLoading(false);
      }
    };

    handleFirstTimeUser();
  }, [isFirstTimeUser]);

  // Function to handle sending messages
  const handleSendMessage = async () => {
    if (!userInput.trim()) {
      Alert.alert("Missing input", "Please enter your message");
      return;
    }
    
    if (!selectedImage) {
      Alert.alert("Category required", "Please select a category");
      return;
    }
    
    if (!selectedEmotion) {
      Alert.alert("Emotion required", "Please select an emotion");
      return;
    }

    setIsLoading(true);

    try {
      const messageData = {
        userId: USER_ID,
        message: userInput,
        category: selectedImage,
        emotion: selectedEmotion
      };

      // Add user message to local chat history
      const userMessage = {
        type: 'user',
        content: userInput,
        category: selectedImage,
        emotion: selectedEmotion,
        timestamp: new Date().toISOString()
      };
      
      setChatHistory(prev => Array.isArray(prev) ? [...prev, userMessage] : [userMessage]);

      // Clear input
      setUserInput('');
      
      const response = await fetch(`${API_URL}/chat/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageData),
      });

      const responseData = await response.json();

      if (response.ok) {
        // Add system response to chat history
        setChatHistory(prev => Array.isArray(prev) ? [...prev, {
          id: responseData.message_id || "system-response",
          type: 'system',
          content: responseData.message || "Thank you for your message.",
          matched_cases: Array.isArray(responseData.matched_cases) ? responseData.matched_cases : [],
          timestamp: new Date().toISOString()
        }] : [{
          id: responseData.message_id || "system-response",
          type: 'system',
          content: responseData.message || "Thank you for your message.",
          matched_cases: Array.isArray(responseData.matched_cases) ? responseData.matched_cases : [],
          timestamp: new Date().toISOString()
        }]);
      } else {
        // Add error message to chat history
        setChatHistory(prev => Array.isArray(prev) ? [...prev, {
          type: 'error',
          content: `Sorry, I had trouble processing your request. (Error ${response.status})`
        }] : [{
          type: 'error',
          content: `Sorry, I had trouble processing your request. (Error ${response.status})`
        }]);
      }
    } catch (error) {
      console.error("Error in sending message:", error);
      // Add error message to chat history
      setChatHistory(prev => Array.isArray(prev) ? [...prev, {
        type: 'error',
        content: 'Sorry, something went wrong. Please check your internet connection.'
      }] : [{
        type: 'error',
        content: 'Sorry, something went wrong. Please check your internet connection.'
      }]);
    } finally {
      setIsLoading(false);
      // Scroll to bottom to show new messages
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 200);
    }
  };

  // Function to get placeholder text based on selected category
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
        return "Write your question here...";
    }
  };

  const handleImageSelect = (imageKey) => {
    setSelectedImage(imageKey);
  };

  const renderChatMessage = (message, index) => {
    if (!message) return null;
    
    if (message.type === 'error') {
      return (
        <View key={index} className="p-4 mx-4 my-2 rounded-xl bg-red-100">
          <Text className="text-red-700">{message.content || "Error occurred"}</Text>
        </View>
      );
    }

    return (
      <View key={index} className={`p-4 mx-4 my-2 rounded-xl ${
        message.type === 'user' ? 'bg-primary-300 ml-12' : 'bg-white mr-12'
      }`}>
        {message.type === 'user' && (
          <View className="flex-row mb-2">
            <Text className="text-xs text-gray-600">Category: {message.category || 'N/A'}</Text>
            <Text className="text-xs text-gray-600 ml-4">Emotion: {message.emotion || 'N/A'}</Text>
          </View>
        )}
        <Text className={message.type === 'user' ? 'text-white' : 'text-gray-800'}>
          {message.content || "No content"}
        </Text>
        {message.matched_cases && Array.isArray(message.matched_cases) && message.matched_cases.length > 0 && (
          <Text className="text-xs text-gray-500 mt-2">
            Sources: {message.matched_cases.join(', ')}
          </Text>
        )}
      </View>
    );
  };

  // Define emotions array to avoid undefined map issue
  const emotions = ['Happy', 'Sad', 'Angry', 'Frustrated', 'Confused', 'Scared', 'Surprised', 'Worried'];

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 bg-white">
        {/* Using simple tabs container that doesn't rely on any potentially undefined data */}
        <TabsContainer activeTab="Chat" />
        
        {/* Chat history */}
        <ScrollView 
          ref={scrollViewRef}
          className="flex-1 bg-gray-100"
          contentContainerStyle={{ paddingVertical: 16 }}
        >
          {/* Ensure chatHistory is an array before mapping */}
          {Array.isArray(chatHistory) && chatHistory.length > 0 ? (
            chatHistory.map((message, index) => renderChatMessage(message, index))
          ) : (
            <View className="flex-1 justify-center items-center p-6">
              <Text className="text-gray-500 text-center">
                {isLoading ? "Loading..." : "No messages yet. Start a conversation!"}
              </Text>
            </View>
          )}
        </ScrollView>
        
        {/* Category selection */}
        <View className="p-4 bg-white">
          <Text className="text-gray-700 font-medium mb-2">Select Category:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
            <CardButton
              text="Social"
              icon={icons.social}
              isSelected={selectedImage === 'social'}
              onPress={() => handleImageSelect('social')}
            />
            <CardButton
              text="Health"
              icon={icons.health}
              isSelected={selectedImage === 'health'}
              onPress={() => handleImageSelect('health')}
            />
            <CardButton
              text="Communication"
              icon={icons.communications}
              isSelected={selectedImage === 'communications'}
              onPress={() => handleImageSelect('communications')}
            />
            <CardButton
              text="Behavior"
              icon={icons.behavior}
              isSelected={selectedImage === 'behavior'}
              onPress={() => handleImageSelect('behavior')}
            />
            <CardButton
              text="School"
              icon={icons.school}
              isSelected={selectedImage === 'school'}
              onPress={() => handleImageSelect('school')}
            />
            <CardButton
              text="Cognitive"
              icon={icons.cognitive}
              isSelected={selectedImage === 'cognitive'}
              onPress={() => handleImageSelect('cognitive')}
            />
          </ScrollView>
          
          {/* Emotion selection */}
          <Text className="text-gray-700 font-medium mb-2">Select Emotion:</Text>
          <View className="flex-row flex-wrap mb-4">
            {emotions.map((emotion) => (
              <TouchableOpacity
                key={emotion}
                className={`py-2 px-4 m-1 rounded-full border ${
                  selectedEmotion === emotion.toLowerCase() 
                    ? 'bg-primary-300 border-primary-300' 
                    : 'bg-white border-gray-300'
                }`}
                onPress={() => setSelectedEmotion(emotion.toLowerCase())}
              >
                <Text className={`${
                  selectedEmotion === emotion.toLowerCase() ? 'text-white' : 'text-gray-700'
                }`}>
                  {emotion}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          {/* Message input */}
          <View className="flex-row items-center bg-gray-100 rounded-full p-2">
            <TextInput
              className="flex-1 pl-3 pr-2 py-2"
              placeholder={getPlaceholderText()}
              value={userInput}
              onChangeText={setUserInput}
              multiline
            />
            <TouchableOpacity
              className={`rounded-full p-2 ${
                !userInput.trim() || isLoading ? 'bg-gray-300' : 'bg-primary-500'
              }`}
              onPress={handleSendMessage}
              disabled={!userInput.trim() || isLoading}
            >
              {isLoading ? (
                <Ionicons name="ellipsis-horizontal" size={24} color="white" />
              ) : (
                <Ionicons name="send" size={24} color="white" />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default ChatBox;