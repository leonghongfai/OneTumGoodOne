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
import Styles from "../LoginScreen/Styles";
import firebase from 'firebase'
require('firebase/firestore')



const EateryScreen = (props) => {
    const [eatery, setEatery] = useState(null)
    const [info, setInfo] = useState([])

    
    useEffect(() => {
        updateEatery()
    },[props.route.params.eateryId])
    

    function updateEatery() {
        if (props.route.params.eateryId === eatery) {
            setEatery(eatery)
        } else {
            firebase.firestore()
            .collection("eateries")
            .doc(props.route.params.eateryId)
            .get()
            .then((snapshot) => {
                if (snapshot.exists) {
                    setInfo(snapshot.data())
                    setEatery(snapshot.id)
                }
                else {
                    console.log('does not exist')
                }
            })
        } 
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
                        <Text style={styles.eateryTitleText}>{info.name}</Text>
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
                                source={{uri:info.image}}
                                resizeMode="cover"
                                style={styles.eateryPicturesImage}
                            />
                        </View>

                    </View>
                
                    
                }
            </Animated.ScrollView>
        )
    }
    
    

    /*
    function renderMenu() {
        return (
            <View>
                <Text style={styles.menuTitle}>Menu</Text>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    {
                        eatery?.menu.map((item, index) => (
                            <View
                                key={`menu-${index}`}
                                style={styles.menuImageBox}
                            >
                                    <Image
                                        source={item.photo}
                                        resizeMode='cover'
                                        style={styles.menuImage}
                                    />
                                    <View style={styles.menuItemText}>
                                        <Text style={styles.menuItemName}>{item.name}</Text>
                                        <Text style={styles.menuItemPrice}>${item.price.toFixed(2)}</Text>
                                    </View>
                            </View>
                        ))
                    }
                </ScrollView>
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
            </ScrollView>
        </SafeAreaView>
    );
    */
   return (
    <SafeAreaView style={styles.container}>
        {console.log(info)}
        {renderHeader()}
        <ScrollView 
                style={styles.mainView}
                showsVerticalScrollIndicator={false}
            >
                {renderPictures()}
        </ScrollView>
    </SafeAreaView>
   )
}

export default EateryScreen;