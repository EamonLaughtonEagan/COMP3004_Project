import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Text, View, StyleSheet } from "react-native";

import Screen from "../components/AppScreen";

/*
    Known issue:
    When the title is too long, all alignment gets thrown off.
    TODO: Fix this
 */

function JobScreen({ route }) {
    const job = route.params;
    return (
        <Screen>
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <View>
                        <Text style={styles.title} numberOfLines={2}>
                            {job.title}
                        </Text>
                        <Text style={styles.soft}>{job.customer}</Text>
                        <Text style={styles.soft}>{job.address}</Text>
                    </View>
                    <View style={styles.timeContainer}>
                        <Text style={styles.soft}>{job.subtitle}</Text>
                    </View>
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.details} numberOfLines={10}>
                        {job.description}
                    </Text>
                </View>
                <View style={styles.footer}>
                    <MaterialCommunityIcons
                        name="alert-circle-outline"
                        size={24}
                        color="tomato"
                        style={{
                            margin: 5,
                            flexDirection: "column",
                            alignSelf: "center",
                        }}
                    />
                    <Text
                        style={{
                            textAlignVertical: "center",
                            color: "tomato",
                        }}
                    >
                        Report job problem
                    </Text>
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
    soft: {
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
        justifyContent: "flex-end",
    },
    image: {
        width: "100%",
        height: 200,
    },
    subTitle: {
        fontSize: 15,
        color: "black",
    },
    time: {
        fontSize: 18,
    },
    timeContainer: {
        flexDirection: "column",
        justifyContent: "flex-end",
    },
    title: {
        fontSize: 25,
        fontWeight: "bold",
        marginVertical: 10,
    },
    titleContainer: {
        borderBottomWidth: 1,
        borderBottomColor: "grey",
        flexDirection: "row",
        justifyContent: "space-between",
    },
});

export default JobScreen;
