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
				onPress={() => 					
					navigation.navigate("Eatery", {
					eateryId: item.id,
				})

				}
			>

				<View>
					<Image
						source={{uri: item.image}}
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
			<View style={styles.homePageMainContainer}>
				<ScrollView 
					showsVerticalScrollIndicator={false}
					refreshControl={
						<RefreshControl
						  refreshing={refreshing}
						  onRefresh={onRefresh}
						/>}
					>
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
				</ScrollView>
			</View>
		)
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.homePageTopPadding}/>
			{renderSearchBar()}
			{renderRecommendations()}
			<View style={styles.homePageBottomPadding} />
		</SafeAreaView>
	);
};

export default HomePage;
