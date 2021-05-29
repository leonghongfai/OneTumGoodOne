import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import ColorScheme from '../../../global/ColorScheme'

const Styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        backgroundColor: ColorScheme.background,
        paddingTop: Platform.OS === 'android'? StatusBar.currentHeight: 0,
    },
    topContainer:{
        height: 130
    },
    title: {
        height: 40,
        fontSize: 25,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    logo: {
        //flex: 1,
        width: 90,
        height: 90,
        alignSelf: "center",
        margin: 30
    },
    userInput: {
        height: 60,
        width: 250,
        backgroundColor: 'white',
        marginTop: 5,
        marginLeft: 30,
        marginRight: 30,
        overflow: 'hidden',
        justifyContent: 'center',
    },
    logInButton: {
        marginTop: 10,
        height: 40,
        width: 250,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: ColorScheme.orange,
    },
    logInText: {
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
    noAccount: {
        flex: 1,
        alignItems: "center",
        marginTop: 10
    },
    noAccountWording: {
        fontSize: 16,
        color: '#2e2e2d'
    },
    registerWording: {
        fontSize: 16,
        color: ColorScheme.linkBlue,
        textDecorationLine: 'underline'
    }

})

export default Styles;