import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

const emotionIcons = {
  Furious: 'whatshot',
  Angry: 'flash-on',
  Frustrated: 'sentiment-dissatisfied',
  Upset: 'mood-bad',
  Annoyed: 'sentiment-neutral',
  Calm: 'sentiment-satisfied',
};

const emotionColors = {
  Furious: '#D32F2F', // Dark Red
  Angry: '#F57C00', // Orange
  Frustrated: '#FFEB3B', // Yellow
  Upset: '#2196F3', // Blue
  Annoyed: '#4CAF50', // Green
  Calm: '#8BC34A', // Light Green
};

const TabsContainer = ({ options, value, handleChangeText, showIcon = true }) => {
  return (
    <View className='mx-1 p-10'>
      {options.map((option, index) => (
        <TouchableOpacity
          key={option}
          onPress={() => handleChangeText(option)}
          className={`flex-row items-center rounded-3xl min-h-[50px] justify-between border-2 my-1 p-3 border-gray-300 bg-white `} 
        >
          <View className="flex-row items-center">   
            {showIcon && (
              <MaterialIcons
                name={emotionIcons[option]}
                size={24}
                color={emotionColors[option]} // Always keep the icon color
              />
            )}
            <Text className="ml-2 text-base text-[#7b7b8b] font-pregular">
              {option}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>

            
            <View
              style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: value === option ? emotionColors[option] : 'gray', // Border color changes on selection
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 8,
              }}
            >
              {value === option && (
                <View
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: 8,
                    backgroundColor: emotionColors[option],
                  }}
                />
              )}
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default TabsContainer;
