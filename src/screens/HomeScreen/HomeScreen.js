import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import ColorScheme from "../../../global/ColorScheme";
import HomePage from "../HomePages/HomePage";
import FollowPage from "../HomePages/FollowPage";
import CameraScreen from "../HomePages/PicturePages/CameraScreen";
import ProfilePage from "../HomePages/ProfilePage";
import SettingsPage from "../HomePages/SettingsPage";

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
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
};

export default HomeScreen;
