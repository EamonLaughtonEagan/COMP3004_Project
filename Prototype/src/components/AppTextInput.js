import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

import common from "../config/common";

function AppTextInput({ icon, ...otherProps }) {
    return (
        <View style={styles.container}>
            {icon && (
                <MaterialCommunityIcons
                    name={icon}
                    size={20}
                    color={common.black}
                    style={styles.icon}
                />
            )}
            <TextInput
                placeholderTextColor={common.softGray}
                style={styles.input}
                {...otherProps}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "stretch",
        width: "100%",
        marginVertical: 10,
        borderColor: common.softGray, // Slightly transparent
        borderBottomWidth: 1,
        borderTopWidth: 1,
    },
    input: {
        width: "100%", // Otherwise hard to click on some devices
        height: 44,
    },
    icon: {
        alignSelf: "center",
        margin: 5,
        marginRight: 10,
    },
});

export default AppTextInput;
