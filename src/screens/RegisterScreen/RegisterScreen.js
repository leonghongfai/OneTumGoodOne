import { Assets } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, Image, TextInput, TouchableOpacity,SafeAreaView, ScrollView } from 'react-native';
import Styles from './Styles'
import { useState } from 'react'


const RegisterScreen = (props) => {
    const [text, setText] = useState('')
    const [pass, setPass] = useState('')
    const [pass2, setPass2] = useState('')
    const [view, setView] = useState(false)

    return (
            <View style = {Styles.container}>
                <View style={Styles.topContainer} />
                <Text style={Styles.title}>REGISTER</Text>
                <Image 
                    style={Styles.logo} 
                    source = {require('../../../assets/favicon.png')}
                />
                <TextInput
                    style= {Styles.userInput}
                    value = {text}
                    onChangeText= {text => setText(text)}
                    autoCapitalize = 'none'
                    placeholder= 'Enter Email'
                />
                 <TextInput
                    style= {Styles.userInput}
                    value = {pass}
                    onChangeText= {(text) => setPass(text)}
                    autoCapitalize = 'none'
                    placeholder = 'Enter Password'
                    secureTextEntry
                />
                <TextInput
                   style= {Styles.userInput}
                   value = {pass2}
                   onChangeText= {(pass2) => setPass2(pass2)}
                   autoCapitalize = 'none'
                   placeholder = 'Confirm Password'
                   secureTextEntry
               />
                <TouchableOpacity style={Styles.logInButton}>
                    <Text style={Styles.logInText}>Register</Text>
                </TouchableOpacity>  
                <View style={Styles.noAccount}>
                    <Text style={Styles.noAccountWording}>Already one of us? <Text 
                        style= {Styles.registerWording}
                        onPress= {() => props.navigation.navigate('Login')}
                        >Login!</Text></Text>
                </View>
            </View>     
    )
}

export default RegisterScreen;