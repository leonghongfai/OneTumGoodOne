import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
} from 'react-native'
import firebase from 'firebase'
import { AirbnbRating } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from "./EditPostScreenStyles"
import 'firebase/firestore'
import 'firebase/storage'
require("firebase/firestore")
require("firebase/firebase-storage")

export default function EditPostScreen(props)  {
    const info = props.route.params.info
    const [eatery, setEatery] = useState("")
    const [rating, setRating] = useState(3)
    const [caption, setCaption] = useState("")
    const [oldRating, setOldRating] = useState(0)

    useEffect(() => {
        console.log("runrunrun")
        firebase.firestore()
            .collection("eateries")
            .doc(info.id)
            .get()
            .then((snapshot) => {
                if (snapshot.exists) {
                    setEatery(snapshot.data())
                }
                else {
                    console.log('does not exist')
                }
            })
        firebase.firestore().collection("posts").doc(firebase.auth().currentUser.uid)
        .collection("userPosts").doc(info.id)
        .get()
        .then((snapshot) => {
            if (snapshot.exists) {
                setOldRating(snapshot.data().rating)
            }
            else {
                console.log('does not exist')
            }
        })
    }, [props.route.params.info])

    function renderHeader() {
        //console.log(info)
        return (
            <View 
            style={styles.header}
            >
                <TouchableOpacity
                    style={styles.backBox}
                    onPress={() => props.navigation.navigate("DisplayPost", {token: 1})}
                >
                    <Icon name="arrow-back" size={30} />
                </TouchableOpacity>
                <Text style={styles.writeReviewText}>Edit Review</Text>
                <TouchableOpacity
                    style={styles.postBox}
                    onPress={() => editRatings(info)}
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
            <View 
            style={styles.eateryInfoBox}
            >
                <Image
                    source={{ uri: eatery.image }}
                    resizeMode='cover'
                    style={styles.eateryInfoImage}
                />
                <Text 
                style={styles.eateryInfoText}
                >
                    {eatery.name}
                </Text>
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
            <View style={styles.reviewBox}>
                <Image source={{ uri: props.route.params.image }} />
                <TextInput
                    textAlign='center'
                    placeholder= "Enter new review here!"
                    onChangeText={(caption) => setCaption(caption)}
                    multiline={true}
                    style={styles.textInput}
                />
            </View>
        )
    }

    const editRatings = (info) => {
        firebase.firestore().collection("posts").doc(firebase.auth().currentUser.uid)
        .collection("userPosts").doc(info.id)
        .update({
            caption: caption,
            rating: rating,
            creation: firebase.firestore.FieldValue.serverTimestamp(),
        }).then(() => {
            console.log("User doc successfully updated!");
        })
        .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
        editRatings2(info)
    }

    const editRatings2 = (info) => {
        const currentNumRatings = eatery.numberOfRatings
        const currentRating = eatery.currentRating
        const userRating = oldRating
        console.log(userRating)
        firebase.firestore().collection("eateries").doc(info.id)
        .update({
            caption: caption,
            latestReview: firebase.firestore.FieldValue.serverTimestamp(),
            currentRating: ((currentRating * currentNumRatings) - userRating + rating) / (currentNumRatings)
        }).then(() => {
            console.log("Eatery doc successfully updated!");
        })
        .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
        editRatings3(info)
    }

    const editRatings3 = (info) => {
        firebase.firestore().collection("eateries").doc(info.id)
        .collection("reviews").doc(firebase.auth().currentUser.uid)
        .update({
            comment: caption,
            rating: rating,
            creation: firebase.firestore.FieldValue.serverTimestamp(),
        }).then(() => {
            console.log("eatery review doc successfully updated!");
        })
        .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
        props.navigation.navigate("Profile", { uid: firebase.auth().currentUser.uid })
    }

    return (
        <View style={styles.container}>
            {renderHeader()}
            <View style={styles.mainView}>
                <View style={styles.topBox}>
                    {renderEateryInfo()}
                    {renderReviewRatings()}
                </View>
                <View style={styles.bottomBox}>
                    {renderReviewText()}
                </View>
            </View>
        </View>
    )
}