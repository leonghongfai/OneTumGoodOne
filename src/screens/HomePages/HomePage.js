import React, { useEffect } from "react";
import {
	Text,
	View,
	SafeAreaView,
	Image,
	TouchableOpacity,
	ScrollView,
	FlatList,
	RefreshControl
} from "react-native";
import { Searchbar } from "react-native-paper";
import { icons, images } from '../../../constants'
import firebase from 'firebase'
require('firebase/firestore')
import styles from "./PageStyles";


const HomePage = ({ navigation }) => {

	const [searchQuery, setSearchQuery] = React.useState("");
	const [eateries, setEateries] = React.useState([]);
	const [refreshing, setRefreshing] = React.useState(false);

	const wait = (timeout) => {
		return new Promise(resolve => setTimeout(resolve, timeout));
	}
	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		wait(2000).then(() => setRefreshing(false));
		firebase.firestore()
			.collection("eateries")
			.get()
			.then((snapshot) => {
				let restaurants = snapshot.docs.map(doc => {
					const id = doc.id
					const data = doc.data()
					return { id, ...data }
				})
				setEateries(restaurants)
			})
	}, []);

	React.useEffect(() => {
		firebase.firestore()
			.collection("eateries")
			.get()
			.then((snapshot) => {
				let restaurants = snapshot.docs.map(doc => {
					const id = doc.id
					const data = doc.data()
					return { id, ...data }
				})
				setEateries(restaurants)
			})
	}, [navigation])

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

	function renderSearchBar() {
		const onChangeSearch = (query) => setSearchQuery(query);
		return (
			<View style={styles.searchBarArea}>
				<Searchbar
					placeholder="Search"
					onChangeText={onChangeSearch}
					value={searchQuery}
					inputStyle={{ backgroundColor: "white" }}
					containerStyle={{ backgroundColor: "white", borderWidth: 20 }}
				/>
				<View style={styles.homePageMiddlePadding} />
			</View>
		)
	}

	function renderRecommendations1() {
		const renderItem = ({ item }) => (
			<TouchableOpacity
				style={styles.homePageImageBlock}
				onPress={() =>
					navigation.navigate("Eatery", {
						eateryId: item.id,
					})

				}
			>

				<View>
					<Image
						source={{ uri: item.image }}
						resizeMode="cover"
						style={styles.homePageImage}
					/>
					<View style={styles.homePageRating}>
						<Image
							source={icons.star}
							style={styles.homePageRatingStar}
						/>
						<Text>{item.currentRating.toFixed(1)}</Text>
					</View>
				</View>

				<Text>{item.name}</Text>
			</TouchableOpacity>
		)

		return (
			<View style={styles.homePageSmallContainer}>
				<Text style={styles.homePageTitleText}>Around you</Text>
				<FlatList
					data={eateries}
					keyExtractor={(item) => item.id.toString()}
					renderItem={renderItem}
					horizontal={true}
					showsHorizontalScrollIndicator={false}
				/>
			</View>
		)
	}

	function renderRecommendations2() {
		const renderItem = ({ item }) => (
			<TouchableOpacity
				style={styles.homePageImageBlock}
				onPress={() =>
					navigation.navigate("Eatery", {
						eateryId: item.id,
					})

				}
			>

				<View>
					<Image
						source={{ uri: item.image }}
						resizeMode="cover"
						style={styles.homePageImage}
					/>
					<View style={styles.homePageRating}>
						<Image
							source={icons.star}
							style={styles.homePageRatingStar}
						/>
						<Text>{item.currentRating.toFixed(1)}</Text>
					</View>
				</View>

				<Text>{item.name}</Text>
			</TouchableOpacity>
		)

		return (
			<View style={styles.homePageSmallContainer}>
				<Text style={styles.homePageTitleText}>You might like</Text>
				<FlatList
					data={eateries}
					keyExtractor={(item) => item.id.toString()}
					renderItem={renderItem}
					horizontal={true}
					showsHorizontalScrollIndicator={false}
				/>
			</View>
		)
	}

	function renderRecommendations3() {
		const renderItem = ({ item }) => (
			<TouchableOpacity
				style={styles.homePageImageBlock}
				onPress={() =>
					navigation.navigate("Eatery", {
						eateryId: item.id,
					})

				}
			>

				<View>
					<Image
						source={{ uri: item.image }}
						resizeMode="cover"
						style={styles.homePageImage}
					/>
					<View style={styles.homePageRating}>
						<Image
							source={icons.star}
							style={styles.homePageRatingStar}
						/>
						<Text>{item.currentRating.toFixed(1)}</Text>
					</View>
				</View>

				<Text>{item.name}</Text>
			</TouchableOpacity>
		)

		return (
			<View style={styles.homePageSmallContainer}>
				<Text style={styles.homePageTitleText}>Promotions today</Text>
				<FlatList
					data={eateries}
					keyExtractor={(item) => item.id.toString()}
					renderItem={renderItem}
					horizontal={true}
					showsHorizontalScrollIndicator={false}
				/>
			</View>
		)
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.homePageTopPadding} />
			{renderSearchBar()}
			<View style={styles.homePageMainContainer}>
				{renderRecommendations1()}
				{renderRecommendations2()}
				{renderRecommendations3()}
			</View>
			<View style={styles.homePageBottomPadding} />
		</SafeAreaView>
	);
};

export default HomePage;
