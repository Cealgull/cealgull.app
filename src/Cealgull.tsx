import { RootTabParamList, RootStackParamList } from "@src/@types/navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { TransitionSpecs } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  HomeScreen,
  PersonScreen,
  PublishScreen,
  TopicScreen,
} from "./views/BottomTabScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { CardStyleInterpolators } from "@react-navigation/stack";

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createStackNavigator<RootStackParamList>();

const MainScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { display: "none" },
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen}></Tab.Screen>
      <Tab.Screen name="Person" component={PersonScreen}></Tab.Screen>
    </Tab.Navigator>
  );
};

export default function Cealgull() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            gestureDirection: "vertical",
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          }}
        >
          <Stack.Screen name="Main" component={MainScreen}></Stack.Screen>
          <Stack.Screen name="Publish" component={PublishScreen}></Stack.Screen>
          <Stack.Screen name="Topic" component={TopicScreen}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
