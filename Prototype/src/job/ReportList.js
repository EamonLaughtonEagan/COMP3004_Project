import CollapsibleView from "@eliav2/react-native-collapsible-view";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { FlatList, Text, View, StyleSheet } from "react-native";

import colors from "../config/colors";
import { getReportIcon, getReportStatusText } from "./JobHelper";

/*
TODO: Collapsible view might be useful somewhere, but I can't figure out how to style the title to not be centered

<CollapsibleView
    noArrow
    title={
        <View
            style={{
                alignSelf: "flex-start",
                alignItems: "flex-start",
                flexDirection: "row",
            }}
        >
            <Text>test title</Text>
        </View>
    }
    titleStyle ={{
        flexDirection: "row",
        justifyContent: "flex-start",
    }}
>
    <Text>hidden text</Text>
</CollapsibleView>

Also here's the old code for the circled alert (exclamation mark):
                <MaterialCommunityIcons
                    name="alert-circle-outline"
                    size={24}
                    color="tomato"
                    style={{
                        margin: 5,
                        flexDirection: "column",
                        alignSelf: "center",
                    }}
                </>


 */

export function ReportList({ reports }) {
    if (!reports || reports.length === 0) {
        return <Text>No reports. Click here to add.</Text>;
    }

    reports.sort((a, b) => {
        return a.status_id - b.status_id;
    });

    return (
        <View style={styles.reportsContainer}>
            <FlatList
                data={reports}
                keyExtractor={(item, index) => item.report_id.toString()}
                renderItem={({ item }) => <ReportItem report={item} />}
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
    );
}

// Might as well style this in the same file

function ReportItem({ report }) {
    return (
        <View style={styles.itemContainer}>
            <View style={styles.iconContainer}>{getReportIcon(report)}</View>
            <Text style={styles.text}>
                {getReportStatusText(report.status_id)}
            </Text>
            <Text style={styles.text}>{report.text}</Text>
        </View>
    );

}

const styles = StyleSheet.create({
    text: {
        color: "black",
    },
    itemContainer: {
        justifyContent: "flex-start",
        borderWidth: 1,
        margin: 0,
    },
    reportsContainer: {
        //padding: 5,
        borderTopWidth: 1,
        //justifyContent: "flex-start",
        //flex: 1,
    },
    statusText: {
        color: "tomato"
    },
    iconContainer: {},
});
