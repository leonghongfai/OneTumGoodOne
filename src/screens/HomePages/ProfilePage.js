import React from "react";
import {
  Text,
  Button,
  View,
} from "react-native";
import styles from "./PageStyles"

const ProfilePage = (props) => {
  return (
    <View style={styles.container}>
      <Button onPress={() => props.navigation.navigate('Camera')} title="take pic" />
    </View>
  );
};

export default ProfilePage;
