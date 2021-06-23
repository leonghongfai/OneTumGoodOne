import React, { useEffect, useState } from "react";
import {
    Text,
    View,
    SafeAreaView,
    Image,
    TouchableOpacity,
    ScrollView,
    FlatList,
    KeyboardAvoidingView,
    Animated
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { icons, images } from '../../../constants'
import Icon from 'react-native-vector-icons/Ionicons';
import styles from "./EateryScreenStyles";
import firebase from 'firebase'
require('firebase/firestore')


const EateryScreen = (props) => {

    const [eatery, setEatery] = React.useState("")
    const [menu, setMenu] = React.useState([])


    useEffect(() => {
        updateEatery()
    }, [props.route.params.eateryId])

    function updateEatery() {
        firebase.firestore()
            .collection("eateries")
            .doc(props.route.params.eateryId)
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
            .collection("eateries/" + props.route.params.eateryId + "/menu")
            .get()
            .then((snapshot) => {
                let menuData = snapshot.docs.map(doc => {
                    const id = doc.id
                    const data = doc.data()
                    return { id, ...data }
                })
                setMenu(menuData)
            })
    }

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
                            <Text></Text>
                        </View>
                    </View>
                </View>

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
            //on scroll
            >
                {
                    <View
                        style={styles.eateryPicturesBox}
                    >
                        <View style={styles.eateryPicturesBox1}>
                            <Image
                                source={{ uri: eatery.image }}
                                resizeMode="cover"
                                style={styles.eateryPicturesImage}
                            />
                        </View>

                    </View>


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

    return (
        <SafeAreaView style={styles.container}>
            {console.log(eatery)}
            {console.log(menu)}
            {renderHeader()}
            <ScrollView
                style={styles.mainView}
                showsVerticalScrollIndicator={false}
            >
                {renderPictures()}
                {renderMenu()}
            </ScrollView>
        </SafeAreaView>
    );
}

export default EateryScreen;