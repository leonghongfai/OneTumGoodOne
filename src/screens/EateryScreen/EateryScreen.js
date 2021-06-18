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
import { useNavigation } from '@react-navigation/native';
import { icons, images } from '../../../constants'
import Icon from 'react-native-vector-icons/Ionicons';
import styles from "./EateryScreenStyles";

const EateryScreen = (item) => {

    const navigation = useNavigation();

    const [eatery, setEatery] = React.useState(null);

    React.useEffect(() =>
        setEatery(item)
    )

    function renderHeader() {
        return (
            <View style={{ flexDirection: 'row' }}>

                <TouchableOpacity
                    style={styles.backBox}
                    onPress={() => navigation.navigate("Home")}
                >
                    <Icon name="arrow-back" size={30} />
                </TouchableOpacity>

                <View style={styles.restaurantTitleBox}>
                    <View style={styles.restaurantTitle}>
                        <Text style={styles.restaurantTitleText}>One tum gud wan</Text>
                    </View>
                </View>

            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
        </SafeAreaView>
    );
}

export default EateryScreen;