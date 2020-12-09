import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import common from "../config/common";

function AddJobButton({ onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                <MaterialCommunityIcons
                    name="plus-circle"
                    color={common.softGray}
                    size={40}
                />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: common.primary,
        borderColor: "white",
        borderRadius: 35,
        borderWidth: 10,
        bottom: 20,
        height: 70,
        justifyContent: "center",
        width: 70,
    },
});

export default AddJobButton;
