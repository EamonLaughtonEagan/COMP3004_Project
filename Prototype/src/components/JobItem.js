import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { View, StyleSheet, Text, TouchableWithoutFeedback } from "react-native";

import colors from "../config/colors";

function JobItem({ title, subtitle, description, address, time, onPress }) {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <View style={{ flexDirection: "row" }}>
                        <MaterialCommunityIcons
                            name="clock-outline"
                            size={24}
                            color={colors.secondary}
                            style={{
                                flexDirection: "column",
                                alignSelf: "center",
                                margin: 5,
                            }}
                        />
                        <Text style={styles.time}>{time}</Text>
                    </View>
                    <Text style={styles.subtitle} numberOfLines={1}>
                        {subtitle}
                    </Text>
                </View>
                <Text style={styles.title} numberOfLines={2}>
                    {title}
                </Text>
                <Text style={styles.details} numberOfLines={3}>
                    {description}
                </Text>

                <View style={styles.footer}>
                    <View style={{ flexDirection: "row" }}>
                        <MaterialCommunityIcons
                            name="map-marker-radius"
                            size={24}
                            color="dodgerblue"
                        />
                        <Text style={styles.address}>{address}</Text>
                        <MaterialCommunityIcons
                            name="arrow-top-right-thick"
                            size={12}
                            color="grey"
                        />
                    </View>
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
        marginLeft: 5,
    },
    container: {
        overflow: "hidden",
        justifyContent: "space-between",
        borderColor: colors.softGray,
        borderTopWidth: 1,
        paddingBottom: 20,
        paddingHorizontal: 15,
    },
    details: {
        fontSize: 20,
        marginLeft: 15,
    },
    footer: {
        marginTop: 20,
        padding: 5,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    image: {
        width: "100%",
        height: 200,
    },
    subtitle: {
        alignSelf: "flex-end",
        textAlignVertical: "bottom",
        textAlign: "right",
        fontSize: 15,
        color: "black",
    },
    time: {
        fontSize: 25,
        textAlign: "left",
        textAlignVertical: "center",
        marginVertical: 10,
    },
    title: {
        marginLeft: 5,
        flex: 3,
        fontSize: 20,
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
