import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, ScrollView, TouchableOpacity, LogBox, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
require('firebase/firestore');
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
                return y.creation - x.creation
            })

            setPosts(posts)
        }
        LogBox.ignoreAllLogs()
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

    function getDay(date) {
        const arr = date.split(" ")
        const day = arr[2] + " " + arr[1] + " " + arr[3]
        return day
    }

    function renderFeed() {
        return (
            <View style={styles.mainContainer}>
                <FlatList
                    data={posts}
                    contentContainerStyle={styles.flatList}
                    renderItem={({ item }) => (
                        <View style={styles.imageContainer}>
                            <Text style={styles.username}
                                onPress={() => props.navigation.navigate("Profile", { uid: item.user.uid })}
                            >{item.user.username}</Text>
                            <View>
                                <Image
                                    style={styles.image}
                                    source={{ uri: item.downloadURL }}
                                    resizeMode='cover'
                                />
                                <TouchableOpacity
                                    style={styles.visitBox}
                                    onPress={() =>
                                        props.navigation.navigate("Eatery", {
                                            eateryId: item.id,
                                        })
                                    }
                                >
                                    <Icon
                                        name="location-outline"
                                        size={15}
                                        color='black'
                                    />
                                </TouchableOpacity>
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
            </View>
        );
    }

    return (
        <View>
            <View style={styles.containerTopPadding} />
            <ScrollView style={styles.container}>
                <View style={styles.topPadding} />
                {renderSearchBar()}
                {renderFeed()}
            </ScrollView>
        </View>
    )
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    following: store.userState.following,
    users: store.usersState.users,
    usersLoaded: store.usersState.usersLoaded,
})

export default connect(mapStateToProps, null)(FollowPage);
