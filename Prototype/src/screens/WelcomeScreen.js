import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import AppButton from "../components/AppButton";
import RawScreen from "../components/AppScreen";
import common from "../config/common";
import routes from "../navigation/routes";

function WelcomeScreen({ navigation }) {
    return (
        <RawScreen>
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
                        color={common.primary}
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
        </RawScreen>
    );
}

const styles = StyleSheet.create({
    logo: {
        marginTop: 25,
        marginBottom: 20,
    },
    logotitle: {
        color: common.primary,
        fontSize: 30,
        margin: 5,
    },
    logosubtitle: {
        color: common.secondary,
        fontSize: 12,
        textAlign: "center",
        alignSelf: "stretch",
    },
});

export default WelcomeScreen;
