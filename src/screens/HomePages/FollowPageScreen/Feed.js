import React from "react";
import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  Button,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import ColorScheme from "../../../../global/ColorScheme";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useState, useEffect } from "react";
import firebase from 'firebase'
require('firebase/firestore')
import { connect } from 'react-redux'
import styles from "./FollowPageStyles"

const Feed = (props) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let posts = [];
    if (props.usersLoaded === props.following.length) {
        for (let i = 0; i < props.following.length; i++) {
            const user = props.users.find(el => el.uid === props.following[i]);
            if (user != undefined) {
                posts = [...posts, ...user.posts]
            }
        }

        posts.sort(function(x, y) {
            return y.creation - x.creation;
        })

        setPosts(posts)
    }
  }, [props.usersLoaded])

  return (
    <View style={styles.container}>

      <View style={styles.containerGallery}>
        <FlatList 
          numColumns={1}
          horizontal={false}
          data={posts}
          renderItem={({item}) => (
            <View style={styles.containerImage}> 
            <Image
              style={styles.image}
              source={{uri: item.downloadURL}}
            />
            <Text style={{flex:1}}>{item.user.username}</Text>
            <Text style={styles.container}>{item.caption}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};


const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  following: store.userState.following,
  users: store.usersState.users,
  usersLoaded: store.usersState.usersLoaded,
})

export default connect(mapStateToProps, null)(Feed);
