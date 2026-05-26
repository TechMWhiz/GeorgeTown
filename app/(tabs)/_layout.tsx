import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { Animated } from 'react-native';

import { FavoritesProvider } from '../../FavoritesContext';
import { BookingsProvider } from '../BookingsContext'; 
import { ProfileProvider } from '../ProfileContext';
import { ThemeProvider, useTheme } from '../ThemeContext';
import { lightTheme, darkTheme } from '../themeColors';

import HomeScreen from './index';
import ListScreen from './list';
import AboutScreen from './about';
import SettingsScreen from './settings';
import DetailsScreen from '../details';
import FavoritesScreen from './favorites';
import BookingForm from '../BookingForm';
import BookingHistoryScreen from '../BookingHistoryScreen';
import ProfileScreen from './profile';
import EditProfileScreen from './EditProfileScreen';

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
      gallery?: any[];
    };
  };
  About: undefined;
  Settings: undefined;
  Profile: undefined;
  EditProfile: undefined;
  BookingForm: {
    item: {
      id: string;
      title: string;
      image: any;
      description: string;
      category: string;
      mapUrl: string;
      gallery?: any[];
    };
  };
  BookingHistory: undefined;
};

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator<RootStackParamList>();

function Tabs() {
  const { theme } = useTheme();
  const colors = theme === 'dark' ? darkTheme : lightTheme;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderRadius: 25,
          position: 'absolute',
          bottom: 20,
          left: 20,
          right: 20,
          height: 55,
          shadowColor: '#000',
          shadowOpacity: 0.15,
          shadowRadius: 8,
          elevation: 8,
          borderWidth: 1,
          borderColor: colors.divider,
        },
        tabBarShowLabel: false,
        tabBarIcon: ({ focused }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') iconName = 'home-outline';
          else if (route.name === 'Highlights') iconName = 'list-outline';
          else if (route.name === 'Favorites') iconName = 'heart-outline';
          else if (route.name === 'About') iconName = 'grid-outline';
          else iconName = 'settings-outline';

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
                backgroundColor: focused ? colors.accent : 'transparent',
                paddingHorizontal: focused ? 12 : 0,
                paddingVertical: focused ? 8 : 0,
                borderRadius: 20,
                shadowColor: focused ? colors.accent : 'transparent', 
                shadowOpacity: focused ? 0.4 : 0,
                shadowRadius: focused ? 6 : 0,
              }}
            >
              <Ionicons
                name={iconName}
                size={24}
                color={focused ? '#fff' : colors.text} 
              />
            </Animated.View>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Highlights" component={ListScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function Layout() {
  return (
    <FavoritesProvider>
      <BookingsProvider>
        <ProfileProvider>
          <ThemeProvider>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Tabs" component={Tabs} />
              <Stack.Screen name="Details" component={DetailsScreen} />
              <Stack.Screen name="About" component={AboutScreen} />
              <Stack.Screen name="Settings" component={SettingsScreen} />
              <Stack.Screen name="BookingForm" component={BookingForm} />
              <Stack.Screen name="BookingHistory" component={BookingHistoryScreen} />
              <Stack.Screen name="Profile" component={ProfileScreen} />
              <Stack.Screen name="EditProfile" component={EditProfileScreen} />
            </Stack.Navigator>
          </ThemeProvider>
        </ProfileProvider>
      </BookingsProvider>
    </FavoritesProvider>
  );
}
