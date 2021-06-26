import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    Button,
} from 'react-native'
import firebase from 'firebase'
import { Rating, AirbnbRating } from 'react-native-elements';
import styles from "./PictureScreenStyles"
import Icon from 'react-native-vector-icons/Ionicons';
import 'firebase/firestore'
import 'firebase/storage'
require("firebase/firestore")
require("firebase/firebase-storage")

export default function SaveImageScreen(props) {

    const currentEateryId = props.route.params.eateryId
    const [caption, setCaption] = useState("")
    const [eatery, setEatery] = useState("")
    const [rating, setRating] = useState("")

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
                creation: firebase.firestore.FieldValue.serverTimestamp()
            }).then((function () {
                props.navigation.navigate("Profile", { uid: firebase.auth().currentUser.uid });
            }))
    }

    useEffect(() => {
        firebase.firestore()
            .collection("eateries")
            .doc(currentEateryId)
            .get()
            .then((snapshot) => {
                if (snapshot.exists) {
                    setEatery(snapshot.data())
                }
                else {
                    console.log('does not exist')
                }
            })
    }, [props.route.params.eateryId])

    function renderHeader() {
        return (
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backBox}
                    onPress={() => props.navigation.navigate("Eatery")}
                >
                    <Icon name="arrow-back" size={30} />
                </TouchableOpacity>
            </View>
        )
    }
    function renderEateryInfo() {
        return (
            <View style={styles.eateryInfoBox}>
                <Image
                    source={{ uri: eatery.image }}
                    resizeMode='cover'
                    style={styles.eateryInfoImage}
                />
                <Text style={styles.eateryInfoText}>{eatery.name}</Text>
            </View>
        )
    }

    function renderReviewRatings() {
        return (
            <View>
                <AirbnbRating
                    reviews={['Orbital', 'Makes', 'Me', 'Very', 'Happy!']}
                    onFinishRating={rating => setRating(rating)}
                />
            </View>
        )
    }

    function renderReviewText() {
        return (
            <View>
                <Image source={{ uri: props.route.params.image }} />
                <TextInput
                    textAlign='center'
                    placeholder="Write review here!"
                    onChangeText={(caption) => setCaption(caption)}
                />
                <Button title="Post" onPress={() => uploadImage()} />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {renderHeader()}
            <View style={styles.mainView}>
                {renderEateryInfo()}
                {renderReviewRatings()}
                {renderReviewText()}
            </View>
        </View>
    )
}