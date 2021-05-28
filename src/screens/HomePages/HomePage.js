import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  NavigationContainer,
} from "react-native";
import { SearchBar } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import ColorScheme from "../../../global/ColorScheme";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useState } from "react";
import { render } from "react-dom";
import styles from "./HomePagesStyles";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <Text>Home!</Text>
    </SafeAreaView>
  );
};

export default HomePage;
