import React, { useState } from 'react';
import { 
    View, 
    Text,
    TextInput, 
    Image,
    Button, 
} from 'react-native'
import firebase from 'firebase'
import styles from "../PageStyles"
import 'firebase/firestore'
import 'firebase/storage'
require("firebase/firestore")
require("firebase/firebase-storage")

export default function SaveImageScreen(props) {
    const [caption, setCpation] = useState("")
    const uploadImage = async () => {
        const uri = props.route.params.image
        const childPath = `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`
        console.log(childPath)
        const response = await fetch(uri)
        const blob = await response.blob()
        const task = firebase.storage().ref().child(childPath).put(blob)
        const taskProgress = snapshot => {
            console.log(`transferred: ${snapshot.bytesTransferred}`)
        }
        const taskCompleted = () => {
            task.snapshot.ref.getDownloadURL().then((snapshot) => {
                savePostData(snapshot)
                console.log(snapshot)
            })
        }
        const taskError = snapshot => {
            console.log(snapshot)
        }
        task.on("state_changed", taskProgress, taskError, taskCompleted)
    }
    const savePostData = (downloadURL) => {
        firebase.firestore()
        .collection('posts')
        .doc(firebase.auth().currentUser.uid)
        .collection("userPosts")
        .add({
            downloadURL,
            caption,
            creation: firebase.firestore.Timestamp()
        }).then((function () {
            //go back to home page, change when deciding where to put post
            props.navigation.navigate('Home', { screen: 'Profile' })
        }))
    }

    return(
        <View style={styles.container}>
            <Image source={{uri: props.route.params.image}} />
            <TextInput 
                placeholder="Write caption here!"
                onChangeText={(caption) => setCpation(caption)}
            />
            <Button title="Post" onPress={() => uploadImage()} />
        </View>
    )
}