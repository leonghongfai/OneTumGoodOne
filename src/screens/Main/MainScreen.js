import React, { useEffect } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity,SafeAreaView, ScrollView } from 'react-native';
import { CommonActions } from "@react-navigation/native"
import * as auth from "../../../api/Authentication"

const MainScreen = (props) => {
    useEffect(() => {
        auth.stateChange(
            () => props.navigation.navigate("Home"),
            () => props.navigation.navigate("Login")
        )
    })
    return (
        <View>
            <Text>Loading!</Text>
        </View>
    )
}

export default MainScreen;