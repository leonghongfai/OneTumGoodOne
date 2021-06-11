import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import ColorScheme from "../../../global/ColorScheme";
import HomePage from "../HomePages/HomePage";
import FollowPage from "../HomePages/FollowPage";
import MapPage from "../HomePages/MapPage";
import ProfilePage from "../HomePages/ProfilePage";
import SettingsPage from "../HomePages/SettingsPage";
import CameraScreen from "../PicturePages/CameraScreen"

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;

					if (route.name === "Home") {
						iconName = focused ? "home" : "home-outline";
					} else if (route.name === "Follow") {
						iconName = focused ? "earth" : "earth-outline";
					} else if (route.name === "Map") {
						iconName = focused ? "map" : "map-outline";
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
			<Tab.Screen name="Map" component={MapPage} />
			<Tab.Screen name="Profile" component={ProfilePage} />
			<Tab.Screen name="Settings" component={SettingsPage} />
		</Tab.Navigator>
	);
};

export default HomeScreen;
