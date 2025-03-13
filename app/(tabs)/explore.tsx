import { View, Text, TextInput, Keyboard, TouchableWithoutFeedback, SafeAreaView, ScrollView } from 'react-native';
import React, { useState, useMemo } from 'react';
import { AirbnbRating } from 'react-native-ratings'; // Correct package for ratings
import MoodSelector from "../../components/MoodSelector";

const Explore = () => {
  const [userInput, setUserInput] = useState('');
  const [userInput1, setUserInput1] = useState('');
  const [currentValue, setCurrentValue] = useState(3);

  // Use useMemo for better performance (optional)
  const moods = useMemo(() => [
    "Understood and supported", 
    "Punished unfairly", 
    "Anxious or overwhelmed", 
    "Motivated to improve"
  ], []);

  const moods1 = useMemo(() => [
    "Yes, they were curious", 
    "No, they just accepted it", 
    "No, but they looked confused"
  ], []);

  const moods2 = useMemo(() => [
    "Yes, immediately", 
    "Yes, but slowly", 
    "No, no change", 
    "No, behavior worsened"
  ], []);

  const moods3 = useMemo(() => [
    "No, they seemed to understand", 
    "Yes, but less frequently", 
    "Yes, the same as before", 
    "Yes, even more frequently"
  ], []);

  const moods4 = useMemo(() => [
    "Very comfortable", 
    "Neutral", 
    "Uncomfortable"
  ], []);

  const moods5 = useMemo(() => [
    "More discussion-based (talking, explaining)", 
    "More action-based (chores, tasks)", 
    "More positive reinforcement (rewards, praise)", 
    "Stricter consequences (reduced privileges, time-outs)"
  ], []);

  const moods6 = useMemo(() => [
    "Yes, show alternative approaches", 
    "No, I want to try this again"
  ], []);

  // Separate state variables for each MoodSelector
  const [selectedMood1, setSelectedMood1] = useState(moods[0]);
  const [selectedMood2, setSelectedMood2] = useState(moods1[0]);
  const [selectedMood3, setSelectedMood3] = useState(moods2[0]);
  const [selectedMood4, setSelectedMood4] = useState(moods3[0]);
  const [selectedMood5, setSelectedMood5] = useState(moods4[0]);
  const [selectedMood6, setSelectedMood6] = useState(moods5[0]);
  const [selectedMood7, setSelectedMood7] = useState(moods6[0]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ScrollView>
        <SafeAreaView className="p-4 flex-1 bg-primary-200">

          {/* Instant Feedback Section */}
          <View className="mx-6 bg-white rounded-3xl">
            <View className='mx-6'>
              <Text className="text-2xl font-bold mt-7">Daily Instant Feedback Section</Text>
              <Text className="text-sm font-bold mt-8">The current recommended strategy</Text>
              <Text className="text-sm mt-3">
                Encourage your child to reflect on their behavior by writing an apology letter.
              </Text>

              <Text className="text-sm font-bold mt-7">Efficiency</Text>
              <View className="mt-3 mr-44">
                <AirbnbRating
                  count={5}
                  defaultRating={currentValue}
                  size={25}
                  showRating={false}
                  onFinishRating={(value) => setCurrentValue(value)}
                />
              </View>

              <Text className="text-sm font-bold mt-7">
                How did your child feel about the approach, and did they share their thoughts or emotions?
              </Text>
              <TextInput
                className="border-2 rounded-2xl p-5 border-gray-300 h-20 mt-5 mb-7"
                placeholder="Write your answer here..."
                multiline
                value={userInput}
                onChangeText={setUserInput}
              />
            </View>
          </View>

            {/* Weekly Strategy Feedback */}
            <View className="mx-6 bg-white rounded-3xl p-6 mt-4 mb-3">
              <Text className="text-2xl font-bold">Weekly Strategy Feedback</Text>

              {/* Divider */}
              <View className="border-t border-gray-300 my-5" />

              <Text className="text-xl font-bold">Measuring Emotional Impact</Text>
              <Text className="text-sm mt-3">
                Encourage your child to reflect on their behavior by writing an apology letter.
              </Text>

              <View className="mt-6">
                <Text className="text-base font-bold mb-4">Did your child seem to feel…?</Text>
                <MoodSelector moods={moods} selectedMood={selectedMood1} setSelectedMood={setSelectedMood1} />
              </View>

              <View className="mt-6">
                <Text className="text-base font-bold mb-4">Did they ask questions about why this consequence was given?</Text>
                <MoodSelector moods={moods1} selectedMood={selectedMood2} setSelectedMood={setSelectedMood2} />
              </View>

              {/* Divider */}
              <View className="border-t border-gray-300 my-5" />

              <Text className="text-xl font-bold">Behavioral Adjustment Over Time</Text>

              <View className="mt-6">
                <Text className="text-base font-bold mb-4">Did the child's behavior improve after using the approach?</Text>
                <MoodSelector moods={moods2} selectedMood={selectedMood3} setSelectedMood={setSelectedMood3} />
              </View>

              <View className="mt-6">
                <Text className="text-base font-bold mb-4">Did they repeat the misbehavior after this approach was used?</Text>
                <MoodSelector moods={moods3} selectedMood={selectedMood4} setSelectedMood={setSelectedMood4} />
              </View>

       
            <View className="border-t border-gray-300 my-5" />

            <Text className="text-xl font-bold">Reflection on the Effectiveness</Text>

            <View className="mt-6">
              <Text className="text-base font-bold mb-4">How comfortable did you feel using this approach?</Text>
              <MoodSelector moods={moods4} selectedMood={selectedMood5} setSelectedMood={setSelectedMood5} />
            </View>

            <View className="mt-6">
              <Text className="text-base font-bold mb-4">Would you try this approach again? Why or why not?</Text>
              <TextInput
                className="border-2 rounded-2xl p-5 border-gray-300 h-20 mt-5 mb-7"
                placeholder="Write your answer here..."
                multiline
                value={userInput1}
                onChangeText={setUserInput1}
              />
            </View>


            {/* Divider */}
            <View className="border-t border-gray-300 my-5" />

            <Text className="text-lg font-bold">Adapting Future Strategies</Text>

            <View className="mt-6">
              <Text className="text-base font-bold mb-4">Would you prefer a different type of consequence next time?</Text>
              <MoodSelector moods={moods5} selectedMood={selectedMood6} setSelectedMood={setSelectedMood6} />
            </View>

            <View className="mt-6">
              <Text className="text-base font-bold mb-4">Would you like additional suggestions based on this response?</Text>
              <MoodSelector moods={moods6} selectedMood={selectedMood7} setSelectedMood={setSelectedMood7} />
            </View>
            </View>

        </SafeAreaView>
      </ScrollView>    
    </TouchableWithoutFeedback>
  );
};

export default Explore;
