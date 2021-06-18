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
            <View style={styles.header}>

                <TouchableOpacity
                    style={styles.backBox}
                    onPress={() => navigation.navigate("Home")}
                >
                    <Icon name="arrow-back" size={30} />
                </TouchableOpacity>

                <View style={styles.eateryTitleBox}>
                    <View style={styles.eateryTitle}>
                        <Text style={styles.eateryTitleText}>{eatery?.name}</Text>
                        <View style={styles.ratingBox}>
                            <Image
                                source={icons.star}
                                style={styles.ratingStar}
                            />
                            <Text>{eatery?.rating}</Text>
                        </View>
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

    function renderMenu() {
        return (
            <View>
                <Text style={styles.menuTitle}>Menu</Text>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    {
                        eatery?.menu.map((item, index) => (
                            <View
                                key={`menu-${index}`}
                                style={styles.menuImageBox}
                            >
                                    <Image
                                        source={item.photo}
                                        resizeMode='cover'
                                        style={styles.menuImage}
                                    />
                                    <View style={styles.menuItemText}>
                                        <Text style={styles.menuItemName}>{item.name}</Text>
                                        <Text style={styles.menuItemPrice}>${item.price.toFixed(2)}</Text>
                                    </View>
                            </View>
                        ))
                    }
                </ScrollView>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            <ScrollView 
                style={styles.mainView}
                showsVerticalScrollIndicator={false}
            >
                {renderPictures()}
                {renderMenu()}
            </ScrollView>
        </SafeAreaView>
    );
}

export default EateryScreen;