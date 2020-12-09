import Constants from "expo-constants";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, SafeAreaView, View, ImageBackground } from "react-native";

function RawScreen({ children, style }) {
    return (
        <LinearGradient
            colors={["whitesmoke", "floralwhite"]}
            style={styles.screen}
            start={{ x: 1.5, y: 1.5 }}
            end={{ x: -2, y: -2 }}
        >
            {children}
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    screen: {
        paddingTop: Constants.statusBarHeight,
        flex: 1,
        alignItems: "center",
    },
});

export default RawScreen;
