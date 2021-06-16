import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from './src/screens/LoginScreen/LoginScreen'
import RegisterScreen from './src/screens/RegisterScreen/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen/HomeScreen'
import MainScreen from './src/screens/Main/MainScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen/ForgotPasswordScreen';
import SaveImageScreen from './src/screens/PicturePages/SaveImageScreen'
import CameraScreen from './src/screens/PicturePages/CameraScreen'
import EateryScreen from './src/screens/EateryScreen/EateryScreen'
import ProfilePage from './src/screens/HomePages/ProfilePage'
import CameraPage from './src/screens/HomePages/CameraPage';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Main'} headerMode= 'none'>
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="SaveImage" component={SaveImageScreen} />
        <Stack.Screen name="Eatery" component={EateryScreen} />
        <Stack.Screen name="CameraPage" component={CameraPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
