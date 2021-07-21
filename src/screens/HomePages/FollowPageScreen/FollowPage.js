import React, { useState } from 'react'
import {
    View,
    Text,
    Image,
    FlatList,
    ScrollView,
    TouchableOpacity,
    LogBox,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
require('firebase/firestore');
import { connect } from 'react-redux'
import styles from "./FollowPageStyles"

const FollowPage = (props) => {

    const [posts, setPosts] = useState([]);

    React.useEffect(() => {
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
        LogBox.ignoreAllLogs()
    }, [props.usersLoaded])

    function getDay(date) {
        const arr = date.split(" ")
        const day = arr[0] + " " + arr[1] + " " + arr[2] + " " + arr[3]
        return day
    }

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

    function renderFeed() {
        return (
            <View style={styles.mainContainer}>
                <FlatList
                    data={posts}
                    renderItem={({ item }) => (
                        <View style={styles.imageContainer}>
                            <Text style={styles.username}>{item.user.username}</Text>
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
                            <Text style={styles.caption}>{item.caption}</Text>
                            <Text style={styles.date}>{getDay(item.creation.toDate().toString())}</Text>
                        </View>
                    )}
                />
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.topPadding} />
            {console.log(posts)}
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