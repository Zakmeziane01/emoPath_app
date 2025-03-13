import { TouchableOpacity, Text, View, Image } from 'react-native';
import React from 'react';

const CustomButton = ({ title, handlePress, containerStyles, textStyles, isLoading, icon }) => {
  return (
    <TouchableOpacity
      style={[
        {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0,
          shadowRadius: 10,
          elevation: 10,
        },
      ]}
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-primary-300 rounded-xl min-h-[62px] flex-row justify-center items-center mt-7 ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
      disabled={isLoading}
    >
      {/* If an icon is passed, render it next to the title */}
      {icon && <View style={{ marginRight: 10 }}>{icon}</View>}

      <Text className={`text-secondary-200 font-psemibold text-lg mx-5 ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
