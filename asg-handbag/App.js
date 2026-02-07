import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/Home';
import DetailScreen from './components/Detail';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FavoriteList from './components/FavoriteList';

export default function App() {

  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  const HomeStack = () => {
    return (
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}
        />
        <Stack.Screen name="Detail" component={DetailScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    )
  }

  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName='Favorite'>
        <Tab.Screen
          name="HomeTab"
          component={HomeStack}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              e.preventDefault();
              navigation.navigate('HomeTab', { screen: 'Home' });
            }
          })}
          options={{ headerShown: false, title: 'Home' }}
        />
        <Tab.Screen name="Favorite" component={FavoriteList} options={{ title: 'Favorite List', headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}