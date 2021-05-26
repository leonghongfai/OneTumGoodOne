import { Assets } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, Image, TextInput, TouchableOpacity,SafeAreaView, ScrollView } from 'react-native';
import LoginScreenStyles from './LoginScreenStyles'
import { useState } from 'react'


const LoginScreen = (props) => {
    const [text, setText] = useState('')
    const [pass, setPass] = useState('')
    const [view, setView] = useState(false)

    return (
            <View style = {LoginScreenStyles.container}>
                <View style={LoginScreenStyles.topContainer} />
                <Text style={LoginScreenStyles.title}>LOGIN</Text>
                <Image 
                    style={LoginScreenStyles.logo} 
                    source = {require('../../../assets/favicon.png')}
                />
                <TextInput
                    style= {LoginScreenStyles.userInput}
                    value = {text}
                    onChangeText= {text => setText(text)}
                    autoCapitalize = 'none'
                    placeholder= 'Email'
                />
                 <TextInput
                    style= {LoginScreenStyles.userInput}
                    value = {pass}
                    onChangeText= {(text) => setPass(text)}
                    autoCapitalize = 'none'
                    placeholder = 'Password'
                    secureTextEntry
                />
                <TouchableOpacity style={LoginScreenStyles.logInButton}>
                    <Text style={LoginScreenStyles.logInText}>Log In</Text>
                </TouchableOpacity>  
                <View style={LoginScreenStyles.noAccount}>
                    <Text style={LoginScreenStyles.noAccountWording}>Don't have an account? <Text 
                        style= {LoginScreenStyles.registerWording}
                        >Register!</Text></Text>
                </View>
            </View>     
    )
}

export default LoginScreen;