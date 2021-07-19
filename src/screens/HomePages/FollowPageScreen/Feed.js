import React from "react";
import {
    Text,
    View,
    Image,
    FlatList,
    LogBox,
} from "react-native";
import { useState, useEffect } from "react";
require('firebase/firestore')
import { connect } from 'react-redux'
import styles from "./FollowPageStyles"

const Feed = (props) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        let posts = [];
        if (props.usersLoaded === props.following.length) {
            for (let i = 0; i < props.following.length; i++) {
                const user = props.users.find(el => el.uid === props.following[i]);
                if (user != undefined) {
                    posts = [...posts, ...user.posts]
                }
            }

            posts.sort(function (x, y) {
                return y.creation - x.creation;
            })

            setPosts(posts)
        }
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, [props.usersLoaded])

    return (
        <View style={styles.mainContainer}>
            <FlatList
                data={posts}
                renderItem={({ item }) => (
                    <View style={styles.imageContainer}>
                        <Text style={styles.username}>{item.user.username}</Text>

                        <Image
                            style={styles.image}
                            source={{ uri: item.downloadURL }}
                        />
                        <Text style={styles.caption}>{item.caption}</Text>
                    </View>
                )}
            />
        </View>
    );
};


const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    following: store.userState.following,
    users: store.usersState.users,
    usersLoaded: store.usersState.usersLoaded,
})

export default connect(mapStateToProps, null)(Feed);
