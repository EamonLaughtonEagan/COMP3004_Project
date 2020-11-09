import React from "react";
import { Text, View, StyleSheet } from "react-native";

import Screen from "../components/AppScreen";

function AccountScreen({ route }) {
    return (
        <Screen>
            <View style={styles.container}>
                <Text>This is the account screen!</Text>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {},
    screen: {
        backgroundColor: "grey",
    },
});

export default AccountScreen;
