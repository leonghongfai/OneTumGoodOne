import React from 'react';
import { Platform, StyleSheet, Text, View, StatusBar } from 'react-native';
import ColorScheme from '../../../global/ColorScheme'
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        flex: 1,
    },
    mainView: {
        alignItems: 'center',
        flex: 1,
    },
    halfBox: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    halfBox1: {
        flex: 1,
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        paddingBottom: 5,
        alignItems: 'center',
    },
    backBox: {
        width: 50,
        paddingLeft: 20,
        justifyContent: 'center',
    },
    currentlyReviewingText: {
        fontSize: 17,
        paddingLeft: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    postBox: {
        width: 80,
        justifyContent: 'center',
    },
    postOutline: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: 'lavender',
        marginRight: 10,
    },
    postText: {
        fontSize: 17,
        color: 'black',
    },
    eateryInfoBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    eateryInfoImage: {
        width: 100,
        height: 100,
    },
    eateryInfoText: {
        flex: 1,
        alignItems: 'flex-start',
        marginLeft: 20,
        fontSize: 15,
        fontWeight: 'bold',
    },
    ratingBox: {

    },
    reviewBox: {

    }
})

export default styles;