import { Assets } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, Image, TextInput, TouchableOpacity,SafeAreaView, ScrollView } from 'react-native';
import Styles from './Styles'
import { useState } from 'react'


const LoginScreen = (props) => {
    const [text, setText] = useState('')
    const [pass, setPass] = useState('')
    const [view, setView] = useState(false)

    return (
            <View style = {Styles.container}>
                <View style={Styles.topContainer} />
                <Text style={Styles.title}>LOGIN</Text>
                <Image 
                    style={Styles.logo} 
                    source = {require('../../../assets/favicon.png')}
                />
                <TextInput
                    style= {Styles.userInput}
                    value = {text}
                    onChangeText= {text => setText(text)}
                    autoCapitalize = 'none'
                    placeholder= 'Email'
                />
                 <TextInput
                    style= {Styles.userInput}
                    value = {pass}
                    onChangeText= {(text) => setPass(text)}
                    autoCapitalize = 'none'
                    placeholder = 'Password'
                    secureTextEntry
                />
                <TouchableOpacity style={Styles.logInButton}>
                    <Text style={Styles.logInText}>Log In</Text>
                </TouchableOpacity>  
                <View style={Styles.noAccount}>
                    <Text style={Styles.noAccountWording}>Don't have an account? <Text 
                        style= {Styles.registerWording}
                        onPress= {() => props.navigation.navigate('Register')}
                        >Register!</Text></Text>
                </View>
            </View>     
    )
}

export default LoginScreen;