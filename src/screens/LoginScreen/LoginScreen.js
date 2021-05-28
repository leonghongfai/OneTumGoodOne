import React from 'react';
import { 
    Text, View, Image, TextInput, 
    TouchableOpacity, KeyboardAvoidingView, ScrollView 
    } from 'react-native';
import Styles from './Styles'
import { useState } from 'react'
import * as Auth from '../../../api/Authentication'


const LoginScreen = (props) => {
    const [text, setText] = useState('')
    const [pass, setPass] = useState('')
    const handleLogIn = () => {
        Auth.logIn(text, pass,
            () => props.navigation.navigate('Home'),
            (error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode === 'auth/wrong-password') {
                    alert('Wrong password.');
                } else {
                    alert(errorMessage);
                }
            }
        )
    }

    return (
        <View style = {Styles.container}>
            <ScrollView>
                <KeyboardAvoidingView>
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
                    <TouchableOpacity 
                        style={Styles.logInButton}
                        onPress= {handleLogIn}
                        >
                            <Text style={Styles.logInText}>Log In</Text>
                    </TouchableOpacity>  
                    <View style={Styles.noAccount}>
                        <Text style={Styles.noAccountWording}>Don't have an account? <Text 
                        style= {Styles.registerWording}
                        onPress= {() => props.navigation.navigate('Register')}
                        >Register!</Text></Text>
                    </View>
                </KeyboardAvoidingView>    
            </ScrollView> 
        </View>
    )
}

export default LoginScreen;