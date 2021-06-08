import React from 'react';
import { 
    Text, View, Image,
    TouchableOpacity, KeyboardAvoidingView, ScrollView 
    } from 'react-native';
import { TextInput } from 'react-native-paper'
import Styles from './Styles'
import { useState, useRef } from 'react'
import * as Auth from '../../../api/Authentication'


const LoginScreen = (props) => {
    const [text, setText] = useState('')
    const [pass, setPass] = useState('')
    const [view, setView] = useState(true)
    const ref_input2 = useRef()
    const handleLogIn = () => {
        Auth.logIn(text, pass,
            () => props.navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
              }),
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
                        source = {require('../../../assets/icons/favicon.png')}
                    />
                    <TextInput
                        style= {Styles.userInput}
                        value = {text}
                        onChangeText= {text => setText(text)}
                        autoCapitalize = 'none'
                        placeholder= 'Email'
                        mode = 'outlined'
                        autoFocus = {true}
                        onSubmitEditing = {() => ref_input2.current.focus()}
                        blurOnSubmit = {false}
                    />
                    <TextInput
                        style= {Styles.userInput}
                        value = {pass}
                        onChangeText= {(text) => setPass(text)}
                        autoCapitalize = 'none'
                        placeholder = 'Password'
                        secureTextEntry = {view}
                        mode = 'outlined'
                        right = {<TextInput.Icon name= {view ?'eye-outline':'eye-off-outline'}
                                    onPress= {() => setView(!view)} 
                                    style= {{paddingTop: 10}}/>}
                        ref = {ref_input2}
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
                    <View style={Styles.noAccount}>
                        <Text style={Styles.noAccountWording}>Forgot your password? <Text 
                        style= {Styles.registerWording}
                        onPress= {() => props.navigation.navigate('ForgotPassword')}
                        >Reset Here!</Text></Text>
                    </View>
                </KeyboardAvoidingView>    
            </ScrollView> 
        </View>
    )
}

export default LoginScreen;