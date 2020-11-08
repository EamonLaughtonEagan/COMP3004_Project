import React, { useState } from 'react';
import {StyleSheet, ImageBackground, View, Image, Text} from "react-native";

import Screen from '../components/Screen';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';

function LoginScreen(props) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    

    return (
        <Screen>
            <Image 
                style={styles.logo}
                source={require('../assets/gear.png')}/>
            <AppTextInput 
                autoCapitalize="none"
                autoCorrect={false}
                icon="email"
                keyboardType="email-address"
                onChangeText={text => setEmail(text)}
                placeholder="Email"
            />
            <AppTextInput 
                autoCapitalize="none"
                autoCorrect={false}
                icon="lock"
                onChangeText={text => setPassword(text)}
                placeholdrer="Password"
                secureTextEntry={true}
            />
            <AppButton title="Login" onPress={() => console.log(email, password)}/>
        </Screen>
    );
}

const styles = StyleSheet.create({
    logo: {
        width: 80,
        height: 80,
        alignSelf: 'center',
        marginTop: 70,
        marginBottom: 20,
    }
})

export default LoginScreen;
