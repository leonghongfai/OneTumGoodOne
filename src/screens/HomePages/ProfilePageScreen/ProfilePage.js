import React from "react";
import {
    Text,
    View,
    Image,
    FlatList,
    RefreshControl,
    Button
} from "react-native";
import { useState, useEffect } from "react";
import firebase from "firebase";
require("firebase/firestore");
import { connect } from "react-redux";
import { TouchableOpacity } from "react-native";
import styles from "./ProfilePageStyles";

const ProfilePage = (props) => {
  const [userPosts, setUserPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [following, setFollowing] = useState(false)
  const [refreshing, setRefreshing] = React.useState(false);
  const [listFollowing, setListFollowing] = useState([])
  const [ uid, setUid ] = useState(null)
  const [ listFollower, setListFollower] = useState([])


    const wait = (timeout) => {
        return new Promise((resolve) => setTimeout(resolve, timeout));
    };

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
    setUid(props.route.params.uid)
    if (props.route.params.uid === firebase.auth().currentUser.uid) {
      setUser(currentUser)
      //console.log(currentUser)
      setUserPosts(posts)
    } else {
      firebase.firestore()
        .collection("users")
        .doc(props.route.params.uid)
        .get()
        .then((snapshot) => {
            if (snapshot.exists) {
                setUser(snapshot.data());
                //console.log(snapshot.data())
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
    getFollowing()
    getFollower()
  }, [props.route.params.uid, props.following, props.route.params.token, uid])

  const getFollower = () => {
    firebase.firestore().collection("users")
      .doc(props.route.params.uid).collection("follower")
      .get()
      .then((snapshot) => {
        let follower = snapshot.docs.map(doc => {
            const id = doc.id;
            return id
        })
        setListFollower(follower)
      })
  }
  const getFollowing = () => {
    firebase.firestore().collection("following").doc(props.route.params.uid)
    .collection("userFollowing").get()
    .then((snapshot) => {
      let following1 = snapshot.docs.map(doc => {
          const id = doc.id;
          return id
      })
      setListFollowing(following1)
    })
  }
  
  const onFollow = () => {
    firebase.firestore()
    .collection("following")
    .doc(firebase.auth().currentUser.uid)
    .collection("userFollowing")
    .doc(props.route.params.uid)
    .set({})

    firebase.firestore().collection("users").doc(props.route.params.uid)
    .collection("follower").doc(firebase.auth().currentUser.displayName)
    .set({
      username: firebase.auth().currentUser.displayName
    })
  }

  const onUnfollow = () => {
    firebase.firestore()
    .collection("following")
    .doc(firebase.auth().currentUser.uid)
    .collection("userFollowing")
    .doc(props.route.params.uid)
    .delete()

    firebase.firestore().collection("users").doc(props.route.params.uid)
    .collection("follower").doc(firebase.auth().currentUser.displayName)
    .delete()
  }

    if (user === null) {
        return <View />;
    }
  return (
    <View style={styles.container}>
      <View style={styles.containerInfo}>
        <View style={{flex : 1}}>
          <Text>{user.username}</Text>
        </View>
        <View style={styles.followerContiner}>
          <View style={{ flexDirection : "row", justifyContent: "space-around"}} >
            <View style={{alignItems: "center"}}>
              <Text>{userPosts.length}</Text>
              <Text style={{fontSize: 10, color: "grey"}}>Posts</Text>
            </View>
            <View style={{alignItems: "center"}}>
              <Text>{listFollowing.length}</Text>
              <Text style={{fontSize: 10, color: "grey"}}>Following</Text>
            </View>
            <View style={{alignItems: "center"}}>
              <Text>{listFollower.length}</Text>
              <Text style={{fontSize: 10, color: "grey"}}>Followers</Text>
            </View>
          </View>
          {props.route.params.uid !== firebase.auth().currentUser.uid
        ? (
          <View>
            {following? (
              <Button bordered dark
                style={{ justifyContent: "canter", height: 30}}
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
      </View>

            <View style={styles.containerGallery}>
                <FlatList
                    numColumns={3}
                    horizontal={false}
                    data={userPosts}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.containerImage}
                            onPress={() =>
                                props.navigation.navigate("DisplayPost", {
                                    user: props.route.params.uid,
                                    item: item,
                                })
                            }
                        >
                            <Image style={styles.image} source={{ uri: item.downloadURL }} />
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
    following: store.userState.following,
});

export default connect(mapStateToProps, null)(ProfilePage);