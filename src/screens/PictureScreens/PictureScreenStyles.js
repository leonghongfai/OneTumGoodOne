import { Platform, StyleSheet, Text, View, StatusBar } from 'react-native';
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: 'white',
    },
    container1: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        flex: 1,
        backgroundColor: 'white',
    },
    container2: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        flex: 1,
        backgroundColor: 'white',
    },
    container3: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: 'white',
    },
    paddingTop: {
        height: height * 0.2,
    },
    cameraContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
    },
    noAccess: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    fixedRatio: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        flex: 1,
        aspectRatio: 1,
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
    buttons: {
        flex: 1,
        backgroundColor: 'white',
    },
    takePictureButton: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    otherButtons: {
        justifyContent: 'flex-end'
    },
    circleincircle: {
        height: 100,
        width: 100,
    },
    pickFromGalleryBox: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: height * 0.01,
    },
    pickFromGalleryButton: {
        width: 180,
        height: 30,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'gainsboro',
    },
    usePictureBox: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: height * 0.01,
    },
    usePictureButton: {
        width: 180,
        height: 30,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'gainsboro',
    },
    image: {
        height: width,
        width: width,
    },
    topBox1: {
        height: width + height * 0.1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    bottomBox1: {
        flex: 1,
        justifyContent: 'center'
    },
})

export default styles;