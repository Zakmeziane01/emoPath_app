import { View, Text, SafeAreaView, Dimensions, ScrollView } from 'react-native';
import React from 'react';
import PieChart from 'react-native-pie-chart';
import { LineChart } from "react-native-chart-kit";

import Svg, { Rect, Text as SvgText } from "react-native-svg";


const screenWidth = Dimensions.get("window").width;

const MainProfile = () => {
  const pieWidth = 80; // Reduced size of PieChart

  const series = [
    { value: 300, color: '#D32F2F' },
    { value: 321, color: '#F57C00' },
    { value: 185, color: '#FFEB3B' },
    { value: 100, color: '#2196F3' },
    { value: 185, color: '#4CAF50' },
    { value: 200, color: '#8BC34A' },
  ];

  const data1 = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
    datasets: [
      {
        data: [20, 60, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`, // Red for Behavioral Issues and Emotional 
        strokeWidth: 2
      },
      {
        data: [20, 30, 50, 55, 70],
        color: (opacity = 1) => `rgba(54, 162, 235, ${opacity})`, // Blue for Social Skills
        strokeWidth: 2
      },
      {
        data: [30, 35, 50, 65, 85],
        color: (opacity = 1) => `rgba(75, 192, 192, ${opacity})`, // Green for Academic Performance
        strokeWidth: 2
      },
    ],
    legend: ["Emo-Behavioral", "Social", "Academic"]
  };

  const data2 = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
    datasets: [
      {
        data: [10, 25, 50, 35, 65],
        color: (opacity = 1) => `rgba(255, 159, 64, ${opacity})`, // Orange for Communication Skills
        strokeWidth: 2
      },
      {
        data: [50, 30, 70, 40, 80],
        color: (opacity = 1) => `rgba(255, 205, 86, ${opacity})`, // Yellow for Health Issues
        strokeWidth: 2
      },
      {
        data: [60, 40, 70, 50, 65],
        color: (opacity = 1) => `rgba(153, 255, 51, ${opacity})`, // Light Green for Cognitive Issues
        strokeWidth: 2
      },
    ],
    legend: ["Communication", "Health", "Cognitive"]
  };

  const behaviorData = {
    labels: [
      "Education",
      "Home",
      "PlayAreas",
      "Hobbies",
      "Playdates"
    ],
    datasets: [
      {
        data: [5, 12, 7, 15, 10], // Corresponding incidents for odd days
        color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`, // Red for Misbehavior incidents
        strokeWidth: 2
      },
    ],
    legend: ["Contextual Analysis of Behavioral Challenges"]
  };

  const cellSize = 40; // Size of each heatmap cell

  // Define X-axis (Time of day) and Y-axis (Days of the week)
  const timeLabels = ["Mor", "After", "Even", "Night"];
  const dayLabels = ["Mon","Tue", "Wed", "Thur", "Fri", "Satu", "Sun"];
  
  // Heatmap Data: { x (Time), y (Day), intensity (Value) }
  const heatmapData = [
    { x: 0, y: 0, intensity: 3 }, { x: 1, y: 0, intensity: 5 }, { x: 2, y: 0, intensity: 7 }, { x: 3, y: 0, intensity: 2 },
    { x: 0, y: 1, intensity: 4 }, { x: 1, y: 1, intensity: 6 }, { x: 2, y: 1, intensity: 8 }, { x: 3, y: 1, intensity: 3 },
    { x: 0, y: 2, intensity: 2 }, { x: 1, y: 2, intensity: 4 }, { x: 2, y: 2, intensity: 6 }, { x: 3, y: 2, intensity: 1 },
    { x: 0, y: 3, intensity: 1 }, { x: 1, y: 3, intensity: 3 }, { x: 2, y: 3, intensity: 5 }, { x: 3, y: 3, intensity: 2 },
    { x: 0, y: 4, intensity: 7 }, { x: 1, y: 4, intensity: 5 }, { x: 2, y: 4, intensity: 9 }, { x: 3, y: 4, intensity: 6 },
    { x: 0, y: 5, intensity: 6 }, { x: 1, y: 5, intensity: 8 }, { x: 2, y: 5, intensity: 10 }, { x: 3, y: 5, intensity: 4 },
    { x: 0, y: 6, intensity: 2 }, { x: 1, y: 6, intensity: 5 }, { x: 2, y: 6, intensity: 7 }, { x: 3, y: 6, intensity: 3 },
  ];
  
  // Define a function to determine heatmap color based on intensity
  const getColor = (value) => {
    if (value < 4) return "#FFEBEE"; // Light Red
    if (value < 7) return "#FFCDD2"; // Medium Red
    return "#D32F2F"; // Dark Red
  };

  return (
    <SafeAreaView className="p-4 flex-1 bg-primary-200">

    <Text className='mt-5 ml-10 font-bold text-base '>MY DASHBOARD</Text>

      <ScrollView className="w-full px-2 mt-10">

    <View className="bg-primary-300 p-4 rounded-lg mx-6 mt-6 items-center">
      <Text className="text-xs font-semibold text-center mb-7 mr-40">WEEKLY EMOTIONS</Text>
      <View className="flex flex-row items-center">
        <PieChart widthAndHeight={pieWidth} series={series} />
        <Text className="ml-4 text-sm mb-20">
          Weekly <Text className="font-semibold">Alexander</Text> Evaluation
        </Text>
      </View>
    </View>


    <View className="bg-white mx-7 mt-2 p-4 rounded-lg">
  {/* Title */}
  <Text className="text-xs font-semibold"> WEEKLY CHILD PROGRESS EVALUATION</Text>

  {/* Scrollable charts */}
  <ScrollView horizontal={true} contentContainerStyle={{ paddingHorizontal: 10 }} className="mt-8">
    <View className="rounded-l-lg overflow-hidden shadow-lg">
      <LineChart
        data={data1}
        width={screenWidth * 0.9}
        height={180}
        chartConfig={{
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          propsForDots: { r: "4", strokeWidth: "2", stroke: "#000" }
        }}
        bezier
      />
    </View>

    {/* Second Line Chart with rounded right corners */}
    <View className="rounded-r-lg overflow-hidden shadow-lg ml-5">
      <LineChart
        data={data2}
        width={screenWidth * 0.9}
        height={180}
        chartConfig={{
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          propsForDots: { r: "4", strokeWidth: "2", stroke: "#000" }
        }}
        bezier
      />
    </View>
  </ScrollView>
</View>


<View className="bg-white mx-7 mt-2 p-4 rounded-lg">
  {/* Title */}
  <Text className="text-xs font-semibold">LOCATION-BASED BEHAVIOR TREND</Text>

  {/* Scrollable charts */}
  <ScrollView horizontal={true} contentContainerStyle={{ paddingHorizontal: 10 }} className="mt-8">
    <View className="rounded-lg overflow-hidden shadow-lg">
      <LineChart
        data={behaviorData}
        width={screenWidth * 0.9}
        height={180}
        chartConfig={{
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          propsForDots: { r: "4", strokeWidth: "2", stroke: "#000" }
        }}
        bezier
      />
    </View>
  </ScrollView>
</View>

    <View className="bg-white mx-7 mt-2 p-4 rounded-lg">
  {/* Title */}
  <Text className="text-xs font-semibold">TIME-BASED BEHAVIOR PATTERNS</Text>

  {/* Heatmap with Y-axis labels */}
  <View className="flex flex-row justify-center">
    {/* Render Y-axis labels (Time of day) */}
    <View className="mr-3 mt-16">
      {timeLabels.map((label, index) => (
        <Text key={index} className="text-xs text-center mb-7">
          {label}
        </Text>
      ))}
    </View>

    {/* Render heatmap */}
    <Svg width={screenWidth * 0.7} height={cellSize * (timeLabels.length + 1)} className="rounded-lg shadow-lg">
      {heatmapData.map((d, i) => (
        <Rect
          key={i}
          x={d.y * cellSize} // Day (X-axis) corresponds to X position
          y={(d.x + 1) * cellSize} // Time (Y-axis) corresponds to Y position
          width={cellSize}
          height={cellSize}
          fill={getColor(d.intensity)} // Color based on intensity
        />
      ))}
    </Svg>        
  </View>

  {/* Render X-axis labels (Days of the week) */}
  <View className="flex flex-row justify-between w-[90%] mx-auto mt-2 mr-1">
    {dayLabels.map((label, index) => (
      <Text key={index} className="text-xs text-center">
        {label}
      </Text>
    ))}
  </View>
</View>



      </ScrollView>
    </SafeAreaView>
  );
};

export default MainProfile;
