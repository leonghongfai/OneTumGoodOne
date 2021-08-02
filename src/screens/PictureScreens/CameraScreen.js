import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from 'react-native-vector-icons/Ionicons';
import { icons } from '../../../constants'
import * as ImagePicker from 'expo-image-picker'
import styles from "./PictureScreenStyles"
import { set } from 'react-native-reanimated';

export default function CameraScreen(props) {

    const currentEateryId = props.route.params.eateryId;
    const [cameraPermission, setCameraPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [camera, setCamera] = useState(null);
    const [image, setImage] = useState(null);
    const [galleryPermission, setGalleryPermission] = useState(null);
    const [isTaken, setIsTaken] = useState(false);

    const takePicture = async () => {
        if (camera) {
            const data = await camera.takePictureAsync(null)
            setImage(data.uri)
        }
        setIsTaken(true)
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
            setImage(result.uri)
            setIsTaken(true)
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
        return (
            <View style={styles.noAccess}>
                <Text>No access to camera and gallery</Text>
            </View>
        )
    }

    if (isTaken) {
        return (
            <View style={styles.container3}>
                <View style={styles.topBox1}>
                {
                    <Image
                        source={{ uri: image }}
                        style={styles.image}
                    />
                }
                </View>
                <View style={styles.bottomBox1}>
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('SaveImage', { image, eateryId: currentEateryId })}
                    >
                            <View style={styles.usePictureBox}>
                                <View style={styles.usePictureButton}>
                                    <Text>Use Picture</Text>
                                </View>
                            </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    } else {
        return (
            <View style={styles.container2}>
                <View style={styles.cameraContainer}>
                    <Camera
                        ref={ref => setCamera(ref)}
                        style={styles.fixedRatio}
                        type={type}
                        ratio={'1:1'}
                    />
                </View>
                <View style={styles.buttons}>
                    <View style={styles.takePictureButton}>
                        <TouchableOpacity
                            onPress={() => takePicture()}
                        >
                            <Image
                                source={icons.circleincircle}
                                style={styles.circleincircle}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.otherButtons}>
                        <TouchableOpacity
                            onPress={() => pickImage()}
                        >
                            <View style={styles.pickFromGalleryBox}>
                                <View style={styles.pickFromGalleryButton}>
                                    <Text>Pick From Gallery</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}
