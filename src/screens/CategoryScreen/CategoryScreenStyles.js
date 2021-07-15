import React from 'react';
import { Platform, StyleSheet, Text, View, StatusBar } from 'react-native';
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
import ColorScheme from '../../../global/ColorScheme';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: 'white',
    },
    mainView: {
        flex: 1,
    },
    headerSeparator: {
        height: height * 0.001,
        backgroundColor: 'black',        
    },
    header: {
        flexDirection: 'column',
        paddingBottom: 5,
        paddingHorizontal: 20,
    },
    backBox: {
        width: 50,
        justifyContent: 'center',
    },
    textAndFilter: {
        flexDirection: 'column'
    },
    categoryTitle: {
        fontWeight: 'bold',
        fontSize: 23,
        marginRight: width * 0.05,
        paddingTop: 5,
        marginBottom: 10,
    },
    sortByBox: {
        flexDirection: 'row',
        height: height * 0.04,
        alignItems: 'center',
    },
    filterButton: {
        justifyContent: 'space-around',
        borderWidth: 1,
        alignItems: 'center',
        borderRadius: 20,
        flexDirection: 'row',
        paddingHorizontal: 10,
        borderColor: 'gray',
        height: height * 0.04,
        marginRight: 10,
    },
    filterText: {
        marginRight: 5,
    },
    menuImageBox: {
        flexDirection: 'row',
        borderColor: 'lightgray',
        borderWidth: 0.2,
        marginHorizontal: width * 0.03,
        flex: 1,
    },
    menuImage: {
        width: 125,
        height: 125,
    },
})

export default styles;