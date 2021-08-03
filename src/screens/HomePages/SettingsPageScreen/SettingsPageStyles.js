import React from 'react';
import { Platform, StyleSheet, Text, View, StatusBar } from 'react-native';
import ColorScheme from '../../../../global/ColorScheme';
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: 'white',
        paddingBottom: height * 0.03,
    },
    imageBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textBox: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    leaveIcon: {
        height: 250,
        width: 250,
    },
    leaveBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems : 'center',
    },
    leaveText: {
        fontSize: 22,
    },
    logOutBox: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logOutButton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        backgroundColor: 'hotpink',
        padding: 30,
    },
    logOutText: {
        fontSize: 22,
    },  
})

export default styles;