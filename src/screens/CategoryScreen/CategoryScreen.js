import React, { useEffect, useState } from "react";
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
import { icons, images } from '../../../constants'
import Icon from 'react-native-vector-icons/Ionicons';
import styles from "./CategoryScreenStyles";
import firebase from 'firebase'
require('firebase/firestore')
import { LogBox } from 'react-native';
import { Rating, AirbnbRating } from 'react-native-elements';


const CategoryScreen = (props) => {

    const category = props.route.params.category
    const categoryId = props.route.params.categoryId
    const eateryData = props.route.params.eateryData
    const [myList, setMyList] = useState([])
    const [isFiltered, setIsFiltered] = useState(false)

    let eateriesToShow = []
   
    for (let i = 0; i < eateryData.length; i++) {
        let arr = eateryData[i].categories
        if (arr.includes(categoryId)) {
            eateriesToShow.push(eateryData[i])
        }
    }

    function sortByRating() {
        eateriesToShow.sort(function (a, b) {
            return b.currentRating - a.currentRating
        })
        setMyList([...eateriesToShow])
        setIsFiltered(true)
    }

    function sortByPriceRange() {
        eateriesToShow.sort(function (a, b) {
            return b.priceRating - a.priceRating
        })
        setMyList([...eateriesToShow])
        setIsFiltered(true)
    }

    function sortByPopularity() {
        eateriesToShow.sort(function (a, b) {
            return a.numberOfRatings - b.numberOfRatings
        })
        setMyList([...eateriesToShow])
        setIsFiltered(true)
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

                <View style={styles.textAndFilter}>
                    <Text style={styles.categoryTitle}>{category}</Text>
                    <View style={styles.sortByBox}>
                        <Text style={styles.filterText}>Sort By:</Text>

                        <TouchableOpacity
                            style={styles.filterButton}
                            onPress={() => {
                                sortByRating()
                            }}
                        >
                            <Text>Ratings</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.filterButton}
                            onPress={() => {
                                sortByPriceRange()
                            }}                        
                        >
                            <Text>Price Range</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.filterButton}
                            onPress={() => {
                                sortByPopularity()
                            }}                        
                        >
                            <Text>Popularity</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }


    function renderEateries() {
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
            </View>
        )
       
        if (!isFiltered) {
            return (
                <View>
                    <FlatList
                        data={eateriesToShow}
                        keyExtractor={item => item.id.toString()}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={true}
                    />
                </View>
            )
        } else {
            return (
                <View>
                    <FlatList
                        data={myList}
                        keyExtractor={item => item.id.toString()}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={true}
                    />
                </View>
            )
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            <View style={styles.headerSeparator} />
            {renderEateries()}
        </SafeAreaView>
    );
}

export default CategoryScreen;