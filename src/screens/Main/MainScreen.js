import { Assets } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, Image, TextInput, TouchableOpacity,SafeAreaView, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Styles from './Styles'
import { useState } from 'react'


const MainScreen = (props) => {
    const [text, setText] = useState('')
    const [pass, setPass] = useState('')
    const [view, setView] = useState(false)

    return (
            <View style = {Styles.container}>
                <View style={Styles.topContainer} />
                <Text style={Styles.title}>WELCOME</Text>
                <Image 
                    style={Styles.logo} 
                    source = {require('../../../assets/favicon.png')}
                />
                <TouchableOpacity style={Styles.logInButton} 
                    onPress= {() => props.navigation.navigate('Login')}>
                    <Text style={Styles.logInText}>Log In</Text>
                </TouchableOpacity>  
                <TouchableOpacity style={Styles.logInButton}
                    onPress= {() => props.navigation.navigate('Register')}>
                    <Text style={Styles.logInText}>Register</Text>
                </TouchableOpacity>   
            </View>     
    )
}

export default MainScreen;