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
import { Searchbar } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import ColorScheme from "../../../global/ColorScheme";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useState } from "react";
import { render } from "react-dom";
import styles from "./PageStyles";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topPadding} />
      <View style={styles.searchBarArea}>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          inputStyle={{ backgroundColor: "white" }}
          containerStyle={{ backgroundColor: "white", borderWidth: 20 }}
        />
        <View style={styles.bottomPadding} />
      </View>
      <View style={styles.homePageMainContainer}>
        <View>
          <Text style={styles.homePageTitleText}>Around you</Text>
        </View>
        <View>
          <Text style={styles.homePageTitleText}>You might like</Text>
        </View>
        <View>
          <Text style={styles.homePageTitleText}>Promotions today</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomePage;
