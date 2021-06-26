import React from 'react';
import { Platform, StyleSheet, Text, View, StatusBar } from 'react-native';
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
import ColorScheme from '../../../global/ColorScheme';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: 'white'
    },
    mainView: {
        flex: 1
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
    eateryTitleBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
        fontWeight: 'bold',    
    },
    ratingBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingStar: {
        height: 15,
        width: 15,
        marginRight: 5,
    },
    numRatingsText: {
        fontSize: 10,
        marginLeft: 5,
        fontStyle: 'italic',
    },
    commentBox: {
        width: 50,
        paddingRight: 20,
        justifyContent: 'center',
    },
    eateryPicturesBox: {
        alignItems: 'center',
    },
    eateryPicturesBox1: {
        height: height * 0.35,
    },
    eateryPicturesImage: {
        width: width,
        height: "100%",
    },
    menuTitle: {
        fontSize: 25,
        marginHorizontal: 20,
        fontWeight: 'bold' 
    },
    menuImageBox: {
        flexDirection: 'row',
        borderColor: 'lightgray',
        borderWidth: 0.2,
    },
    menuImage: {
        width: 125,
        height: 125,
    },
    menuItemText: {
        flex: 1,
        alignItems: 'flex-start',
        marginLeft: 20,
        justifyContent: 'center'
    },
    menuItemName: {
        fontSize: 15,
        paddingBottom: 5,
    },
    menuItemPrice: {
        fontSize: 15,
        fontWeight: 'bold',
        paddingBottom: 5,         
    },
    reviewsTitle: {
        fontSize: 25,
        marginHorizontal: 20,
        fontWeight: 'bold' 
    },
    reviewsRating: {
        backgroundColor: 'red'
    }
})

export default styles;