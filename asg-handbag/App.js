import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './views/HomeScreen';
import DetailScreen from './views/DetailScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FavoriteList from './components/FavoriteList';

export default function App() {

  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  const HomeStack = () => {
    return (
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    )
  }

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="HomeTab" component={HomeStack} options={{ headerShown: false, title: 'Home' }} />
        <Tab.Screen name="Favorite" component={FavoriteList} options={{ title: 'Favorite List' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}