import React from "react";
import { Text, View, StyleSheet } from "react-native";

import Screen from "../components/Screen";

function AccountScreen({ route, navigation }) {
    return (
        <Screen
            title="Account"
            headerType="drawer"
            style={styles.logo}
            navigation={navigation}
        >
            <Text style={styles.accountText}>You are logged in as ADMIN</Text>
            <View
                style={{
                    alignItems: "flex-start",
                }}
            >
                <Text style={styles.detail}>Name: The Crew</Text>
                <Text style={styles.detail}>E-mail: hello@thecrew.com</Text>
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
        paddingTop: 100,
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
