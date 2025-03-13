import { Tabs,  Stack  } from "expo-router";
import { Image, ImageSourcePropType, Text, View } from "react-native";
import React from "react";

import icons from "@/constants/icons";

const TabIcon = ({
    focused,
    icon,
    title,
  }: {
    focused: boolean;
    icon: ImageSourcePropType;
    title: string;
  }) => (
    <View className="flex-1 mt-3 flex flex-col items-center">
      <Image
        source={icon}
        tintColor={focused ? "#0061FF" : "#666876"}
        resizeMode="contain"
        className="size-6"
      />

    </View>
  );

const TabsLayout = () => {
  return (
    <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#60D0C7",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "white",
            borderTopWidth: 1,
            borderTopColor: "white",
            height: 84,
          },
        }}
      >   
     <Tabs.Screen
        name="chatBox"
        options={{
          title: "chatBox",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.chatbox} title="chatBox" />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "explore",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.feedback} title="explore" />
          ),
        }}
      />


      
      <Tabs.Screen
        name="profile"
        options={{
          title: "profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.tracking} title="profile" />
          ),
        }}
      />
    </Tabs>

    
   

  )
}



export default TabsLayout