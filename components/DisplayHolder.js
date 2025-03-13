import React from 'react';
import { Text, View, FlatList, Pressable } from 'react-native';

const DisplayHolder = ({ options, selectedValues, onPressOption, questionNumber }) => {
  const renderOption = ({ item }) => {
    const selectedIndex = selectedValues.indexOf(item.value);
    const isSelected = selectedIndex !== -1; // Check if item is selected

    return (
      <View className='rounded-xl bg-primary-200 mb-3 mx-10'>
        <View className="flex-row items-center justify-between p-3 rounded-lg">
          <View className="flex-1">
            <Text className="text-lg mx-3">{item.label}</Text>
            <Text className="text-sm mx-3 text-gray-500">{item.description}</Text>
          </View>
          <Pressable
            onPress={() => onPressOption(item.value, questionNumber)} // Pass question number
            className={`border-2 rounded-full w-10 h-8 items-center justify-center ${isSelected ? 'border-primary-300' : 'border-gray-300'}`}
          >
            <Text className={`${isSelected ? 'text-primary-300' : 'text-gray-300'} font-bold text-lg`}>
              {isSelected ? (selectedIndex + 1) : '+'}
            </Text>
          </Pressable>
        </View>
        <View className="border-b border-gray-300 mx-10" />
      </View>
    );
  };

  return (
    <FlatList
      className="mt-3.5"
      data={options}
      renderItem={renderOption}
      keyExtractor={(item) => item.value}
    />
  );
};

export default DisplayHolder;
