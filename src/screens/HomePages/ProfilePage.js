import React from "react";
import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import ColorScheme from "../../../global/ColorScheme";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useState } from "react";
import firebase from 'firebase'
require('firebase/firestore')
import { connect } from 'react-redux'

const ProfilePage = (props) => {
  const { currentUser, posts } = props;
  console.log(currentUser, posts)
  return (
    <View style={styles.container}>
      <View style={styles.containerInfo}>
        <Text>{currentUser.username}</Text>
        <Text>{currentUser.email}</Text>
      </View>

      <View style={styles.containerGallery}>
        <FlatList 
          numColumns={3}
          horizontal={false}
          data={posts}
          renderItem={({item}) => (
            <View style={styles.containerImage}> 
            <Image
              style={styles.image}
              source={{uri: item.downloadURL}}
            />
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles= StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  containerInfo: {
    margin: 20,
  },
  containerGallery: {
    flex: 1,
  },
  image: {
    flex:1,
    aspectRatio: 1/1,
  },
  containerImage: {
    flex: 1/3
  },
})

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  posts: store.userState.posts,
})

export default connect(mapStateToProps, null)(ProfilePage);
