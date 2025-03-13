import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { CheckCircle, Circle } from "lucide-react-native";

const MoodSelector = ({ moods, selectedMood, setSelectedMood }) => {
  return (
    <View className="flex-row flex-wrap gap-5">
      {moods.map((mood) => (
        <TouchableOpacity
          key={mood}
          onPress={() => setSelectedMood(mood)}
          className="flex-row items-center gap-2"
        >
          {selectedMood === mood ? (
            <CheckCircle size={24} color="#007AFF" />
          ) : (
            <Circle size={24} color="gray" />
          )}
          <Text className="text-base font-medium text-black">{mood}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default MoodSelector;
