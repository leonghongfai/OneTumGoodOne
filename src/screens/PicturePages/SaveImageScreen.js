import React, { useState } from 'react';
import { 
    View, 
    Text,
    TextInput, 
    Image,
    Button, 
} from 'react-native'
import firebase from 'firebase'
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
                console.log(snapshot)
            })
        }
        const taskError = shapshot => {
            console.log(snapshot)
        }
        task.on("state_changed", taskProgress, taskError, taskCompleted)
    }

    return(
        <View style={{flex: 1}}>
            <Image source={{uri: props.route.params.image}} />
            <TextInput 
                placeholder="Write caption here!"
                onChangeText={(caption) => setCpation(caption)}
            />
            <Button title="Post" onPress={() => uploadImage()} />
        </View>
    )
}