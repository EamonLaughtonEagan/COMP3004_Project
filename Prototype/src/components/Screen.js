import { MaterialCommunityIcons } from "@expo/vector-icons";
import Constants from "expo-constants";
import React from "react";
import { StyleSheet, SafeAreaView, View, Text } from "react-native";

import common from "../config/common";

function Screen({ children, style, title, hideHeader, navigation }) {
    const displayTitle = style || "missing title";
    return (
        <SafeAreaView style={[styles.screen, style]}>
            <View
                style={{
                    height: 50,
                    borderBottomWidth: 1,
                    borderBottomColor: common.softGray,
                    padding: 15,
                    flexDirection: "column",
                }}
            >
                <MaterialCommunityIcons
                    name="menu"
                    size={24}
                    color="black"
                    onPress={() => {
                        if (navigation) {
                            navigation.openDrawer();
                        }
                    }}
                />
                <Text
                    style={{
                        alignSelf: "center",
                    }}
                >
                    {displayTitle}
                </Text>
            </View>
            <View style={style}>{children}</View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        paddingTop: Constants.statusBarHeight,
        flex: 1,
    },
});

export default Screen;
