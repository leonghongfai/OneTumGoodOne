import React from "react";
import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  Button,
  RefreshControl
} from "react-native";


const DisplayPost = (props) => {
    const user = props.route.params.user
    const item = props.route.params.item
    return (
        <View style={styles.container}>
            {console.log(item.username)}
            <Image
                source={{uri: item.downloadURL}}
                style={styles.image}
            />
            <Text style={styles.info}>{item.username}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40,
    },
    image: {
        flex: 1,
        aspectRatio: 1/1,
    },
    info: {
        flex: 1
    }
})
export default DisplayPost