import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Keyboard, Text } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

import AppButton from "../components/AppButton";
import Screen from "../components/AppScreen";
import AppTextInput from "../components/AppTextInput";
import colors from "../config/colors";
import routes from "../navigation/routes";

function LoginScreen({ navigation }) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    return (
        <Screen style={styles.screen}>
            <MaterialCommunityIcons
                name="account-convert"
                size={100}
                color="dodgerblue"
                style={styles.logo}
            />
            <Text style={styles.message}>Service Manager Lite</Text>
            <AppTextInput
                autoCapitalize="none"
                autoCorrect={false}
                icon="email-outline"
                keyboardType="email-address"
                onChangeText={(text) => setEmail(text)}
                placeholder="Email"
            />
            <AppTextInput
                autoCapitalize="none"
                autoCorrect={false}
                icon="eye-off"
                onChangeText={(text) => setPassword(text)}
                placeholder="Password"
                secureTextEntry
            />
            <Text style={{ color: colors.secondary }}>
                Please log in to continue
            </Text>
            <AppButton
                title="Log in"
                onPress={() => {
                    Keyboard.dismiss();
                    navigation.navigate(routes.HOME);
                }}
                style={{
                    marginVertical: 40,
                }}
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    logo: {
        marginTop: 25,
        marginBottom: 20,
    },
    message: {
        color: colors.primary,
        fontSize: 15,
        fontWeight: "bold",
        marginVertical: 5,
    },
});

export default LoginScreen;
