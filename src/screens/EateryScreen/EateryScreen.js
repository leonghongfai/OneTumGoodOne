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
    Animated
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { icons, images } from '../../../constants'
import Icon from 'react-native-vector-icons/Ionicons';
import styles from "./EateryScreenStyles";
import Styles from "../LoginScreen/Styles";

const EateryScreen = ({ route }) => {

    const navigation = useNavigation();

    const [eatery, setEatery] = React.useState(null);

    React.useEffect(() => {
        let { item } = route.params
        setEatery(item)
    })

    function renderHeader() {
        return (
            <View style={{ flexDirection: 'row' }}>

                <TouchableOpacity
                    style={styles.backBox}
                    onPress={() => navigation.navigate("Home")}
                >
                    <Icon name="arrow-back" size={30} />
                </TouchableOpacity>

                <View style={styles.eateryTitleBox}>
                    <View style={styles.eateryTitle}>
                        <Text style={styles.eateryTitleText}>{eatery?.name}</Text>
                    </View>
                </View>

            </View>
        )
    }

    function renderPictures() {
        return (
            <Animated.ScrollView
                horizontal={true}
                pagingEnabled={true}
                scrollEventThrottle={16}
                snapToAlignment="center"
                showsHorizontalScrollIndicator={false}
                //on scroll
            >
                {
                    eatery?.menu.map((item, index) => (
                        <View
                            key={`menu-${index}`}                        
                            style={styles.eateryPicturesBox}
                        >
                            <View style={styles.eateryPicturesBox1}>
                                <Image
                                    source={item.photo}
                                    resizeMode="cover"
                                    style={styles.eateryPicturesImage}
                                />
                            </View>

                        </View>
                    ))
                }
            </Animated.ScrollView>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderMenu()}
        </SafeAreaView>
    );
}

export default EateryScreen;