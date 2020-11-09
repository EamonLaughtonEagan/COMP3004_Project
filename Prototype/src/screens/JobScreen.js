import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { Text, View, StyleSheet, TouchableWithoutFeedback } from "react-native";

import Screen from "../components/AppScreen";

function JobScreen({ route }) {
    const job = route.params;
    return (
        <Screen>
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title} numberOfLines={1}>
                        {job.title}
                    </Text>
                    <Text style={styles.time}>{job.time}</Text>
                </View>
                <Text style={styles.customerName}>{job.customer}</Text>
                <View style={styles.detailsContainer}>
                    <Text style={styles.details} numberOfLines={10}>
                        {job.description}
                    </Text>
                </View>
                <View style={styles.footer}>
                    <FontAwesome5
                        name="map-marker-alt"
                        size={24}
                        color="dodgerblue"
                    />
                    <Text style={styles.address}>{job.address}</Text>
                    <Text style={styles.subTitle}>{job.subTitle}</Text>
                </View>
            </View>
        </Screen>
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
        borderRadius: 5,
        paddingVertical: 20,
        paddingHorizontal: 15,
    },
    customerName: {
        color: "grey",
        fontSize: 20,
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

export default JobScreen;
