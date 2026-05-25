import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ListScreen from './app/(tabs)/list';
import FavoritesScreen from './app/(tabs)/favorites';
import { FavoritesProvider } from './FavoritesContext';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <FavoritesProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              const iconName =
                route.name === 'Highlights'
                  ? 'list'
                  : route.name === 'Favorites'
                  ? 'heart'
                  : 'ellipse';
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#00baff',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Highlights" component={ListScreen} />
          <Tab.Screen name="Favorites" component={FavoritesScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </FavoritesProvider>
  );
}
