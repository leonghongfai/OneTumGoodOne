import React from "react";
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
import { icons } from '../../../../constants'
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase'
require('firebase/firestore')
import styles from "./HomePageStyles";

const HomePage = ({ navigation }) => {

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

	var eateries1 = [...eateries]
	var eateries2 = [...eateries]
	var eateries3 = [...eateries]

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
		return (
			<View style={styles.searchBarArea}>
				<TouchableOpacity
					style={styles.searchBarBox}
					onPress={() => navigation.navigate("Search", {
						eateryData: eateries,
					})}
				>
					<View style={styles.searchIconBox}>
						<Icon
							name="search"
							size={15}
							color='darkgray'
						/>
					</View>
					<Text style={styles.searchPlaceholder}>
						What are you craving?
					</Text>
				</TouchableOpacity>
			</View>
		)
	}

	function renderCategories() {
		const categories = [
			{
				id: 1,
				name: "Asian",
				icon: icons.noodle,
			},
			{
				id: 6,
				name: "Bubble Tea",
				icon: icons.bubble_tea,
			},
			{
				id: 10,
				name: "Dessert",
				icon: icons.dessert,
			},
			{
				id: 12,
				name: "Fast Food",
				icon: icons.fast_food,
			},
			{
				id: 13,
				name: "Halal",
				icon: icons.halal,
			},
			{
				id: 23,
				name: "Pasta",
				icon: icons.pasta,
			},
			{
				id: 28,
				name: "Seafood",
				icon: icons.seafood,
			},
			{
				id: 36,
				name: "Western",
				icon: icons.western,
			},
		]

		const renderItem = ({ item }) => {
			return (
				<TouchableOpacity
					style={styles.homePageCategoriesBox}
					onPress={() => navigation.navigate("Category", {
						category: item.name,
						categoryId: item.id,
						eateryData: eateries,
					})}
				>
					<View style={styles.homePageCategoriesInsideBox}>
						<Image
							source={item.icon}
							resizeMode='contain'
							style={styles.homePageCategoriesImage}
						/>
					</View>
					<Text style={styles.homePageCategoriesItemText}>
						{item.name}
					</Text>
				</TouchableOpacity>
			)
		}

		return (
			<View>
				<Text style={styles.homePageCategoriesText}>Categories</Text>
				<FlatList
					data={categories}
					horizontal
					showsHorizontalScrollIndicator={false}
					keyExtractor={item => `${item.id}`}
					renderItem={renderItem}
					style={styles.homePageCategoriesList}
				/>
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

				<View style={styles.homePagePriceBox}>
					{
						[1, 2, 3].map((priceRating) => (
							<Text
								key={priceRating}
								style={{
									color: (priceRating <= item.priceRating) ?
										'black' : 'white'
								}}
							>$</Text>
						))
					}
				</View>
			</TouchableOpacity>
		)

		eateries1.sort(function (a, b) {
			return b.currentRating - a.currentRating
		})

		return (
			<View>
				<View style={styles.homePageSmallContainer}>
					<Text style={styles.homePageTitleText}>Highest Rated</Text>
					<View>
						<FlatList
							data={eateries1}
							keyExtractor={(item) => item.id.toString()}
							renderItem={renderItem}
							horizontal={true}
							showsHorizontalScrollIndicator={false}
						/>
					</View>
				</View>
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

		eateries2.sort(function (a, b) {
			return b.numberOfRatings - a.numberOfRatings
		})

		return (
			<View>
				<View style={styles.homePageSmallContainer}>
					<Text style={styles.homePageTitleText}>Popular</Text>
					<View>
						<FlatList
							data={eateries2}
							keyExtractor={(item) => item.id.toString()}
							renderItem={renderItem}
							horizontal={true}
							showsHorizontalScrollIndicator={false}
						/>
					</View>
				</View>
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

		eateries3.sort(function (a, b) {
			return b.latestReview - a.latestReview
		})

		return (
			<View>
				<View style={styles.homePageSmallContainer}>
					<Text style={styles.homePageTitleText}>Recently Reviewed</Text>
					<View>
						<FlatList
							data={eateries3}
							keyExtractor={(item) => item.id.toString()}
							renderItem={renderItem}
							horizontal={true}
							showsHorizontalScrollIndicator={false}
						/>
					</View>
				</View>
			</View>
		)
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.homePageTopBar}>
				{renderSearchBar()}
			</View>
			<View style={styles.homePageSeparator} />
			<ScrollView style={styles.homePageMainContainer}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
					/>}>
				{renderCategories()}
				{renderRecommendations1()}
				{renderRecommendations2()}
				{renderRecommendations3()}
			</ScrollView>
			<View style={styles.homePageBottomPadding} />
		</SafeAreaView>
	);
};

export default HomePage;
