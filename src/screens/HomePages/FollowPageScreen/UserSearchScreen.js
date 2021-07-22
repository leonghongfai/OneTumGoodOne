import React from "react";
import {
    Text,
    View,
    TouchableOpacity,
    FlatList,
    TextInput,
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from "firebase";
require('firebase/firestore')
import styles from "./FollowPageStyles";

const SearchScreen = (props) => {

    const [users, setUsers] = React.useState([]);
    const [searchQuery, setSearchQuery] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);
    const [isSearch, setIsSearch] = React.useState(false);

    React.useEffect(() => {
        firebase.firestore()
            .collection('users')
            .get()
            .then((snapshot) => {
                let users = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data }
                });
                setUsers(users);
            })
    }, [])

    users.sort((a, b) => {
        let length = a.username.length < b.username.length ? a.username.length : b.username.length
        let first = a.username.toLowerCase()
        let second = b.username.toLowerCase()

        for (let i = 0; i < length; i++) {
            if (first.charAt(i) < second.charAt(i)) {
                return -1
            } else if (first.charAt(i) > second.charAt(i)) {
                return 1
            }
        }
    })

        
    const popularUsers = [...users.slice(0, 10)]

    popularUsers.sort((a, b) => {
        return b.numFollower - a.numFollower
    })

    function renderScreen() {

        const onChangeSearch = (query) => {

            setSearchQuery(query)

            if (query) {

                setIsSearch(true)

                const newResults = users.filter(item => {
                    const itemData = item.username.toLowerCase()
                    const queryData = query.toLowerCase()
                    return itemData.includes(queryData)
                })

                setSearchResults(newResults)

            } else {

                setIsSearch(false)

            }
        }

        if (isSearch) {
            return (
                <View>
                    <View style={styles.searchBarArea2}>
                        <TouchableOpacity
                            style={styles.backBox}
                            onPress={() => props.navigation.navigate("Home")}
                        >
                            <Icon name="arrow-back" size={25} />
                        </TouchableOpacity>

                        <View style={styles.searchBarBox2}>
                            <TextInput
                                style={styles.searchQueryText}
                                placeholder="Search users"
                                onChangeText={text => onChangeSearch(text)}
                                value={searchQuery}
                            />
                        </View>
                    </View>

                    <FlatList
                        data={searchResults}
                        style={styles.userResults}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => {
                                    props.navigation.navigate("Profile", {
                                        uid: item.id,
                                    })
                                }}
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
        } else {
            const renderItem = ({ item }) => {
                return (
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate("Profile", {
                            uid: item.id,
                        })}
                    >
                        <View style={styles.searchResultsBox}>
                            <Text style={styles.searchResultsText}>
                                {item.username}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )
            }
            return (
                <View>
                    <View style={styles.searchBarArea2}>
                        <TouchableOpacity
                            style={styles.backBox}
                            onPress={() => props.navigation.navigate("Home")}
                        >
                            <Icon name="arrow-back" size={25} />
                        </TouchableOpacity>

                        <View style={styles.searchBarBox2}>
                            <TextInput
                                style={styles.searchQueryText}
                                placeholder="Search users"
                                onChangeText={text => onChangeSearch(text)}
                                value={searchQuery}
                            />
                        </View>
                    </View>

                    <Text style={styles.popularText}>Popular Users</Text>

                     <FlatList
                        data={popularUsers}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={item => `${item.id}`}
                        style={styles.recentList}
                        renderItem={renderItem}
                    />
                </View>
            )
        }
    }

    return (
        <View style={styles.container2}>
            <View style={styles.topPadding} />
            {renderScreen()}
            <View style={styles.searchScreenBottomPadding} />
        </View>
    );
};

export default SearchScreen;
