import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Keyboard, Text, Alert } from "react-native";

import { Auth } from "../auth/Auth";
import AppButton from "../components/AppButton";
import RawScreen from "../components/AppScreen";
import AppTextInput from "../components/AppTextInput";
import common from "../config/common";
import routes from "../navigation/routes";

function LoginScreen({ navigation }) {
    let email = "";
    let password = "";

    return (
        <RawScreen style={styles.screen}>
            <MaterialCommunityIcons
                name="account-convert"
                size={100}
                color="dodgerblue"
                style={styles.logo}
            />
            <Text style={styles.message}>Service Management Lite</Text>
            <AppTextInput
                autoCapitalize="none"
                autoCorrect={false}
                icon="email-outline"
                keyboardType="email-address"
                onChangeText={(text) => (email = text)}
                placeholder="Email"
            />
            <AppTextInput
                autoCapitalize="none"
                autoCorrect={false}
                icon="eye-off"
                onChangeText={(text) => (password = text)}
                placeholder="Password"
                secureTextEntry
            />
            <Text style={{ color: common.secondary }}>
                Please log in to continue
            </Text>
            <AppButton
                title="Log in"
                onPress={() => {
                    if (Auth.login(email, password) !== null) {
                        Keyboard.dismiss();
                        navigation.navigate(routes.JOBS);
                    } else {
                        Alert.alert("Invalid username or password.");
                    }
                }}
                style={{
                    marginVertical: 40,
                }}
            />
        </RawScreen>
    );
}

const styles = StyleSheet.create({
    logo: {
        marginTop: 25,
        marginBottom: 20,
    },
    message: {
        color: common.primary,
        fontSize: 15,
        fontWeight: "bold",
        marginVertical: 5,
    },
});

export default LoginScreen;
