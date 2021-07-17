import React, { Component, useReducer } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from './src/screens/LoginScreen/LoginScreen'
import RegisterScreen from './src/screens/RegisterScreen/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import SearchScreen from './src/screens/HomePages/HomePageScreen/SearchScreen'
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen/ForgotPasswordScreen';
import SaveImageScreen from './src/screens/PictureScreens/SaveImageScreen';
import CameraScreen from './src/screens/PictureScreens/CameraScreen'
import EateryScreen from './src/screens/EateryScreen/EateryScreen'
import CategoryScreen from './src/screens/CategoryScreen/CategoryScreen'
import DisplayPost from './src/screens/DisplayPostScreen/DisplayPostScreen';
import firebase from 'firebase'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'

const firebaseConfig = {
  apiKey: "AIzaSyCMC9BdNsV3AFN-IqRbFPweeXr0VHLE2xw",
  authDomain: "orbitalshit-444b0.firebaseapp.com",
  projectId: "orbitalshit-444b0",
  storageBucket: "orbitalshit-444b0.appspot.com",
  messagingSenderId: "539632643952",
  appId: "1:539632643952:web:577493dfa37c12195be9b5",
  measurementId: "G-HWGJRC6R67"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

const Stack = createStackNavigator();
const store = createStore(rootReducer, applyMiddleware(thunk))

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
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
            <Stack.Screen name="Camera" component={CameraScreen} />
            <Stack.Screen name="SaveImage" component={SaveImageScreen} />
            <Stack.Screen name="Eatery" component={EateryScreen} />
            <Stack.Screen name="Category" component={CategoryScreen} />
            <Stack.Screen name="DisplayPost" component={DisplayPost} />
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
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
            <Stack.Screen name="Camera" component={CameraScreen} />
            <Stack.Screen name="SaveImage" component={SaveImageScreen} />
            <Stack.Screen name="Eatery" component={EateryScreen} />
            <Stack.Screen name="Category" component={CategoryScreen} />
            <Stack.Screen name="DisplayPost" component={DisplayPost} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}

export default App
