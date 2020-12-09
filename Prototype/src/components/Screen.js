import { MaterialCommunityIcons } from "@expo/vector-icons";
import Constants from "expo-constants";
import React from "react";
import { StyleSheet, SafeAreaView, View, Text } from "react-native";

import common from "../config/common";

class Screen extends React.Component {
    header = null;
    headerType;
    title;
    navigation;

    constructor(props) {
        super(props);
        this.navigation = props.navigation;

        this.title = props.title;
        this.headerType = props.headerType;

        if (!this.title) {
            if (this.name) {
                console.log("Screen has name " + name + ". Change to title");
            }
            this.title = "missing title";
        } else {
            console.log("title " + this.title);
        }

        if (!this.headerType) {
            console.log("no header type; defaulting to drawer");
            this.headerType = "drawer";
        }

        if (!this.navigation) {
            console.log("CRITICAL no navigation");
        }
    }

    render() {
        console.log("title " + this.title);
        console.log("header type " + this.headerType);

        if (this.headerType === "drawer") {
            this.header = (
                <View style={styles.headerContainer}>
                    <MaterialCommunityIcons
                        name="menu"
                        size={24}
                        color="black"
                        onPress={() => {
                            if (this.navigation) {
                                this.navigation.openDrawer();
                            } else {
                                console.log("Can't open drawer; no navigation");
                            }
                        }}
                        style={styles.icon}
                    />
                    <Text numberOfLines={1} style={styles.headerTitle}>
                        {this.title}
                    </Text>
                    <View style={{ flex: 1 }} />
                </View>
            );
        } else if (this.headerType !== "none") {
            this.header = (
                <View style={styles.headerContainer}>
                    <MaterialCommunityIcons
                        name="keyboard-backspace"
                        size={24}
                        color="black"
                        onPress={() => {
                            if (this.navigation) {
                                this.navigation.goBack();
                            } else {
                                console.log("Can't go back; no navigation");
                            }
                        }}
                        style={styles.icon}
                    />
                    <Text numberOfLines={1} style={styles.headerTitle}>
                        {this.title}
                    </Text>
                    <View style={{ flex: 1 }} />
                </View>
            );
        }

        return (
            <SafeAreaView style={[styles.screen]}>
                {this.header}
                <View>{this.props.children}</View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    screen: {
        paddingTop: Constants.statusBarHeight,
        alignItems: "center",
        flex: 1,
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 50,
        width: "100%",
        borderBottomWidth: 3,
        borderBottomColor: "dodgerblue",
        borderLeftColor: common.softGray,
        borderLeftWidth: 1,
        paddingHorizontal: 15,
    },
    icon: {
        flex: 1,
        left: 0,
        paddingTop: 13,
    },
    headerTitle: {
        maxWidth: "80%",
        fontSize: 15,
    },
});

export default Screen;
