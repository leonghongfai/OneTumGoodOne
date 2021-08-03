import React from "react";
import {
    Text,
    View,
    TouchableOpacity,
    FlatList,
    TextInput,
} from "react-native";
import { useState, useEffect } from "react";
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from "firebase";
require('firebase/firestore')
import styles from "./DisplayStyles"

const DisplayFollowingScreen = (props) => {
    const [user, setUser] = useState(null)
    const [listFollowing, setListFollowing] = useState([])

    useEffect(() => {
        setUser(props.route.params.user)
        firebase.firestore()
            .collection("following")
            .doc(props.route.params.user)
            .collection("userFollowing").get()
            .then((snapshot) => {
                let following1 = snapshot.docs.map(doc => {
                    const id = doc.id;
                    const data = doc.data();
                    return { id, ...data }
                })
                setListFollowing(following1)
            })
    },[props.route.params.user])

    function renderScreen() {
            return (
                <View>
                    <View style={styles.searchBarArea2}>
                        <TouchableOpacity
                            style={styles.backBox}
                            onPress={() => props.navigation.navigate("Profile")}
                        >
                            <Icon name="arrow-back" size={25} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.popularText}>Followers</Text>

                    <FlatList
                        data={listFollowing}
                        style={styles.userResults}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                            onPress = {() => props.navigation.navigate("Profile", {
                                uid: item.uid,
                            })}
                            >
                                <View style={styles.searchResultsBox}>
                                    <Text style={styles.searchResultsText}>
                                        {item.username}
                                    </Text>
                                    <View style={styles.iconRightPadding}>
                                        <Icon name="navigate-outline" />
                                    </View>
                                </View>
                            </TouchableOpacity>

                        )}
                    />
                </View>

            )
        
    }


    return(
        <View style={styles.container2}>
        <View style={styles.topPadding} />
        {renderScreen()}
        <View style={styles.searchScreenBottomPadding} />
    </View>
    )
}

export default DisplayFollowingScreen;