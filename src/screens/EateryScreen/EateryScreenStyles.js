import { Platform, StyleSheet, StatusBar } from 'react-native';
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: 'white',
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
        height: height * 0.06,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        backgroundColor: 'gainsboro',
        paddingHorizontal: 10,
    },
    eateryTitleText: {
        fontSize: 13,
        marginHorizontal: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    ratingBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingStar: {
        height: 10,
        width: 10,
        marginRight: 5,
    },
    ratingNumber: {
        fontSize: 10,
    },
    numRatingsText: {
        fontSize: 8,
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
        height: '100%',
    },
    menuTitleBox: {
        paddingTop: height * 0.01,
    },
    menuTitle: {
        fontSize: 17,
        marginHorizontal: width * 0.05,
        fontWeight: 'bold',
    },
    menuImageBox: {
        flexDirection: 'row',
        marginHorizontal: width * 0.03,
        paddingVertical: height * 0.01,
    },
    menuImage: {
        width: 100,
        height: 100,
    },
    menuItemText: {
        flex: 1,
        alignItems: 'flex-start',
        marginLeft: 20,
        justifyContent: 'center'
    },
    menuItemName: {
        fontSize: 13,
        paddingBottom: 5,
    },
    menuItemPrice: {
        fontSize: 13,
        fontWeight: 'bold',
        paddingBottom: 5,         
    },
    reviewsImageBox: {
        flexDirection: 'row',
        marginHorizontal: width * 0.03,
        alignItems: 'center',
        paddingVertical: height * 0.01,
    },
    reviewsImage: {
        width: 100,
        height: 100,
    },
    reviewsItemText: {
        paddingTop: width * 0.015,
        flex: 1,
        alignItems: 'flex-start',
        marginLeft: 20,
    },
    reviewsTopBox: {
        flex: 2,
        justifyContent: 'space-evenly',
    },
    reviewsBottomBox: {
        flex: 4,

    },
    reviewsUserName: {
        fontSize: 13,
        fontWeight: 'bold',
    },
    reviewsText: {
        fontSize: 11,
    },
    reviewsTitle: {
        fontSize: 17,
        marginHorizontal: width * 0.05,
        fontWeight: 'bold',
    },
    ratingsAndReviews: {
        paddingBottom: height * 0.03,
    }
})

export default styles;