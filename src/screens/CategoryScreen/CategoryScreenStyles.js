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
    mainList: {
        paddingTop: height * 0.005,
    },
    eateryImageBox: {
        flexDirection: 'row',
        marginHorizontal: width * 0.03,
        flex: 1,
        marginVertical: height * 0.01,
    },
    eateryImage: {
        width: 125,
        height: 125,
    },
    eateryItemText: {
        flex: 1,
        marginLeft: 20,
        justifyContent: 'space-evenly',
    },
    eateryItemName: {
        fontSize: 13,
        fontWeight: 'bold',
    },
    ratingAndPrice: {
        flexDirection: 'row',
    },
    ratingBox: {
        backgroundColor: 'white',
        alignItems: 'center',
        flexDirection: 'row',
        paddingRight: 7,
    },
    ratingStar: {
        height: 13,
        width: 13,
        marginRight: 5,
    },
    ratingNumber: {
        fontSize: 13,
    },
    numberOfRatings: {
        color: 'gray',
        fontSize: 13,
    },
    separator: {
        justifyContent: 'center', 
        alignItems: 'center',
    },
    priceRatingBox: {
        flexDirection: 'row',
        paddingLeft: 7,
    },
    categoryBox: {
        flexDirection: 'row',
    },
    categoryTitles: {
        flexDirection: 'row',
    },
    categoryTitlesText: {
        fontSize: 10,
    },
})

export default styles;