import React, { useState } from 'react'
import { View, Text, TextInput, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import { icons } from '../../../../constants'
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase';
require('firebase/firestore');
import Feed from "./Feed";
import styles from "./FollowPageStyles"

const FollowPage = (props) => {

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

    return (
        <ScrollView style={styles.container}>
            <View style={styles.topPadding}/>
                {renderSearchBar()}
                <Feed/>
        </ScrollView>
    )
}

export default FollowPage;