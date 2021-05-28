import React from "react";
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
import ColorScheme from "../../../global/ColorScheme";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useState } from "react";
import { render } from "react-dom";

const SettingsPage = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  );
};

export default SettingsPage;