import React, { useState } from 'react'
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native'
import firebase from 'firebase';
require('firebase/firestore');
import Feed from "./Feed";
import styles from "./FollowPageStyles"

export default function FollowPage(props) {
    const [users, setUsers] = useState([])

    const fetchUsers = (search) => {
        firebase.firestore()
            .collection('users')
            .where('username', '>=', search)
            .get()
            .then((snapshot) => {
                let users = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data }
                });
                setUsers(users);
            })
    }

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Search..."
                onChangeText={(search) => fetchUsers(search)}
            />

            <FlatList
                data={users}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate("Profile", {uid: item.id})}>
                        <Text>{item.username}</Text>
                    </TouchableOpacity>

                )}
            />
            <Feed />
        </View>
    )
}