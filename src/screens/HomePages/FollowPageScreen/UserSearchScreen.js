import React from "react";
import {
    Text,
    View,
    TouchableOpacity,
    FlatList,
    TextInput,
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
require('firebase/firestore')
import styles from "./FollowPageStyles";

const SearchScreen = (props) => {

    const [users, setUsers] = useState([])
    const [searchQuery, setSearchQuery] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);

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

    function renderScreen() {
        const onChangeSearch = (query) => {

            setSearchQuery(query)

            const newResults = users.filter(item => {
                const itemData = item.username.toLowerCase()
                const queryData = query.toLowerCase()
                return itemData.includes(queryData)
            })

            newResults.sort((a, b) => {
                let length = a.username.length < b.username.length ? a.username.length : b.username.length

                for (let i = 0; i < length; i++) {
                    if (a.username.charAt(i) < b.username.charAt(i)) {
                        return -1
                    } else if (a.username.charAt(i) > b.username.charAt(i)) {
                        return 1
                    }
                }
            })

            setSearchResults(newResults)
        }

        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.searchQueryText}
                    placeholder="Search users"
                    onChangeText={text => onChangeSearch(text)}
                    value={searchQuery}
                />

                <FlatList
                    data={searchResults}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => props.navigation.navigate("Profile", { uid: item.id })}>
                            <Text>{item.username}</Text>
                        </TouchableOpacity>

                    )}
                />
            </View>

        )
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.searchScreenTopBar} />
                {renderScreen()}
            <View style={styles.searchScreenBottomPadding} />
        </View>
    );
};

export default SearchScreen;
