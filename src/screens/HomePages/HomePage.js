import React from "react";
import {
	Text,
	View,
	SafeAreaView,
	Image,
	TouchableOpacity,
	ScrollView,
	FlatList
} from "react-native";
import { Searchbar } from "react-native-paper";
import { icons, images } from '../../../constants'
import styles from "./PageStyles";

const HomePage = ({ navigation }) => {

	const aroundYouData = [
		{
			id: 1,
			name: "vc Burger",
			rating: 4.8,
			categories: [5, 7],
			photo: images.burger_restaurant_1,
			menu: [
				{
					menuId: 1,
					name: "Crispy Chicken Burger",
					photo: images.crispy_chicken_burger,
					description: "Burger with crispy chicken, cheese and lettuce",
					calories: 200,
					price: 10,
				},
				{
					menuId: 2,
					name: "Crispy Chicken Burger with Honey Mustard",
					photo: images.honey_mustard_chicken_burger,
					description: "Crispy Chicken Burger with Honey Mustard Coleslaw",
					calories: 250,
					price: 15,
				},
				{
					menuId: 3,
					name: "Crispy Baked French Fries",
					photo: images.baked_fries,
					description: "Crispy Baked French Fries",
					calories: 194,
					price: 8,
				},
			],
		},
		{
			id: 2,
			name: "vc Pizza",
			rating: 4.8,
			categories: [2, 4, 6],
			photo: images.pizza_restaurant,
			menu: [
				{
					menuId: 4,
					name: "Hawaiian Pizza",
					photo: images.hawaiian_pizza,
					description: "Canadian bacon, homemade pizza crust, pizza sauce",
					calories: 250,
					price: 15,
				},
				{
					menuId: 5,
					name: "Tomato & Basil Pizza",
					photo: images.pizza,
					description:
						"Fresh tomatoes, aromatic basil pesto and melted bocconcini",
					calories: 250,
					price: 20,
				},
				{
					menuId: 6,
					name: "Tomato Pasta",
					photo: images.tomato_pasta,
					description: "Pasta with fresh tomatoes",
					calories: 100,
					price: 10,
				},
				{
					menuId: 7,
					name: "Mediterranean Chopped Salad ",
					photo: images.salad,
					description: "Finely chopped lettuce, tomatoes, cucumbers",
					calories: 100,
					price: 10,
				},
			],
		},
	];

	const youMightLikeData = [
		{
			id: 1,
			name: "vc Hotdogs",
			rating: 4.8,
			categories: [3],
			photo: images.hot_dog_restaurant,
			menu: [
				{
					menuId: 8,
					name: "Chicago Style Hot Dog",
					photo: images.chicago_hot_dog,
					description: "Fresh tomatoes, all beef hot dogs",
					calories: 100,
					price: 20,
				},
			],
		},
		{
			id: 2,
			name: "vc Sushi",
			rating: 4.8,
			categories: [8],
			photo: images.japanese_restaurant,
			duration: "10 - 15 min",
			location: {
				latitude: 1.5578068150528928,
				longitude: 110.35482523764315,
			},
			courier: {
				avatar: images.avatar_4,
				name: "Ahmad",
			},
			menu: [
				{
					menuId: 9,
					name: "Sushi sets",
					photo: images.sushi,
					description: "Fresh salmon, sushi rice, fresh juicy avocado",
					calories: 100,
					price: 50,
				},
			],
		},
	];

	const promotionsTodayData = [
		{
			id: 1,
			name: "vc Cuisine",
			rating: 4.8,
			categories: [1, 2],
			photo: images.noodle_shop,
			menu: [
				{
					menuId: 10,
					name: "Kolo Mee",
					photo: images.kolo_mee,
					description: "Noodles with char siu",
					calories: 200,
					price: 5,
				},
				{
					menuId: 11,
					name: "Sarawak Laksa",
					photo: images.sarawak_laksa,
					description: "Vermicelli noodles, cooked prawns",
					calories: 300,
					price: 8,
				},
				{
					menuId: 12,
					name: "Nasi Lemak",
					photo: images.nasi_lemak,
					description: "A traditional Malay rice dish",
					calories: 300,
					price: 8,
				},
				{
					menuId: 13,
					name: "Nasi Briyani with Mutton",
					photo: images.nasi_briyani_mutton,
					description: "A traditional Indian rice dish with mutton",
					calories: 300,
					price: 8,
				},
			],
		},
		{
			id: 2,
			name: "vc Dessets",
			rating: 4.9,
			categories: [9, 10],
			photo: images.kek_lapis_shop,
			menu: [
				{
					menuId: 12,
					name: "Teh C Peng",
					photo: images.teh_c_peng,
					description: "Three Layer Teh C Peng",
					calories: 100,
					price: 2,
				},
				{
					menuId: 13,
					name: "ABC Ice Kacang",
					photo: images.ice_kacang,
					description: "Shaved Ice with red beans",
					calories: 100,
					price: 3,
				},
				{
					menuId: 14,
					name: "Kek Lapis",
					photo: images.kek_lapis,
					description: "Layer cakes",
					calories: 300,
					price: 20,
				},
			],
		},
	];

	const [aroundYou, setAroundYou] = React.useState(aroundYouData);
	const [youMightLike, setYouMightLike] = React.useState(youMightLikeData);
	const [promotionsToday, setPromotionsToday] = React.useState(promotionsTodayData);
	const [searchQuery, setSearchQuery] = React.useState("");


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

	function renderRecommendations() {
		const renderItem = ({ item }) => (
			<TouchableOpacity
				style={styles.homePageImageBlock}
				onPress={() => navigation.navigate("Eatery", {
					item,
				})}
			>

				<View>
					<Image
						source={item.photo}
						resizeMode="cover"
						style={styles.homePageImage}
					/>
					<View style={styles.rating}>
						<Image
							source={icons.star}
							style={styles.ratingStar}
						/>
						<Text style={styles.ratingText}>{item.rating}</Text>
					</View>
				</View>

				<Text>{item.name}</Text>
			</TouchableOpacity>
		)

		return (
			<View style={styles.homePageMainContainer}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<View style={styles.homePageSmallContainer}>
						<Text style={styles.homePageTitleText}>Around you</Text>
						<FlatList
							data={aroundYou}
							keyExtractor={(item) => item.id}
							renderItem={renderItem}
							horizontal={true}
							showsHorizontalScrollIndicator={false}
						/>
					</View>
					<View style={styles.homePageSmallContainer}>
						<Text style={styles.homePageTitleText}>You might like</Text>
						<FlatList
							data={youMightLike}
							keyExtractor={(item) => item.id}
							renderItem={renderItem}
							horizontal={true}
							showsHorizontalScrollIndicator={false}
						/>
					</View>
					<View style={styles.homePageSmallContainer}>
						<Text style={styles.homePageTitleText}>Promotions today</Text>
						<FlatList
							data={promotionsToday}
							keyExtractor={(item) => item.id}
							renderItem={renderItem}
							horizontal={true}
							showsHorizontalScrollIndicator={false}
						/>
					</View>
				</ScrollView>
			</View>
		)
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.homePageTopPadding} />
			{renderSearchBar()}
			{renderRecommendations()}
			<View style={styles.homePageBottomPadding} />
		</SafeAreaView>
	);
};

export default HomePage;
