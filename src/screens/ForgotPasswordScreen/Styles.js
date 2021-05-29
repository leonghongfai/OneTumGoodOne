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
})

export default Styles