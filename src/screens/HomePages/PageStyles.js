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
    homePageLocationBar: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
        borderRadius: 30,
    },
    rating: {
        position: 'absolute', 
        bottom: 0,
        height: 30,
        width: 70,
        backgroundColor: 'white',
        borderTopRightRadius: 30,
        borderBottomLeftRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    ratingStar: {
        height: 15,
        width: 15,
        marginRight: 5,
    },
})

export default styles;