import React from 'react';
import { View, Animated } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { FavoritesProvider } from '../../FavoritesContext';

// Screens
import HomeScreen from './index';
import ListScreen from './list';
import ProfileScreen from './about';
import SettingsScreen from './settings';
import DetailsScreen from '../details';
import FavoritesScreen from './favorites';

export type RootStackParamList = {
  Tabs: undefined;
  Details: {
    item: {
      id: string;
      title: string;
      image: any;
      description: string;
      category: string;
      mapUrl: string;
    };
  };
};

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator<RootStackParamList>();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FDF6EC', // 👈 Colonial Cream background
          borderRadius: 25,
          position: 'absolute',
          bottom: 20,
          left: 25,
          right: 25,
          height: 65,
          shadowColor: '#000',
          shadowOpacity: 0.15,
          shadowRadius: 8,
          elevation: 8,
        },
        tabBarShowLabel: false,
        tabBarIcon: ({ focused }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Highlights') {
            iconName = 'list-outline';
          } else if (route.name === 'Favorites') {
            iconName = 'heart-outline';
          } else if (route.name === 'About') {
            iconName = 'grid-outline';
          } else {
            iconName = 'settings-outline';
          }

          // Smooth animation for active tab
          const scaleAnim = new Animated.Value(focused ? 1.1 : 1);
          Animated.spring(scaleAnim, {
            toValue: focused ? 1.1 : 1,
            friction: 5,
            useNativeDriver: true,
          }).start();

          return (
            <Animated.View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                transform: [{ scale: scaleAnim }],
                backgroundColor: focused ? '#00A49B' : 'transparent', // 👈 Persian Green pill
                paddingHorizontal: focused ? 12 : 0,
                paddingVertical: focused ? 8 : 0,
                borderRadius: 20,
              }}
            >
              <Ionicons
                name={iconName}
                size={24}
                color={focused ? '#fff' : '#1E3D59'} // 👈 Active white, inactive Straits Blue
              />
            </Animated.View>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Highlights" component={ListScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="About" component={ProfileScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function Layout() {
  return (
    <FavoritesProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tabs" component={Tabs} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </FavoritesProvider>
  );
}
