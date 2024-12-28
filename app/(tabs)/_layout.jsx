import { View, Text, Image } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import  icons from '../../constants/icons.js'; // Ensure the correct path

const TabLayout = () => {

  function TabIcon({ icons, color, name, focused }) {
    return (
      <View className="mt-5 items-center justify-center w-screen gap-2">
        <Image
          source={icons}
          resizeMode="contain"
          style={{ width: 24, height: 24, tintColor: color }}
        />
        <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs whitespace-nowrap`} style={{color: color}} >{name}</Text>
      </View>
    );
  }
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor:'#FFA001',
        tabBarInactiveTintColor:'#CDCDE0',
        tabBarStyle:{
          backgroundColor:'#161622',
          borderTopWidth: 1,
          borderTopColor:'#232533',
          height: 64.
        }
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (

            <TabIcon icons={icons.home} color={color} name="home" focused={focused}/>
          ),
        }}
      />
        <Tabs.Screen
        name="bookmark"
        options={{
          title: 'Bookmark',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (

            <TabIcon icons={icons.bookmark} color={color} name="Bookmark" focused={focused}/>
          ),
        }}
      />
         <Tabs.Screen
        name="create"
        options={{
          title: 'Create',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (

            <TabIcon icons={icons.plus} color={color} name="Create" focused={focused}/>
          ),
        }}
      />
         <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (

            <TabIcon icons={icons.profile} color={color} name="Profile" focused={focused}/>
          ),
        }}
      />
      {/* Add more Tabs.Screen items here */}
    </Tabs>
  );
};

export default TabLayout;
