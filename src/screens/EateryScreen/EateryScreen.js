import React, { useEffect } from "react";
import {
    Text,
    View,
    SafeAreaView,
    Image,
    TouchableOpacity,
    ScrollView,
    FlatList,
    Animated,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { icons } from '../../../constants'
import Icon from 'react-native-vector-icons/Ionicons';
import styles from "./EateryScreenStyles";
import firebase from 'firebase'
require('firebase/firestore')
import { LogBox } from 'react-native';
import { Rating, AirbnbRating } from 'react-native-elements';


const EateryScreen = (props) => {

    const currentEateryId = props.route.params.eateryId
    const [eatery, setEatery] = React.useState("")
    const [menu, setMenu] = React.useState([])
    const [reviews, setReviews] = React.useState([])

    useEffect(() => {
        firebase.firestore()
            .collection("eateries")
            .doc(currentEateryId)
            .get()
            .then((snapshot) => {
                if (snapshot.exists) {
                    setEatery(snapshot.data())
                }
                else {
                    console.log('does not exist')
                }
            })

        firebase.firestore()
            .collection("eateries/" + currentEateryId + "/menu")
            .get()
            .then((snapshot) => {
                let menuData = snapshot.docs.map(doc => {
                    const id = doc.id
                    const data = doc.data()
                    return { id, ...data }
                })
                setMenu(menuData)
            })

        firebase.firestore()
        .collection("eateries/" + currentEateryId + "/reviews")
        .get()
        .then((snapshot) => {
            let reviewsData = snapshot.docs.map(doc => {
                const id = doc.id
                const data = doc.data()
                return { id, ...data }
            })
            setReviews(reviewsData)
        })

        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, [props.route.params.eateryId])


    function renderHeader() {
        return (
            <View style={styles.header}>

                <TouchableOpacity
                    style={styles.backBox}
                    onPress={() => props.navigation.navigate("Home")}
                >
                    <Icon name="arrow-back" size={30} />
                </TouchableOpacity>

                <View style={styles.eateryTitleBox}>
                    <View style={styles.eateryTitle}>
                        <Text style={styles.eateryTitleText}>{eatery.name}</Text>
                        <View style={styles.ratingBox}>
                            <Image
                                source={icons.star}
                                style={styles.ratingStar}
                            />
                            <Text>{eatery.currentRating}</Text>
                        </View>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.commentBox}
                    onPress={() => props.navigation.navigate("Camera", {
                        eateryId: currentEateryId,
                    })}
                >
                    <Ionicons name="camera" size={30} />
                </TouchableOpacity>

            </View>
        )
    }

    function renderPictures() {
        return (
            <Animated.ScrollView
                horizontal={true}
                pagingEnabled={true}
                scrollEventThrottle={16}
                snapToAlignment="center"
                showsHorizontalScrollIndicator={false}
            >
                {
                    menu?.map((item, index) => (
                        <View
                            key={`menu-${index}`}
                            style={styles.eateryPicturesBox}
                        >
                            <View style={styles.eateryPicturesBox1}>
                                <Image
                                    source={{ uri: item.image }}
                                    resizeMode="cover"
                                    style={styles.eateryPicturesImage}
                                />
                            </View>
                        </View>
                    ))
                }
            </Animated.ScrollView>
        )
    }

    function renderMenu() {
        const renderItem = ({ item }) => (
            <View
                key={item.id}
                style={styles.menuImageBox}
            >
                <Image
                    source={{ uri: item.image }}
                    resizeMode='cover'
                    style={styles.menuImage}
                />
                <View style={styles.menuItemText}>
                    <Text style={styles.menuItemName}>{item.name}</Text>
                    <Text style={styles.menuItemPrice}>${item.price.toFixed(2)}</Text>
                </View>
            </View>
        )

        return (
            <View>
                <Text style={styles.menuTitle}>Menu</Text>
                <FlatList
                    data={menu}
                    keyExtractor={item => item.id.toString()}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        )
    }

    function renderReviews() {
        const renderItem = ({ item }) => (
            <View
                key={item.id}
                style={styles.menuImageBox}
            >
                <Image
                    source={{ uri: item.photo }}
                    resizeMode='cover'
                    style={styles.menuImage}
                />
                <View style={styles.menuItemText}>
                    <Text style={styles.menuItemName}>{item.comment}</Text>
                    <Rating 
                        imageSize={15}
                        startingValue={item.rating}
                        tintColor='white'
                        readonly={true}
                    />
                </View>
            </View>
        )

        return (
            <View>
                <Text style={styles.reviewsTitle}>Reviews</Text>
                <FlatList
                    data={reviews}
                    keyExtractor={item => item.id.toString()}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            <ScrollView
                style={styles.mainView}
                showsVerticalScrollIndicator={false}
            >
                {renderPictures()}
                {renderMenu()}
                {renderReviews()}
            </ScrollView>
        </SafeAreaView>
    );
}

export default EateryScreen;