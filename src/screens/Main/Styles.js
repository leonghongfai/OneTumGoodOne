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
        height: 200
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
    logInButton: {
        marginTop: 10,
        height: 40,
        width: 250,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: ColorScheme.orange,
    },
    logInText: {
        fontWeight: 'bold',
        fontSize: 15,
    },

})

export default Styles;