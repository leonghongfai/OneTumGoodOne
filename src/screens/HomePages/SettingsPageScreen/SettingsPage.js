import React from "react";
import { StatusBar } from 'expo-status-bar';
import {
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
    NavigationContainer,
} from "react-native";
import { icons } from '../../../../constants'
import Ionicons from "react-native-vector-icons/Ionicons";
import ColorScheme from "../../../../global/ColorScheme"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useState } from "react";
import { render } from "react-dom";
import * as Auth from '../../../../api/Authentication'
import styles from "./SettingsPageStyles"

const SettingsPage = (props) => {
    const handleLogOut = () => {
        Auth.signOut(
            () => props.navigation.navigate("Login"),
            (error) => alert(error.message)
        )
    }
    return (
        <View style={styles.container}>
            <View style={styles.imageBox}>
                <Image
                    source={icons.leave}
                    style={styles.leaveIcon}
                />
            </View>

            <View style={styles.textBox}>
                <View style={styles.leaveBox}>
                    <Text style={styles.leaveText}>Are you sure you want to leaf?</Text>
                </View>
                <View style={styles.logOutBox}>
                    <TouchableOpacity onPress={handleLogOut}>
                        <View style={styles.logOutButton}>
                            <Text style={styles.logOutText}>Log Out</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

        </View>

    );
};

export default SettingsPage;
