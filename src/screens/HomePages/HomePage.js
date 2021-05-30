import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  FlatList,
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
      <View style={styles.homePageTopPadding} />
      <View style={styles.searchBarArea}>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          inputStyle={{ backgroundColor: "white" }}
          containerStyle={{ backgroundColor: "white", borderWidth: 20 }}
        />
        <View style={styles.homePageMiddlePadding} />
      </View>
      <View style={styles.homePageMainContainer}>
        <View style={styles.homePageSmallContainer}>
          <Text style={styles.homePageTitleText}>Around you</Text>
          <ScrollView horizontal={true}>
            <TouchableOpacity style={styles.homePageImageBlock} onPress={() => console.log("Pressed Image 1!")}>
              <Image style={styles.homePageImage} source={{uri: "https://lh5.googleusercontent.com/p/AF1QipNPaT4z6hEDZ3XWI6es3IjhzBSSDLjzOBqYt3V7=w408-h306-k-no"}}/>
              <Text>KDS Indian and Muslim Food</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.homePageImageBlock} onPress={() => console.log("Pressed Image 2!")}>
              <Image style={styles.homePageImage} source={{uri: "https://res.cloudinary.com/abillionveg/image/upload/q_auto,a_exif,w_1080,h_1080,c_fill/v1587483278/c5cxuymoy3mueuziwmpi.jpg"}}/>
              <Text>777 Eating House</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.homePageImageBlock} onPress={() => console.log("Pressed Image 3!")}>
              <Image style={styles.homePageImage} source={{uri: "https://lh3.googleusercontent.com/proxy/DdjAzjGAV4pvLV2jZ08oWUdRo3jBrJ7t5292Js1fElSd3MSMvsGITnzLpiu6XgtgVF2F7z1NNTEmdWQonHa86ys"}}/>
              <Text>Kamikaze Asian Tapas Bar</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        <View style={styles.homePageSmallContainer}>
          <Text style={styles.homePageTitleText}>You might like</Text>
          <ScrollView horizontal={true}>
            <TouchableOpacity style={styles.homePageImageBlock} onPress={() => console.log("Pressed Image 1!")}>
              <Image style={styles.homePageImage} source={{uri: "https://cdn.foodadvisor.com.sg/3/800/ycqwu/vt-iw/BX/n6in-xuhe.zfw/chowhound-western-grill.jpg"}}/>
              <Text>Chowhound Western Grill</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.homePageImageBlock} onPress={() => console.log("Pressed Image 2!")}>
              <Image style={styles.homePageImage} source={{uri: "https://eatbook.sg/wp-content/uploads/2018/07/Do-And-Me-Flatlay.jpg"}}/>
              <Text>Do & Me Western</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.homePageImageBlock} onPress={() => console.log("Pressed Image 3!")}>
              <Image style={styles.homePageImage} source={{uri: "http://www.smokinjoe.com.sg/common/wp-content/uploads/2018/08/shinmindaily.jpg"}}/>
              <Text>Smokin' Joe</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        <View style={styles.homePageSmallContainer}>
          <Text style={styles.homePageTitleText}>Promotions today</Text>
          <ScrollView horizontal={true}>
            <TouchableOpacity style={styles.homePageImageBlock} onPress={() => console.log("Pressed Image 1!")}>
              <Image style={styles.homePageImage} source={{uri: "https://farm5.staticflickr.com/4714/39276883744_b21c549ca3_o.jpg"}}/>
              <Text>Pizzamaru</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.homePageImageBlock} onPress={() => console.log("Pressed Image 2!")}>
              <Image style={styles.homePageImage} source={{uri: "https://farm5.staticflickr.com/4616/39987056621_e18d6a9355_o.jpg"}}/>
              <Text>Big Fish Small Fish</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.homePageImageBlock} onPress={() => console.log("Pressed Image 3!")}>
              <Image style={styles.homePageImage} source={{uri: "https://farm5.staticflickr.com/4751/39089165685_db9056645e_o.jpg"}}/>
              <Text>Collin's</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
      <View style={styles.homePageBottomPadding} />
    </SafeAreaView>
  );
};

export default HomePage;
