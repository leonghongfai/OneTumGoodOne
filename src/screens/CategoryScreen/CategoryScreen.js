import React, { useState } from "react";
import {
    Text,
    View,
    SafeAreaView,
    Image,
    TouchableOpacity,
    FlatList,
} from "react-native";
import { icons } from '../../../constants'
import Icon from 'react-native-vector-icons/Ionicons';
import styles from "./CategoryScreenStyles";
require('firebase/firestore')

const CategoryScreen = (props) => {

    const category = props.route.params.category
    const categoryId = props.route.params.categoryId
    const eateryData = props.route.params.eateryData
    const [myList, setMyList] = useState([])
    const [isFiltered, setIsFiltered] = useState(false)

    const categoryData = [
        {
            id: 1,
            name: "Asian",
        },
        {
            id: 2,
            name: "Bakery and Cake",
        },
        {
            id: 3,
            name: "Bento",
        },
        {
            id: 4,
            name: "Beverages",
        },
        {
            id: 5,
            name: "Breakfast/Brunch",
        },
        {
            id: 6,
            name: "Bubble Tea",
        },
        {
            id: 7,
            name: "Chicken",
        },
        {
            id: 8,
            name: "Chinese",
        },
        {
            id: 9,
            name: "Coffee/Tea",
        },
        {
            id: 10,
            name: "Dessert",
        },
        {
            id: 11,
            name: "Dim Sum",
        },
        {
            id: 12,
            name: "Fast Food",
        },
        {
            id: 13,
            name: "Halal",
        },
        {
            id: 14,
            name: "Ice Cream",
        },
        {
            id: 15,
            name: "Indian",
        },
        {
            id: 16,
            name: "Italian",
        },
        {
            id: 17,
            name: "Japanese",
        },
        {
            id: 18,
            name: "Korean",
        },
        {
            id: 19,
            name: "Mala",
        },
        {
            id: 20,
            name: "Mexican",
        },
        {
            id: 21,
            name: "Nasi Lemak",
        },
        {
            id: 22,
            name: "Noodles",
        },
        {
            id: 23,
            name: "Pasta",
        },
        {
            id: 24,
            name: "Peranakan",
        },
        {
            id: 25,
            name: "Pizza",
        },
        {
            id: 26,
            name: "Ramen",
        },
        {
            id: 27,
            name: "Salad",
        },
        {
            id: 28,
            name: "Seafood",
        },
        {
            id: 29,
            name: "Snacks",
        },
        {
            id: 30,
            name: "Soups",
        },
        {
            id: 31,
            name: "Sushi",
        },
        {
            id: 32,
            name: "Thai",
        },
        {
            id: 33,
            name: "Vegan",
        },
        {
            id: 34,
            name: "Vegetarian",
        },
        {
            id: 35,
            name: "Vietnamese",
        },
        {
            id: 36,
            name: "Western",
        },
    ]

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
            return a.priceRating - b.priceRating
        })
        setMyList([...eateriesToShow])
        setIsFiltered(true)
    }

    function sortByPopularity() {
        eateriesToShow.sort(function (a, b) {
            return b.numberOfRatings - a.numberOfRatings
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
            <TouchableOpacity
                key={item.id}
                style={styles.eateryImageBox}
				onPress={() =>
                    props.navigation.navigate("Eatery", {
						eateryId: item.id,
					})

				}            
            >
                <Image
                    source={{ uri: item.image }}
                    resizeMode='cover'
                    style={styles.eateryImage}
                />
                <View style={styles.eateryItemText}>
                    <Text style={styles.eateryItemName}>{item.name}</Text>

                    <View style={styles.ratingAndPrice}>
                        <View style={styles.ratingBox}>
                            <Image
                                source={icons.star}
                                style={styles.ratingStar}
                            />
                            <Text style={styles.ratingNumber}>{item.currentRating.toFixed(1)}</Text>
                            <Text style={styles.numberOfRatings}> ({item.numberOfRatings})</Text>
                        </View>

                        <View style={styles.separator}>
                            <Icon name="ellipse" size={3} />
                        </View>

                        <View style={styles.priceRatingBox}>
                            {
                                [1, 2, 3].map((priceRating) => (
                                    <Text
                                        key={priceRating}
                                        style={{
                                            fontSize: 13,
                                            color: (priceRating <= item.priceRating) ?
                                                'black' : 'white'
                                        }}
                                    >$</Text>
                                ))
                            }
                        </View>
                    </View>

                    <View style={styles.categoryBox}>
                        <View style={styles.separator}>
                            <Icon name="ellipse" size={3} />
                        </View>
                        {
                            item.categories.map((categoryId) => {
                                return (
                                    <View
                                        style={styles.categoryTitles}
                                        key={categoryId}
                                    >
                                        <Text style={styles.categoryTitlesText}> {categoryData[categoryId - 1].name} </Text>
                                        <View style={styles.separator}>
                                            <Icon name="ellipse" size={3} />
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </View>
                </View>
            </TouchableOpacity>
        )

        if (!isFiltered) {
            return (
                <View>
                    <FlatList
                        data={eateriesToShow}
                        keyExtractor={item => item.id.toString()}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={true}
                        style={styles.mainList}
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
                        style={styles.mainList}
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