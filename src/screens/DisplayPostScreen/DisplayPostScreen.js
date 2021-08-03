import React from "react";
import {
    Text,
    View,
    Image,
    FlatList,
    TouchableOpacity,
    LogBox,
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { useState, useEffect, useRef } from "react";
import Modal from 'react-native-modal';
import firebase from 'firebase'
import styles from "./DisplayPostScreenStyles";
require('firebase/firestore')

const DisplayPost = (props) => {
    const user = props.route.params.user;
    const item = props.route.params.item;
    const [index, setIndex] = useState(0);
    const [userPosts, setUserPosts] = useState([]);
    const [eatery, setEatery] = useState("");
    const [isModal0Visible, setModal0Visible] = useState(false);
    const [isModal1Visible, setModal1Visible] = useState(false);
    const [eateryToEdit, setEateryToEdit] = useState("");
    const [eateryToDelete, setEateryToDelete] = useState("");

    const ref_input2 = useRef();

    useEffect(() => {
        firebase.firestore()
            .collection("posts")
            .doc(user)
            .collection("userPosts")
            .orderBy("creation", "desc")
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
        LogBox.ignoreAllLogs()
    }, [props.route.params.item, userPosts.length, index])

    const scrollToItem = () => {
        if (userPosts.length !== 0) {
            for (let i = 0; i < userPosts.length; i++) {
                if (item.id === userPosts[i].id) {
                    setIndex(i)
                }
            }
            ref_input2.current.scrollToIndex({ animated: true, index: index });
        }

    }

    const deletePost = (item) => {
        for (let i = 0; i < userPosts.length; i++) {
            if (userPosts[i].eatery === item) {
                firebase.firestore()
                    .collection("posts")
                    .doc(user)
                    .collection("userPosts")
                    .doc(userPosts[i].id)
                    .delete()
                    .then(() => {
                        console.log("userPosts document successfully deleted!");

                    }).catch((error) => {
                        console.error("Error removing document: ", error);
                    });
                deletePost2(userPosts[i])
            }
        }
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
        if (currentNumRatings !== 1) {
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
        } else {
            firebase.firestore().collection("eateries").doc(item.id)
                .update({
                    numberOfRatings: 0,
                    currentRating: 0
                }).then(() => {
                    console.log("Document successfully updated to zero!");
                    props.navigation.navigate("Profile", { uid: user })
                })
                .catch((error) => {
                    // The document probably doesn't exist.
                    console.error("Error updating document: ", error);
                });
        }


    }

    const editPost = (item) => {
        for (let i = 0; i < userPosts.length; i++) {
            if (userPosts[i].eatery === item) {
                setModal0Visible(false)
                props.navigation.navigate('EditPost', { info: userPosts[i] })
            }
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

    function getDay(date) {
        const arr = date.split(" ")
        const day = arr[2] + " " + arr[1] + " " + arr[3]
        return day
    }

    function renderPosts() {
        if (user === firebase.auth().currentUser.uid) {
            return (
                <View>
                    <FlatList
                        onScrollToIndexFailed={info => {
                            const wait = new Promise(resolve => setTimeout(resolve, 500));
                            wait.then(() => {
                                ref_input2.current?.scrollToIndex({ index: info.index, animated: true });
                            });
                        }}
                        ref={ref_input2}
                        horizontal={false}
                        data={userPosts}
                        contentContainerStyle={styles.flatList}
                        renderItem={({ item }) => (
                            <View style={styles.mainContainer}>
                                <View style={styles.textAndOptions}>
                                    <View style={styles.nameAndEatery}>
                                        <Text style={styles.username}>{item.username}</Text>
                                        <Text
                                            style={styles.eateryName}
                                            onPress={() =>
                                                props.navigation.navigate("Eatery", {
                                                    eateryId: item.id,
                                                })
                                            }
                                        >
                                            @ {item.eatery}
                                        </Text>
                                    </View>
                                    <View style={styles.ellipsisBox}>
                                        <Icon
                                            name="ellipsis-vertical"
                                            size={15}
                                            color="black"
                                            onPress={() => {
                                                setModal0Visible(true)
                                                setEateryToEdit(item.eatery)
                                                setEateryToDelete(item.eatery)
                                            }}
                                        />
                                    </View>

                                    <Modal
                                        isVisible={isModal0Visible}
                                        backdropColor={'gray'}
                                        backdropOpacity={0.2}
                                        onBackdropPress={() => setModal0Visible(false)}
                                    >
                                        <View style={styles.modal0}>
                                            <View style={styles.modal0Box}>
                                                <View style={styles.editPostBox}>
                                                    <Text
                                                        style={styles.editPost}
                                                    >
                                                        Edit Post
                                                    </Text>
                                                </View>
                                                <View style={styles.editBox}>
                                                    <TouchableOpacity
                                                        style={styles.editBox1}
                                                        onPress={() => {
                                                            editPost(eateryToEdit)
                                                        }}
                                                    >
                                                        <Text style={styles.edit}>
                                                            Edit
                                                        </Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        style={styles.editBox1}
                                                        onPress={() => {
                                                            setModal0Visible(false)
                                                            setModal1Visible(true)
                                                        }}
                                                    >
                                                        <Text style={styles.deleteNot}>
                                                            Delete
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    </Modal>

                                    <Modal
                                        isVisible={isModal1Visible}
                                        backdropColor={'gray'}
                                        backdropOpacity={0.6}
                                        onBackdropPress={() => setModal1Visible(false)}
                                    >
                                        <View style={styles.modal1}>
                                            <View style={styles.modal1Box}>
                                                <View style={styles.confirmDeletionBox}>
                                                    <Text style={styles.confirmDeletion}>
                                                        Confirm deletion
                                                    </Text>
                                                    <Text style={styles.confirmDeletionText}>
                                                        Delete this post?
                                                    </Text>
                                                </View>
                                                <View style={styles.deleteBox}>
                                                    <TouchableOpacity
                                                        style={styles.deleteBox1}
                                                        onPress={() => {
                                                            deletePost(eateryToDelete)
                                                        }}
                                                    >
                                                        <Text style={styles.delete}>
                                                            Delete
                                                        </Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        style={styles.deleteBox1}
                                                        onPress={() => setModal1Visible(false)}
                                                    >
                                                        <Text style={styles.deleteNot}>
                                                            Don't Delete
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    </Modal>

                                </View>
                                <View>
                                    <Image
                                        style={styles.image}
                                        source={{ uri: item.downloadURL }}
                                        resizeMode='cover'
                                    />
                                </View>

                                <View style={styles.rating}>
                                    {
                                        [1, 2, 3, 4, 5].map((rating) => (
                                            <Icon
                                                name={rating <= item.rating ? 'star' : 'star-outline'}
                                                size={15}
                                                color={rating <= item.rating ? 'gold' : 'gold'}
                                            />
                                        ))
                                    }
                                </View>

                                <Text style={styles.caption}>{item.caption}</Text>
                                <Text style={styles.date}>{getDay(item.creation.toDate().toString())}</Text>
                            </View>
                        )}
                    />
                    <View style={styles.bottomPadding} />
                </View>
            )
        } else {
            return (
                <View>
                    <FlatList
                        onScrollToIndexFailed={info => {
                            const wait = new Promise(resolve => setTimeout(resolve, 500));
                            wait.then(() => {
                                ref_input2.current?.scrollToIndex({ index: info.index, animated: true });
                            });
                        }}
                        contentContainerStyle={styles.flatList2}
                        ref={ref_input2}
                        horizontal={false}
                        data={userPosts}
                        renderItem={({ item }) => (
                            <View style={styles.mainContainer}>
                                <Text style={styles.username}>{item.username}</Text>
                                <Text
                                    style={styles.eateryName}
                                    onPress={() =>
                                        props.navigation.navigate("Eatery", {
                                            eateryId: item.id,
                                        })
                                    }
                                >
                                    @ {item.eatery}
                                </Text>
                                <View>
                                    <Image
                                        style={styles.image}
                                        source={{ uri: item.downloadURL }}
                                        resizeMode='cover'
                                    />
                                </View>

                                <View style={styles.rating}>
                                    {
                                        [1, 2, 3, 4, 5].map((rating) => (
                                            <Icon
                                                name={rating <= item.rating ? 'star' : 'star-outline'}
                                                size={15}
                                                color={rating <= item.rating ? 'gold' : 'gold'}
                                            />
                                        ))
                                    }
                                </View>

                                <Text style={styles.caption}>{item.caption}</Text>
                                <Text style={styles.date}>{getDay(item.creation.toDate().toString())}</Text>
                            </View>
                        )}
                    />
                    <View style={styles.bottomPadding} />
                </View>
            )
        }
    }

    return (
        <View style={styles.container}>
            {renderHeader()}
            {renderPosts()}
        </View>
    )
}

export default DisplayPost