import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, FlatList, ScrollView, TouchableOpacity, LogBox, Image } from 'react-native'
import { icons } from '../../../../constants'
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase';
require('firebase/firestore');
import Feed from "./Feed";
import styles from "./FollowPageStyles"
import { connect } from 'react-redux'

const FollowPage = (props) => {
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

    function renderSearchBar() {
        return (
            <View style={styles.searchBarArea}>
                <TouchableOpacity
                    style={styles.searchBarBox}
                    onPress={() => props.navigation.navigate("FollowSearch")}
                >
                    <View style={styles.searchIconBox}>
                        <Icon
                            name="search"
                            size={15}
                            color='darkgray'
                        />
                    </View>
                    <Text style={styles.searchPlaceholder}>
                        Search users
                    </Text>
                </TouchableOpacity>
            </View >
        )
    }

    const renderFeed = () => {
        return (
            <View style={styles.mainContainer}>
                <FlatList
                    data={posts}
                    renderItem={({ item }) => (
                        <View style={styles.imageContainer}>
                            <Text style={styles.username}
                                onPress={() => props.navigation.navigate("Profile", {uid: item.user.uid})}
                            >{item.user.username}</Text>
    
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
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.topPadding}/>
                {renderSearchBar()}
                {renderFeed()}
        </ScrollView>
    )
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    following: store.userState.following,
    users: store.usersState.users,
    usersLoaded: store.usersState.usersLoaded,
})

export default connect(mapStateToProps, null)(FollowPage);
