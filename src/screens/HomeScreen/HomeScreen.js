import React from 'react';
import { 
    Text, View, Image, TextInput, 
    TouchableOpacity, KeyboardAvoidingView, ScrollView 
    } from 'react-native';
import { useState } from 'react'
import firebase from '../../../api/firebase'
import * as Auth from '../../../api/Authentication'


const HomeScreen = (props) => {
    //dont touch auth and handleLogOut pls
    const handleLogOut = () => {
        Auth.signOut(
            () => props.navigation.navigate("Login"),
            (error) => alert(error.message)
        )
    }

    
    return (
        <View>
            <Text>HI</Text>
            <TouchableOpacity onPress= {handleLogOut}>
                <Text style={{alignSelf: 'center'}}>Log Out</Text>
            </TouchableOpacity>
        </View>
    )
}
export default HomeScreen