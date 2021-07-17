import React from "react";
import { StatusBar } from 'expo-status-bar';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  NavigationContainer,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import ColorScheme from "../../../../global/ColorScheme"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useState } from "react";
import { render } from "react-dom";
import * as Auth from '../../../../api/Authentication'
import styles from "./SettingsPageStyles"

const SettingsPage = (props) => {
  const handleLogOut = () => {
    Auth.signOut(
        () => props.navigation.navigate("Login"),
        (error) => alert(error.message)
    )
}
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
      <TouchableOpacity onPress={handleLogOut}>
        <Text>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsPage;
