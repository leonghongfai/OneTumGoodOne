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
                            onPress={() => console.log("Filter pressed!")}
                        >

                            <Icon name="filter" size={15} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    function renderEateries() {
        let eateriesToShow = []

        for (let i = 0; i < eateryData.length; i++) {
            let arr = eateryData[i].categories
            if (arr.includes(categoryId)) {
                eateriesToShow.push(eateryData[i])
            }
        }

        eateriesToShow.sort(function (a, b) {
            return b.currentRating - a.currentRating
        })

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