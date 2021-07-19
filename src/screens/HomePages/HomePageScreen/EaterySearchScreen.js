import React from "react";
import {
    Text,
    View,
    TouchableOpacity,
    FlatList,
    TextInput,
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
require('firebase/firestore')
import styles from "./HomePageStyles";

const SearchScreen = (props) => {

    const eateryData = props.route.params.eateryData
    const [searchQuery, setSearchQuery] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);
    const [isSearch, setIsSearch] = React.useState(false);

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

    eateryData.sort((a, b) => {
        let length = a.name.length < b.name.length ? a.name.length : b.name.length
        let first = a.name.toLowerCase()
        let second = b.name.toLowerCase()

        for (let i = 0; i < length; i++) {
            if (first.charAt(i) < second.charAt(i)) {
                return -1
            } else if (first.charAt(i) > second.charAt(i)) {
                return 1
        }}
    })

    function renderScreen() {       
        
        const onChangeSearch = (query) => {

            setSearchQuery(query)

            if (query) {
                setIsSearch(true)

                const newResults = eateryData.filter(item => {
                    const itemData = item.name.toLowerCase()
                    const queryData = query.toLowerCase()
                    return itemData.includes(queryData)
                })

                setSearchResults(newResults)

            } else {

                setIsSearch(false)

            }
        }

        if (isSearch) {
            return (
                <View style={styles.searchMainContainer}>
                    <View style={styles.searchBarArea2}>
                        <TouchableOpacity
                            style={styles.backBox}
                            onPress={() => props.navigation.navigate("Home")}
                        >
                            <Icon name="arrow-back" size={30} />
                        </TouchableOpacity>

                        <View style={styles.searchBarBox2}>
                            <View style={styles.searchIconBox2}>
                                <Icon
                                    name="search"
                                    size={15}
                                    color='darkgray'
                                />
                            </View>

                            <TextInput
                                style={styles.searchQueryText}
                                onChangeText={text => onChangeSearch(text)}
                                value={searchQuery}
                            >
                            </TextInput>

                        </View>
                    </View>

                    <FlatList
                        data={searchResults}
                        keyExtractor={item => item.id}
                        style={styles.searchScreenCategoriesList}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => {
                                    props.navigation.navigate("Eatery", {
                                        eateryId: item.id,
                                    })
                                }}
                            >
                                <View style={styles.searchResultsBox}>
                                    <Text style={styles.searchResultsText}>
                                        {item.name}
                                    </Text>
                                    <View style={styles.iconRightPadding}>
                                        <Icon name="navigate-outline" />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            )
        } else {
            const renderItem = ({ item }) => {
                return (
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate("Category", {
                            category: item.name,
                            categoryId: item.id,
                            eateryData: eateryData,
                        })}
                    >
                        <View style={styles.searchResultsBox}>
                            <Text style={styles.searchResultsText}>
                                {item.name}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )
            }
            return (
                <View style={styles.searchMainContainer}>
                    <View style={styles.searchBarArea3}>
                        <TouchableOpacity
                            style={styles.backBox}
                            onPress={() => props.navigation.navigate("Home")}
                        >
                            <Icon name="arrow-back" size={30} />
                        </TouchableOpacity>

                        <View style={styles.searchBarBox2}>
                            <View style={styles.searchIconBox2}>
                                <Icon
                                    name="search"
                                    size={15}
                                    color='darkgray'
                                />
                            </View>
                            <TextInput
                                style={styles.searchQueryText}
                                placeholder={"Search eateries!"}
                                onChangeText={text => onChangeSearch(text)}
                                value={searchQuery}
                            >
                            </TextInput>
                        </View>
                    </View>

                    <Text style={styles.mainCategoriesText}>Main Categories</Text>

                    <FlatList
                        data={categoryData}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={item => `${item.id}`}
                        renderItem={renderItem}
                        style={styles.searchScreenCategoriesList}
                    />
                </View>
            )
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.searchScreenTopBar} />
                {renderScreen()}
            <View style={styles.searchScreenBottomPadding} />
        </View>
    );
};

export default SearchScreen;
