import React from "react";
import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  Button,
  RefreshControl,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { icons } from '../../../constants'
import Icon from 'react-native-vector-icons/Ionicons';
import { Rating } from 'react-native-elements';
import { useState, useEffect, useRef } from "react";
import firebase from 'firebase'
import styles from "./DisplayPostScreenStyles";
import EditPostScreen from "./EditPostScreen";
require('firebase/firestore')

const DisplayPost = (props) => {
    const user = props.route.params.user
    const item = props.route.params.item
    const [index, setIndex] = useState(0)
    const [userPosts, setUserPosts] = useState([]);
    const [eatery, setEatery] = useState("")

    const ref_input2 = useRef();

    useEffect(() => {
        firebase.firestore()
        .collection("posts")
        .doc(user)
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
            scrollToItem()
        })
        console.log("runrun")
    },[props.route.params.item, userPosts.length, index])

    const scrollToItem = () => {
        if (userPosts.length !== 0) {
            for (let i = 0; i < userPosts.length; i++) {
                if (item.id === userPosts[i].id) {
                    setIndex(i)
                }
            }
            ref_input2.current.scrollToIndex({animated: true, index: index});
        }
        
    }

    const deletePost = (item) => {
        firebase.firestore().collection("posts").doc(user)
        .collection("userPosts").doc(item.id)
        .delete().then(() => {
            console.log("userPosts document successfully deleted!");
            
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
        deletePost2(item)
    }

    const deletePost2 = (item) => {
        firebase.firestore().collection("eateries").doc(item.id)
        .collection("reviews").doc(user)
        .delete().then(() => {
            console.log("Document successfully deleted!");
            
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
        editRatings(item)
    }

    const editRatings = (item) => {
        let temp = []
        firebase.firestore().collection("eateries").doc(item.id)
        .get().then((snapshot) => {
            if (snapshot.exists) {
                setEatery(snapshot.data())
                temp = snapshot.data()
                editRatings2(item, temp)
            }
            else {
                console.log('does not exist')
            }
        })
        
    }

    const editRatings2 = (item, temp) => {
        const currentNumRatings = temp.numberOfRatings
        const currentRating = temp.currentRating
        const userRating = item.rating
        firebase.firestore().collection("eateries").doc(item.id)
        .update({
            numberOfRatings: currentNumRatings - 1,
            currentRating: ((currentRating * currentNumRatings) - userRating) / (currentNumRatings - 1)
        }).then(() => {
            console.log("Document successfully updated!");
            props.navigation.navigate("Profile", { uid: user })
        })
        .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });

    }

    const editPost = (item) => {
        props.navigation.navigate('EditPost', {info: item})
    }

    const renderOptions = () => {
        if (user === firebase.auth().currentUser.uid) {
            return (
                <View>
                    <Text
                    style={{marginBottom: 20}}
                    onPress={(() => 
                        deletePost(item)
                        )}>
                    Delete Post</Text>
                    
                    <Text
                        onPress={(() => {
                            editPost(item)
                        })}>
                        Edit Post
                    </Text>
                </View>
            )
        }
        
    }

    function renderHeader() {
        return (
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backBox}
                    onPress={() => props.navigation.navigate("Home")}
                >
                    <Icon name="arrow-back" size={30} />
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {renderHeader()}
            <FlatList
             onScrollToIndexFailed={info => {
                const wait = new Promise(resolve => setTimeout(resolve, 500));
                wait.then(() => {
                  ref_input2.current?.scrollToIndex({ index: info.index, animated: true });
                });
              }}
            ref = {ref_input2}
            horizontal={false}
            data={userPosts}
            renderItem={({item}) => (
                <View style={styles.containerGallery}>
                    <Text style={styles.info}>{item.username}</Text>
                    <Image
                    style={styles.image}
                    source={{uri: item.downloadURL}}
                    />
                    <Text>{item.caption}</Text> 
                    <Rating
                        size={15}
                        readonly = {true}
                        startingValue={item.rating}
                        tintColor='white'
                    />
                    <Text style={{fontSize:10}}>{item.creation.toDate().toString()}</Text>
                    {renderOptions()}
                </View>
                
                
            )}
            />
        </View>
    )
}

export default DisplayPost