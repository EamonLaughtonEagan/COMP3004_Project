import React from "react";
import { View, StyleSheet, Text, TouchableWithoutFeedback } from "react-native";

import colors from "../config/colors";

function UserItem({ email, first_name, last_name, permission_name, onPress }) {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.first_name}>{first_name}</Text>
                    <Text style={styles.last_name}>{last_name}</Text>
                </View>
                <Text style={styles.email} numberOfLines={1}>
                    {email}
                </Text>
                <Text style={styles.permission_name} numberOfLines={1}>
                    {permission_name}
                </Text>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        overflow: "hidden",
        justifyContent: "space-between",
        borderColor: colors.softGray,
        borderTopWidth: 1,
        paddingBottom: 20,
        paddingHorizontal: 15,
    },
    email: {
        fontSize: 20,
        marginLeft: 15,
    },
    first_name: {
        fontSize: 25,
        textAlign: "left",
        textAlignVertical: "center",
        marginVertical: 10,
        paddingRight: 5,
    },
    last_name: {
        fontSize: 25,
        textAlign: "left",
        textAlignVertical: "center",
        marginVertical: 10,
    },
    permission_name: {
        fontSize: 20,
        marginLeft: 15,
    },
    titleContainer: {
        borderBottomWidth: 2,
        borderBottomColor: "grey",
        flexDirection: "row",
    },
});

export default UserItem;
