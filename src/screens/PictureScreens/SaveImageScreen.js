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
import Styles from '../LoginScreen/Styles';
require("firebase/firestore")
require("firebase/firebase-storage")

export default function SaveImageScreen(props) {

    const currentEateryId = props.route.params.eateryId
    const [caption, setCaption] = useState("")
    const [eatery, setEatery] = useState("")
    const [rating, setRating] = useState(3)

    

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
                savePostData2(snapshot)
                updateEateryRating()
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
                creation: firebase.firestore.FieldValue.serverTimestamp(),
                rating: rating,
                eatery: eatery.name
            }).then((function () {
                props.navigation.navigate("Profile", { uid: firebase.auth().currentUser.uid });
            }))
        
    }

    const savePostData2 = (downloadURL) => {
        firebase.firestore()
        .collection("eateries")
        .doc(currentEateryId)
        .collection("reviews")
        .doc(firebase.auth().currentUser.uid)
        .set({
            photo: downloadURL,
            comment: caption,
            creation: firebase.firestore.FieldValue.serverTimestamp(),
            rating: rating
        })
    }

    const updateEateryRating = () => {
        const currentNumber = eatery.numberOfRatings
        const ratingNow = eatery.currentRating
        firebase.firestore()
        .collection("eateries")
        .doc(currentEateryId)
        .update({
            numberOfRatings: currentNumber + 1,
            currentRating: ((currentNumber * ratingNow) + rating) / (currentNumber + 1)
        })
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

                <Text style={styles.currentlyReviewingText}>Write Review</Text>

                <TouchableOpacity
                    style={styles.postBox}
                    onPress={() => uploadImage()}
                >
                    <View style={styles.postOutline}>
                        <Text style={styles.postText}>POST</Text>
                    </View>
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
            <View style={styles.ratingBox}>
                <AirbnbRating
                    reviews={['Orbital', 'Makes', 'Me', 'Very', 'Happy!']}
                    onFinishRating={rating => setRating(rating)}
                    size={30}
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
                <View style={styles.halfBox}>
                    {renderEateryInfo()}
                    {renderReviewRatings()}
                </View>
                <View style={styles.halfBox1}>
                    {renderReviewText()}
                </View>
            </View>
        </View>
    )
}