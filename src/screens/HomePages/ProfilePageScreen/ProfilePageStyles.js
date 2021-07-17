import { StyleSheet } from 'react-native';
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40,
    },
    containerInfo: {
        margin: 20,
    },
    containerGallery: {
        flex: 1,
    },
    image: {
        flex:1,
        aspectRatio: 1/1,
    },
    containerImage: {
        flex: 1/3
    },
})

export default styles;