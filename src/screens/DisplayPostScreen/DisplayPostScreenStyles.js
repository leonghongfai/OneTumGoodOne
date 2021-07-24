import React from 'react';
import { Platform, StyleSheet, Text, View, StatusBar } from 'react-native';
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
import ColorScheme from '../../../global/ColorScheme';

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: 'white',
    },
    bottomPadding: {
        paddingBottom: height * 0.054,
    },
    flatList: {
        paddingBottom: height * 0.2,
    },
    flatList2: {
        paddingBottom: height * 0.2,
    },
    mainContainer: {
        paddingBottom: height * 0.01,
        paddingTop: height * 0.01,
        backgroundColor: 'white',
    },
    textAndOptions: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    nameAndEatery: {
    },
    username: {
        fontSize: 15,
        fontWeight: 'bold',
        paddingHorizontal: width * 0.03,
    },
    eateryName: {
        fontSize: 12,
        paddingHorizontal: width * 0.03,
        paddingBottom: height * 0.01,
    },
    ellipsisBox: {
        paddingHorizontal: width * 0.03,
    },
    modal0: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal0Box: {
        backgroundColor: 'white',
        height: height * 0.25,
        width: width * 0.62,
    },
    editPostBox: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 5.5,
        borderBottomColor: 'black',
        borderBottomWidth: 0.2,
    },
    editPost: {
        fontWeight: 'bold',
        fontSize: 17,
        paddingBottom: height * 0.02,
    },
    editBox: {
        flex: 4.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    editBox1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: 'black',
        borderBottomWidth: 0.2,
        width: width * 0.62,
    },
    edit: {
        fontSize: 15,
        color: 'black',
    },
    editNot: {
        fontSize: 15,
    },
    modal1: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal1Box: {
        backgroundColor: 'white',
        height: height * 0.25,
        width: width * 0.62,
    },
    confirmDeletionBox: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 5.5,
        borderBottomColor: 'black',
        borderBottomWidth: 0.2,
    },
    confirmDeletion: {
        fontWeight: 'bold',
        fontSize: 17,
        paddingBottom: height * 0.02,
    },
    confirmDeletionText: {
        fontSize: 15,
        textAlign: 'center',
    },
    deleteBox: {
        flex: 4.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteBox1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: 'black',
        borderBottomWidth: 0.2,
        width: width * 0.62,
    },
    delete: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'red',
    },
    deleteNot: {
        fontSize: 15,
    },
    image: {
        width: width,
        height: width,
    },
    visitBox: {
        position: 'absolute',
        top: height * 0.01,
        right: height * 0.01,
        height: 30,
        width: 30,
        backgroundColor: 'white',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    rating: {
        flexDirection: 'row',
        paddingHorizontal: width * 0.03,
    },
    caption: {
        paddingHorizontal: width * 0.03,
    },
    date: {
        paddingHorizontal: width * 0.03,
        fontSize: 13,
        color: 'darkgray',
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