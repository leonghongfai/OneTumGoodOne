import React from 'react';
import { Platform, StyleSheet, Text, View, StatusBar } from 'react-native';
import ColorScheme from '../../../../global/ColorScheme';
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: 'white',
    },
    topPadding: {
        height: height * 0.015,
    },
    searchBarArea: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    searchBarBox: {
        width: width,
        height: height * 0.05,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'ghostwhite',
    },
    searchIconBox: {
        paddingHorizontal: width * 0.03,
    },
    searchPlaceholder: {
        fontSize: 15,
        color: 'dimgray',
    },
    mainContainer: {
        paddingTop: height * 0.02,
        flex: 1,
    },
    imageContainer: {
        
    },
    username: {
        fontSize: 15,
        fontWeight: 'bold',
        paddingHorizontal: width * 0.03,
    },
    image: {
        aspectRatio: 1,
    },
    caption: {

    },
})

export default styles;