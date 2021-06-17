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
import { icons, images } from '../../../constants'
import Icon from 'react-native-vector-icons/Ionicons';
import styles from "./EateryScreenStyles";

const EateryScreen = (item, navigation) => {

    const [eatery, setEatery] = React.useState(null);

    React.useEffect(() => 
        setEatery(item)
    )

    function renderHeader() {
        return(
            <View>
                <TouchableOpacity style={styles.backBox}>
                    <Icon name="arrow-back" size={16} color="blue" />
                </TouchableOpacity>
            </View>
        )        
    }

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header} />
			{renderHeader()}
		</SafeAreaView>
	);
}

export default EateryScreen;