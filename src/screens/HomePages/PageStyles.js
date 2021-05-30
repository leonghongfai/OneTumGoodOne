import React from 'react';
import { Platform, StyleSheet, Text, View, StatusBar } from 'react-native';
import ColorScheme from '../../../global/ColorScheme'

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    searchBarArea: {
        flex: 5, 
        justifyContent: 'center',
        backgroundColor: 'black',
    },
    homePageTopPadding: {
        flex: 1,
        backgroundColor: 'white',
    },
    homePageMiddlePadding: {    
        flex: 1,
        backgroundColor: 'white',
    },
    homePageBottomPadding: {
        flex: 1,
        backgroundColor: 'white',
    },
    homePageMainContainer: {
        flex: 50,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20,
    },
    homePageSmallContainer: {
        height: 228,
    },
    homePageTitleText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    homePageImageBlock: {
        width: 150,
        marginRight: 5,
    },
    homePageImage: {
        height: 150,
        width: 150,
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

export default styles;