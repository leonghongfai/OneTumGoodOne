import React from "react";
import {
	Text,
	View,
	SafeAreaView,
	Image,
	TouchableOpacity,
	ScrollView,
	FlatList,
    KeyboardAvoidingView,
} from "react-native";
import { Searchbar } from "react-native-paper";
import { icons, images } from '../../../constants'
import styles from "./EateryScreenStyles";

const EateryScreen = () => {
    return (
        <View style={styles.container}>
            <ScrollView>
                <KeyboardAvoidingView>
                    <View style={styles.topContainer} />
                    <Text style={styles.title}>RESET PASSWORD</Text>
                    <Image
                        style={styles.logo}
                        source={require('../../../assets/icons/favicon.png')}
                    />
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    )
}

export default EateryScreen;