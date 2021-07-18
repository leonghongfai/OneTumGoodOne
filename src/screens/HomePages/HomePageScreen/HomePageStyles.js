import { Platform, StyleSheet, StatusBar } from 'react-native';
import ColorScheme from '../../../../global/ColorScheme';
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: 'white',
    },
    homePageContainer: {
        justifyContent: 'center',
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: 'white',
    },
    searchMainContainer: {
        flex: 1,
    },
    searchBarArea: {
        justifyContent: 'center',
        paddingHorizontal: width * 0.05,
        alignItems: 'center',
        flex: 1,
    },
    searchBarArea2: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    searchBarArea3: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: height * 0.03,
    },
    backBox: {
        justifyContent: 'center',
        marginLeft: width * 0.05,
    },
    searchBarBox: {
        width: width * 0.9,
        height: height * 0.05,
        borderWidth: 0.5,
        borderColor: 'black',
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchBarBox2: {
        width: width * 0.7,
        height: height * 0.04,
        borderWidth: 0.5,
        borderColor: 'black',
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: width * 0.05,
    },
    searchIconBox: {
        paddingHorizontal: width * 0.03,
    },
    searchIconBox2: {
        paddingHorizontal: width * 0.03,
    },
    searchPlaceholder: {
        fontSize: 15,
        color: 'dimgray',
    },
    searchQueryText: {
        fontSize: 15,
        color: 'black',
        width: width * 0.7,
    },
    mainCategoriesText: {
        fontSize: 17,
        fontWeight: 'bold',
        paddingHorizontal: width * 0.03,
    },
    searchResultsBox: {
        height: height * 0.07,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 0.2,
    },
    searchResultsText: {
        marginLeft: width * 0.05,
    },
    iconRightPadding: {
        marginRight: width * 0.05,
    },
    homePageTopBar: {
        height: height * 0.07,
        backgroundColor: 'white',
        paddingTop: height * 0.01,
    },
    searchScreenTopBar: {
        backgroundColor: 'white',
        paddingTop: height * 0.01,
    },
    homePageSeparator: {
        height: height * 0.02,
    },
    homePageMiddlePadding: {    
        flex: 1,
        backgroundColor: 'white',
    },
    homePageBottomPadding: {
        flex: 1,
    },
    searchScreenBottomPadding:{
    },
    homePageMainContainer: {
        backgroundColor: 'white',
        paddingLeft: 20,
        paddingRight: 20,
    },
    homePageSmallContainer: {
        height: height * 0.33,
        justifyContent: 'center',
        paddingVertical: height * 0.03,
    },
    homePageCategoriesContainer: {

    },
    homePageCategoriesText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    homePageCategoriesList: {
        paddingVertical: 0,
    },
    searchScreenCategoriesList: {
        //height: height * 0.53,
    },
    homePageCategoriesBox: {
        padding: 5,
        paddingVertical: 10,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    homePageCategoriesInsideBox: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'aliceblue',
    },
    homePageCategoriesImage: {
        width: 30,
        height: 30,
    },
    homePageCategoriesItemText: {
        fontSize: 9,
        marginTop: height * 0.01,
        color: 'black',
    },
    homePageTitleText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left',
        marginBottom: 20,
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
    homePageRating: {
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
    homePageRatingStar: {
        height: 15,
        width: 15,
        marginRight: 5,
    },
    homePagePriceBox: {
        flexDirection: 'row',
    },
    homePagePrice: {
        
    },
})

export default styles;