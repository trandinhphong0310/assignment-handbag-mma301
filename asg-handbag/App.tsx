import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/HomeScreen';
import DetailScreen from './components/DetailScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FavoriteList from './components/FavoriteList';

export type RootStackParamList = {
  HomeTabs: undefined;
  Detail: {
    id: String,
    handbagName: String,
    cost: Number,
    category?: String,
    color?: Array<String>,
    gender?: Boolean,
    uri: String,
    brand: String,
    percentOff: Number,
    rating: Number,
    isFavorite: Boolean,
    description: String,
    feedback: Array<Object>
  }
}

export type TabParamList = {
  Home: undefined;
  FavoriteList: {
    isFavorite: Boolean
  }
}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }} />
      <Tab.Screen name="Favorite List" component={FavoriteList} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          name="Home"
          component={HomeTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}