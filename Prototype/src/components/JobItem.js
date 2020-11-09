import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { View, StyleSheet, Text, TouchableWithoutFeedback } from "react-native";

function JobItem({ title, subTitle, description, address, time, onPress }) {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title} numberOfLines={1}>
                        {title}
                    </Text>
                    <Text style={styles.time}>{time}</Text>
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.details} numberOfLines={3}>
                        {description}
                    </Text>
                </View>
                <View style={styles.footer}>
                    <FontAwesome5
                        name="map-marker-alt"
                        size={24}
                        color="dodgerblue"
                    />
                    <Text style={styles.address}>{address}</Text>
                    <Text style={styles.subTitle}>{subTitle}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    address: {
        color: "dodgerblue",
        fontWeight: "bold",
        textDecorationLine: "underline",
        fontSize: 20,
        marginHorizontal: 5,
    },
    container: {
        marginBottom: 20,
        overflow: "hidden",
        justifyContent: "space-between",
        borderColor: "dodgerblue",
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical: 20,
        paddingHorizontal: 15,
    },
    details: {
        fontSize: 20,
    },
    detailsContainer: {
        margin: 10,
    },
    footer: {
        padding: 5,
        borderTopWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    image: {
        width: "100%",
        height: 200,
    },
    subTitle: {
        textAlign: "right",
        fontSize: 15,
        flex: 1,
        color: "black",
    },
    time: {
        fontSize: 18,
    },
    title: {
        fontSize: 25,
        fontWeight: "bold",
    },
    titleContainer: {
        borderBottomWidth: 2,
        borderBottomColor: "grey",
        flexDirection: "row",
        justifyContent: "space-between",
    },
});

export default JobItem;
