import React from 'react';
import { Platform, StyleSheet, Text, View, StatusBar } from 'react-native';
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
import ColorScheme from '../../../global/ColorScheme';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    backBox: {
        width: 50,
        paddingLeft: 20,
        justifyContent: 'center',
    },
    eateryTitleBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 50,
    },
    eateryTitle: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        backgroundColor: 'gainsboro',
        marginHorizontal: 20
    },
    eateryTitleText: {
        fontSize: 15,
        marginHorizontal: 20,
        fontWeight: 'bold'        
    },
    eateryPicturesBox: {
        alignItems: 'center'
    },
    eateryPicturesBox1: {
        height: height * 0.35,
    },
    eateryPicturesImage: {
        width: width,
        height: "100%",
    }
})

export default styles;