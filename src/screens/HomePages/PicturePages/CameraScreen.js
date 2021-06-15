import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker'

export default function CameraScreen(props) {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [galleryPermission, setGalleryPermission] = useState(null)

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null)
      setImage(data.uri)
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  useEffect(() => {
    (async () => {
      const camera = await Camera.requestPermissionsAsync();
      setCameraPermission(camera.status === 'granted');

      const gallery = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setGalleryPermission(gallery.status === 'granted');
    })();
  }, []);

  if (cameraPermission === null) {
    return <View />;
  }
  if (cameraPermission === false || galleryPermission === false) {
    return <Text>No access to camera and gallery</Text>;
  }
  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera 
          ref={ref => setCamera(ref)}
          style={styles.fixedRatio} 
          type={type} 
          ratio={'1:1'}
        />
      </View>
      <Button
        title="Flip Image"
        onPress={() => {
          setType(
            type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
          );
        }}>
      </Button>
      <Button title='Take Picture' onPress={() => takePicture()} />
      <Button title='Use Existing Picture' onPress={() => pickImage()} />
      <Button title='Save Picture' onPress={() => props.navigation.navigate('SaveImage', {image})} />
      {image && <Image source={{uri: image}} style={{flex: 1}}/>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  cameraContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: Platform.OS === 'android'? StatusBar.currentHeight: 0,
  },
  fixedRatio: {
    paddingTop: Platform.OS === 'android'? StatusBar.currentHeight: 0,
    flex: 1,
    aspectRatio: 1,
  },
});