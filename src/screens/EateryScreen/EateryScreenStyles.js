import React from 'react';
import { Platform, StyleSheet, Text, View, StatusBar } from 'react-native';
import ColorScheme from '../../../global/ColorScheme'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    backBox: {
        width: 50,
        paddingLeft: 20,
        justifyContent: 'center',
    },
    restaurantTitleBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 50,
    },
    restaurantTitle: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        backgroundColor: 'gainsboro',
        marginHorizontal: 20
    },
    restaurantTitleText: {
        marginHorizontal: 20,
        fontWeight: 'bold'        
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
        ...ColorScheme.shadow,
    },
    ratingStar: {
        height: 15,
        width: 15,
        marginRight: 5,
    },
})

export default styles;