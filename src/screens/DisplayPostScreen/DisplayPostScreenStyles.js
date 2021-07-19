import React from 'react';
import { Platform, StyleSheet, Text, View, StatusBar } from 'react-native';
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
import ColorScheme from '../../../global/ColorScheme';

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: 'white',
        flex: 1,
    },
    bottomPadding: {
        paddingBottom: height * 0.054,
    },
    image: {
        aspectRatio: 1/1,
    },
    containerGallery: {
        flex: 1,
    },
    info: {
        paddingTop: 20,
        paddingBottom: 10,
        fontWeight: 'bold',
    },
    header: {
        flexDirection: 'row',
        paddingBottom: 5,
    },
    backBox: {
        width: 50,
        paddingLeft: 20,
        justifyContent: 'center',
    },
})

export default styles;