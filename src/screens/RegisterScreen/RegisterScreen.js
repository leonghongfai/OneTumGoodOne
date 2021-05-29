import React from 'react';
import { 
    Text, View, Image, TouchableOpacity, 
    KeyboardAvoidingView, ScrollView, Keyboard
    } from 'react-native';
import Styles from './Styles'
import { useState, useRef } from 'react'
import * as Auth from '../../../api/Authentication'
import {TextInput} from 'react-native-paper'

let RegisterScreen = (props) => {
    const [text, setText] = useState('')
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [view, setView] = useState(true)
    const ref_input2 = useRef();
    const ref_input3 = useRef()
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
                        mode = 'outlined'
                        autoFocus= {true}
                        onSubmitEditing={() => ref_input2.current.focus()}
                        blurOnSubmit = {false}

                    />
                    <TextInput
                        style= {Styles.userInput}
                        value = {email}
                        onChangeText= {email => setEmail(email)}
                        autoCapitalize = 'none'
                        placeholder= 'Enter Email'
                        mode = 'outlined'
                        ref = {ref_input2}
                        onSubmitEditing={() => ref_input3.current.focus()}
                        blurOnSubmit= {false}
                    />
                    <TextInput
                        style= {Styles.userInput}
                        value = {pass}
                        onChangeText= {(pass) => setPass(pass)}
                        autoCapitalize = 'none'
                        placeholder = 'Enter Password'
                        mode= 'outlined'
                        secureTextEntry
                        right = {<TextInput.Icon name= {view ?'eye-outline':'eye-off-outline'}
                                            onPress= {() => setView(!view)} 
                                            style= {{paddingTop: 10}}/>}
                        ref = {ref_input3}
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