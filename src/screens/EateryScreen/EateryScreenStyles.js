import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import ColorScheme from '../../../global/ColorScheme'

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        backgroundColor: ColorScheme.background,
        paddingTop: Platform.OS === 'android'? StatusBar.currentHeight: 0,
    },
    header: {
        flexDirection: 'row',
    },
    backBox: {
        justifyContent: 'center',
        width: 50,
    }
})

export default styles