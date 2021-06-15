import React from "react";
import {
  Text,
  Button,
  View,
} from "react-native";
import styles from "./PageStyles"

const CameraPage = (props) => {
  return (
    <View style={styles.container}>
      <Button onPress={() => props.navigation.navigate("Camera")} title="take pic" />
    </View>
  );
};

export default CameraPage;
