import React from "react";
import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  Button,
  RefreshControl,
  StatusBar
} from "react-native";
import { Rating } from 'react-native-elements';
import { useState, useEffect, useRef } from "react";
import firebase from 'firebase'
require('firebase/firestore')


const DisplayPost = (props) => {
    const user = props.route.params.user
    const item = props.route.params.item
    const [index, setIndex] = useState(0)
    const [userPosts, setUserPosts] = useState([]);
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
        })
        scrollToItem()
        console.log("run")
    },[props.route.params.item])

    const scrollToItem = () => {
        for (let i = 0; i < userPosts.length; i++) {
            if (item.downloadURL === userPosts[i].downloadURL) {
                setIndex(i)
            }
        }
        //ref_input2.current.scrollToIndex({animated: true, index: index});
    }

    return (
        <View style={styles.container}>
            {console.log(index)}
            <FlatList
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
                </View>
                
                
            )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: 'white',
        flex: 1,
    },
    image: {
        aspectRatio: 1/1,
    },
    containerGallery: {
        flex: 1,
    },
    info: {
        paddingTop: 20,
        paddingBottom: 10,
    }
})
export default DisplayPost