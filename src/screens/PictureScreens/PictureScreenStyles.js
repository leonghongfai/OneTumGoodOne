import React from 'react';
import { Platform, StyleSheet, Text, View, StatusBar } from 'react-native';
import ColorScheme from '../../../global/ColorScheme'
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    mainView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        flexDirection: 'row',
        paddingBottom: 5,
    },
    backBox: {
        width: 50,
        paddingLeft: 20,
    },
    eateryInfoBox: {
        flexDirection: 'row',
        borderColor: 'lightgray',
        borderWidth: 0.2,
    },
    eateryInfoImage: {
        width: 125,
        height: 125,
    },
    eateryInfoText: {
        flex: 1,
        alignItems: 'flex-start',
        marginLeft: 20,
        justifyContent: 'center'
    },
    ratingBox: {

    },
    reviewBox: {

    }
})

export default styles;