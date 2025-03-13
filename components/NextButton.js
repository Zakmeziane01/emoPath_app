import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const NextButton = ({ onPress }) => {
  return (
    <TouchableOpacity 
      onPress={onPress} 
      className="flex-row items-center justify-center py-3 px-6 rounded-full"
    >
      <Text className="text-black text-lg font-bold ml-2">{">"}</Text>
    </TouchableOpacity>
  );
};

export default NextButton;
