import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from './src/screens/LoginScreen/LoginScreen'
import RegisterScreen from './src/screens/RegisterScreen/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen/HomeScreen'
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen/ForgotPasswordScreen';
import SaveImageScreen from './src/screens/PicturePages/SaveImageScreen'
import CameraScreen from './src/screens/PicturePages/CameraScreen'
import EateryScreen from './src/screens/EateryScreen/EateryScreen'
import ProfilePage from './src/screens/HomePages/ProfilePage'


const Stack = createStackNavigator();

/*
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
*/

import firebase from 'firebase'


import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'
const store = createStore(rootReducer, applyMiddleware(thunk))

const firebaseConfig = {
  apiKey: "AIzaSyCa2R9x2lIVE5HEAnyd4ZsUBFQU_kFiEDA",
  authDomain: "orbitalshit.firebaseapp.com",
  projectId: "orbitalshit",
  storageBucket: "orbitalshit.appspot.com",
  messagingSenderId: "677821659279",
  appId: "1:677821659279:web:6ac349d292b6e3f30b18fa",
  measurementId: "G-ZZM1KMXS0J"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

export class App extends Component {
  constructor(props) {
    super()
    this.state = {
      loaded: false,
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }
  render() {
    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return (  
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text>Loading</Text>
        </View>
      )
    }

    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login" headerMode='none'>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
            <Stack.Screen name="Camera" component={CameraScreen} />
            <Stack.Screen name="SaveImage" component={SaveImageScreen} />
            <Stack.Screen name="Eatery" component={EateryScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

    return (
      <Provider store={store}>
        <NavigationContainer >
          <Stack.Navigator initialRouteName="Home" headerMode='none'>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
            <Stack.Screen name="Camera" component={CameraScreen} />
            <Stack.Screen name="SaveImage" component={SaveImageScreen} />
            <Stack.Screen name="Eatery" component={EateryScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}

export default App
