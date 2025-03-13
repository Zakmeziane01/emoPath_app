import React from 'react';
import { TouchableOpacity, Image, Text, View } from 'react-native';

const CardButton = ({ imageSource, label, isSelected, onPress }) => {
  return (
    <View className="items-center m-2">
      <TouchableOpacity
        onPress={onPress}
        className={`w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm
          ${isSelected ? 'border-2 border-primary-300 bg-primary-100' : ''}`}
      >
        <Image source={imageSource} className="w-8 h-8" />
      </TouchableOpacity>
      <Text className="text-xs font-semibold text-gray-700 mt-2 text-center w-16">{label}</Text>
    </View>
  );
};

export default CardButton;
