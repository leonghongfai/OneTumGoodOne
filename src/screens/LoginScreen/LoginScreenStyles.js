import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

const LoginScreenStyles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#fdf8f5',
        paddingTop: Platform.OS === 'android'? StatusBar.currentHeight: 0,
    },
    topContainer:{
        height: 70
    },
    title: {
        height: 40,
        fontSize: 25,
        fontWeight: 'bold'
    },
    logo: {
        //flex: 1,
        width: 90,
        height: 90,
        alignSelf: "center",
        margin: 30
    },
    userInput: {
        height: 40,
        width: 250,
        borderRadius: 5,
        backgroundColor: 'white',
        marginTop: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16,
        overflow: 'hidden',
    },
    logInButton: {
        marginTop: 10,
        height: 40,
        width: 250,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f68817'
    },
    logInText: {
        fontWeight: 'bold',
        fontSize: 15,
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
        color: '#3366BB',
        textDecorationLine: 'underline'
    }

})

export default LoginScreenStyles;