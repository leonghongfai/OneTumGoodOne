import React, { Component } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import ColorScheme from "../../../global/ColorScheme";
import HomePage from "../HomePages/HomePageScreen/HomePage";
import FollowPage from "../HomePages/FollowPageScreen/FollowPage";
import ProfilePage from "../HomePages/ProfilePageScreen/ProfilePage";
import SettingsPage from "../HomePages/SettingsPageScreen/SettingsPage";
import firebase from 'firebase'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser, fetchUserPosts, fetchUserFollowing, clearData } from "../../../redux/actions/index"

const Tab = createBottomTabNavigator();

export class HomeScreen extends Component {
	componentDidMount() {
        this.props.fetchUser();
		this.props.fetchUserPosts();
		this.props.fetchUserFollowing()
		this.props.clearData();
    }
	render() {
		const {currentUser} = this.props
		return (
			<Tab.Navigator
				initialRouteName={"Home"}
				screenOptions={({ route }) => ({
					tabBarIcon: ({ focused, color, size }) => {
						let iconName;

						if (route.name === "Home") {
							iconName = focused ? "home" : "home-outline";
						} else if (route.name === "Follow") {
							iconName = focused ? "earth" : "earth-outline";
						} else if (route.name === "Profile") {
							iconName = focused ? "person" : "person-outline";
						} else if (route.name === "Settings") {
							iconName = focused ? "settings" : "settings-outline";
						}
						return <Ionicons name={iconName} size={size} color={color} />;
					},
				})}
				tabBarOptions={{
					activeTintColor: ColorScheme.NavigationIconActive,
					inactiveTintColor: ColorScheme.NavigationIconInactive,
				}}
			>
				<Tab.Screen name="Home" component={HomePage} />
				<Tab.Screen name="Follow" component={FollowPage}/>
				<Tab.Screen name="Profile" component={ProfilePage} 
					 listeners={({ navigation }) => ({
						tabPress: event => {
							event.preventDefault();
							navigation.navigate("Profile", {uid: firebase.auth().currentUser.uid})
						}})}/>
				<Tab.Screen name="Settings" component={SettingsPage} />
			</Tab.Navigator>
		);
	}
};

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})

const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUser, fetchUserPosts, fetchUserFollowing, clearData }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(HomeScreen);
