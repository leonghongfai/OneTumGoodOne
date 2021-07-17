import React from "react";
import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  Button,
  RefreshControl
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import ColorScheme from "../../../../global/ColorScheme";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useState, useEffect } from "react";
import firebase from 'firebase'
require('firebase/firestore')
import { connect } from 'react-redux'
import { TouchableOpacity } from "react-native";
import styles from "./ProfilePageStyles"

const ProfilePage = (props) => {
  const [userPosts, setUserPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [following, setFollowing] = useState(false)
	const [refreshing, setRefreshing] = React.useState(false);

  const wait = (timeout) => {
		return new Promise(resolve => setTimeout(resolve, timeout));
	}

	const onRefresh = React.useCallback(() => {
	  setRefreshing(true);
	  wait(2000).then(() => setRefreshing(false));
    firebase.firestore()
      .collection("posts")
      .doc(props.route.params.uid)
      .collection("userPosts")
      .orderBy("creation", "asc")
      .get()
      .then((snapshot) => {
          let posts = snapshot.docs.map(doc => {
              const data = doc.data();
              const id = doc.id;
              return { id, ...data }
          })
          setUserPosts(posts)
      })
	}, []);

  useEffect(() => {
    const { currentUser, posts } = props

    if (props.route.params.uid === firebase.auth().currentUser.uid) {
      setUser(currentUser)
      setUserPosts(posts)
    } else {
      firebase.firestore()
        .collection("users")
        .doc(props.route.params.uid)
        .get()
        .then((snapshot) => {
            if (snapshot.exists) {
                setUser(snapshot.data());
                console.log(user)
            }
            else {
                console.log('does not exist')
            }
        })
      firebase.firestore()
      .collection("posts")
      .doc(props.route.params.uid)
      .collection("userPosts")
      .orderBy("creation", "asc")
      .get()
      .then((snapshot) => {
          let posts = snapshot.docs.map(doc => {
              const data = doc.data();
              const id = doc.id;
              return { id, ...data }
          })
          setUserPosts(posts)
      })
    }

    if (props.following.indexOf(props.route.params.uid) > -1) {
      setFollowing(true)
    } else {
      setFollowing(false)
    }

  }, [props.route.params.uid, props.following])

  const onFollow = () => {
    firebase.firestore()
    .collection("following")
    .doc(firebase.auth().currentUser.uid)
    .collection("userFollowing")
    .doc(props.route.params.uid)
    .set({})
  }

  const onUnfollow = () => {
    firebase.firestore()
    .collection("following")
    .doc(firebase.auth().currentUser.uid)
    .collection("userFollowing")
    .doc(props.route.params.uid)
    .delete()
  }

  if (user === null) {
    return <View />
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerInfo}>
        <Text>{user.username}</Text>
        <Text>{user.email}</Text>

        {props.route.params.uid !== firebase.auth().currentUser.uid
        ? (
          <View>
            {following? (
              <Button 
                title="Following"
                onPress={() => onUnfollow()}
                />            
              )
            : (
              <Button 
                title="Follow"
                onPress={() => onFollow()}
              />
            )
            }
              
          </View>
        ) 
        :null}
      </View>

      <View style={styles.containerGallery}>
        <FlatList 
          numColumns={3}
          horizontal={false}
          data={userPosts}
          refreshControl={
						<RefreshControl
						  refreshing={refreshing}
						  onRefresh={onRefresh}
						/>}
          renderItem={({item}) => (
            <TouchableOpacity 
              style={styles.containerImage} 
              onPress={() => props.navigation.navigate("DisplayPost", 
              {
                user: props.route.params.uid,
                item: item
              })} >
              <Image
                style={styles.image}
                source={{uri: item.downloadURL}}
              />
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};


const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  posts: store.userState.posts,
  following: store.userState.following
})

export default connect(mapStateToProps, null)(ProfilePage);
