import React from 'react';
import { 
    Text, View, Image, TextInput, TouchableOpacity, 
    KeyboardAvoidingView, ScrollView, Keyboard
    } from 'react-native';
import Styles from './Styles'
import { useState } from 'react'
import firebase from '../../../api/firebase'
import * as Auth from '../../../api/Authentication'

let RegisterScreen = (props) => {
    const [text, setText] = useState('')
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const handleRegister = () => {
        Keyboard.dismiss()
        Auth.createAccount({
            username: text,
            email: email,
            password: pass,
        },
        (user) => props.navigation.navigate('Home'),
        (error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
                alert('The password is too weak.');
            } else {
                alert(errorMessage);
            }
        })
    }

    return (
        <View style = {Styles.container}>
            <ScrollView>
                <KeyboardAvoidingView>
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
                placeholder= 'Enter Username'
            />
                <TextInput
                style= {Styles.userInput}
                value = {email}
                onChangeText= {(email) => setEmail(email)}
                autoCapitalize = 'none'
                placeholder = 'Enter email'
            />
            <TextInput
                style= {Styles.userInput}
                value = {pass}
                onChangeText= {(pass) => setPass(pass)}
                autoCapitalize = 'none'
                placeholder = 'Enter Password'
                secureTextEntry
            />
            <TouchableOpacity style={Styles.logInButton} onPress={handleRegister}>
                <Text style={Styles.logInText}>Register</Text>
            </TouchableOpacity>  
            <View style={Styles.noAccount}>
                <Text style={Styles.noAccountWording}>Already one of us? <Text 
                    style= {Styles.registerWording}
                    onPress= {() => props.navigation.navigate('Login')}
                    >Login!</Text></Text>
            </View>
            </KeyboardAvoidingView>
            </ScrollView>
        </View> 
    )
}

export default RegisterScreen;