import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import AppButton from "../components/AppButton";
import Screen from "../components/AppScreen";
import colors from "../config/colors";
import routes from "../navigation/routes";

function WelcomeScreen({ navigation }) {
    return (
        <Screen>
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                }}
            >
                <View
                    style={{
                        alignItems: "center",
                        justifyContent: "space-around",
                    }}
                >
                    <MaterialCommunityIcons
                        name="account-convert"
                        size={100}
                        color={colors.primary}
                        style={styles.logo}
                    />
                    <Text style={styles.logotitle}>
                        Service Management Lite
                    </Text>
                </View>

                <Text style={styles.logosubtitle}>
                    Keeping pool companies organized since 2020
                </Text>
                <View style={{ marginVertical: 50 }} />
                <AppButton
                    title="Get Started"
                    onPress={() => navigation.navigate(routes.LOGIN)}
                />
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    logo: {
        marginTop: 25,
        marginBottom: 20,
    },
    logotitle: {
        color: colors.primary,
        fontSize: 30,
        margin: 5,
    },
    logosubtitle: {
        color: colors.secondary,
        fontSize: 12,
        textAlign: "center",
        alignSelf: "stretch",
    },
});

export default WelcomeScreen;
