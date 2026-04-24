import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from "../screens/HomeScreen";
import DetailScreen from "../screens/DetailScreen";
import FavoriteScreen from "../screens/FavoriteScreen";
import SearchScreen from "../screens/SearchScreen";
import AboutScreen from "../screens/AboutScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="DetailScreen" component={DetailScreen} />
    </Stack.Navigator>
  );
}

const getTabIcon = (routeName, focused) => {
  switch (routeName) {
    case "Book Catalogue":
      return focused ? "home" : "home-outline";
    case "Search":
      return focused ? "search" : "search-outline";
    case "Favorite":
      return focused ? "heart" : "heart-outline";
    case "About":
      return focused ? "person" : "person-outline";
    default:
      return "ellipse"; 
  }
};
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator 
      screenOptions={({  route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const iconName = getTabIcon(route.name, focused);
          return <Ionicons name={iconName} size={size} color={color} />;
        }
      })}>
        <Tab.Screen name="Book Catalogue" component={HomeStack} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Favorite" component={FavoriteScreen} />
        <Tab.Screen name="About" component={AboutScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}