import { Platform, StyleSheet, Text, View, StatusBar } from 'react-native';
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        flex: 1,
    },
    mainView: {
        alignItems: 'center',
        flex: 1,
    },
    topBox: {
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingBottom: height * 0.05,
    },
    bottomBox: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        flexDirection: 'row',
        paddingBottom: 5,
        alignItems: 'center',
    },
    backBox: {
        width: 50,
        paddingLeft: 20,
        justifyContent: 'center',
    },
    writeReviewText: {
        fontSize: 17,
        paddingLeft: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    postBox: {
        width: 80,
        justifyContent: 'center',
    },
    postOutline: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: 'lavender',
        marginRight: 10,
    },
    postText: {
        fontSize: 17,
        color: 'black',
    },
    eateryInfoBox: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: width * 0.05,
        paddingVertical: height * 0.05,
    },
    eateryInfoImage: {
        width: 100,
        height: 100,
    },
    eateryInfoText: {
        flex: 1,
        alignItems: 'flex-start',
        marginLeft: 20,
        fontSize: 15,
        fontWeight: 'bold',
    },
    ratingBox: {
        justifyContent: 'center',
        width: width,
        paddingHorizontal: 15,
        paddingBottom: height * 0.05,
    },
    reviewBox: {
        marginHorizontal: 15,   
        borderWidth: 0.5,
        width: width * 0.9,
        marginBottom: 15,
        height: height * 0.07,
    },
    textInput: {
        fontSize: 15,
    },
})

export default styles;