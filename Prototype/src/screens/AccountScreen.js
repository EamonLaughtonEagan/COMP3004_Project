import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";

import Screen from "../components/AppScreen";

function AccountScreen({ route }) {
    return (
        <Screen style={styles.logo}>
            <Text style={styles.accountText}>
                You are logged in as a technician.
            </Text>
            <View
                style={{
                    alignItems: "flex-start",
                }}
            >
                <Text style={styles.detail}>Name: Stanley Summers</Text>
                <Text style={styles.detail}>
                    E-mail: stanley.summers@gmail.com
                </Text>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {},
    screen: {
        //backgroundColor: "grey",
    },
    logo: {
        width: 260,
        height: 80,
        alignSelf: "center",
        marginTop: 10,
        marginBottom: 20,
    },
    accountText: {
        fontSize: 20,
        fontWeight: "bold",
        alignSelf: "center",
        paddingBottom: 20,
    },
    detail: {
        textAlign: "left",
        textAlignVertical: "center",
    },
});

export default AccountScreen;
