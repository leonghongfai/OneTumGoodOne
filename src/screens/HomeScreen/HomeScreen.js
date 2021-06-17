import React, { Component } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import ColorScheme from "../../../global/ColorScheme";
import HomePage from "../HomePages/HomePage";
import FollowPage from "../HomePages/FollowPage";
import CameraScreen from "../HomePages/PicturePages/CameraScreen";
import ProfilePage from "../HomePages/ProfilePage";
import SettingsPage from "../HomePages/SettingsPage";

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser, fetchUserPosts } from "../../../redux/actions/index"

const Tab = createBottomTabNavigator();

export class HomeScreen extends Component {
	componentDidMount() {
        this.props.fetchUser();
		this.props.fetchUserPosts();
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
						} else if (route.name === "Camera") {
							iconName = focused ? "camera" : "camera-outline";
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
				<Tab.Screen
					name="Follow"
					component={FollowPage}
					options={{ tabBarBadge: 3 }}
				/>
				<Tab.Screen name="Camera" component={CameraScreen} />
				<Tab.Screen name="Profile" component={ProfilePage} />
				<Tab.Screen name="Settings" component={SettingsPage} />
			</Tab.Navigator>
		);
	}
};

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})

const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUser, fetchUserPosts }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(HomeScreen);
