import React, { useState } from "react";
import { StyleSheet, Image } from "react-native";

import AppButton from "../components/AppButton";
import Screen from "../components/AppScreen";
import AppTextInput from "../components/AppTextInput";
import routes from "../navigation/routes";

function LoginScreen({ navigation }) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    return (
        <Screen>
            <Image style={styles.logo} source={require("../assets/gear.png")} />
            <AppTextInput
                autoCapitalize="none"
                autoCorrect={false}
                icon="email"
                keyboardType="email-address"
                onChangeText={(text) => setEmail(text)}
                placeholder="Email"
            />
            <AppTextInput
                autoCapitalize="none"
                autoCorrect={false}
                icon="lock"
                onChangeText={(text) => setPassword(text)}
                placeholdrer="Password"
                secureTextEntry
            />
            <AppButton
                title="Login"
                onPress={() => navigation.navigate(routes.JOB_LIST)}
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    logo: {
        width: 80,
        height: 80,
        alignSelf: "center",
        marginTop: 70,
        marginBottom: 20,
    },
});

export default LoginScreen;
