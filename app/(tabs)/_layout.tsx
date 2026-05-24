import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons'; 
import HomeScreen from './index';
import ListScreen from './list';
import ProfileScreen from './about';
import SettingsScreen from './settings';
import DetailsScreen from '../details';

// Define your stack params here
type RootStackParamList = {
  Tabs: undefined;
  Details: { item: { id: string; title: string; image: any; description: string } };
};

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator<RootStackParamList>();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          position: 'absolute',
          height: 85,
          paddingBottom: 10,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 5,
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#999',
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'help-outline';

          if (route.name === 'Explore') {
            iconName = 'compass-outline';
          } else if (route.name === 'Highlights') {
            iconName = 'star-outline';
          } else if (route.name === 'About') {
            iconName = 'information-circle-outline';
          } else if (route.name === 'Settings') {
            iconName = 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginBottom: 5,
        },
      })}
    >
      <Tab.Screen name="Explore" component={HomeScreen} />
      <Tab.Screen name="Highlights" component={ListScreen} />
      <Tab.Screen name="About" component={ProfileScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function Layout() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={Tabs} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}
