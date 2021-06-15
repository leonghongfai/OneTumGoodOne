import { Assets } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, Image, TextInput, TouchableOpacity,SafeAreaView, ScrollView, 
        KeyboardAvoidingView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Styles from './Styles'
import { useState } from 'react'

const EateryScreen = (props) => {

    return (
        <View style = {Styles.container}>
            <ScrollView>
                <KeyboardAvoidingView>
                    <View style={Styles.topContainer} />
                    <Text style={Styles.title}>RESET PASSWORD</Text>
                    <Image 
                        style={Styles.logo} 
                        source = {require('../../../assets/icons/favicon.png')}
                    />
                </KeyboardAvoidingView>
            </ScrollView>
        </View> 
    )
}

export default EateryScreen;