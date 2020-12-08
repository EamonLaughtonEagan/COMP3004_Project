import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
    FlatList,
    Text,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
} from "react-native";

import common from "../config/common";
import routes from "../navigation/routes";
import { createReportIcon, getReportStatusText } from "./JobHelper";

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

export function ReportList({ reports, navigation }) {
    if (!reports || reports.length === 0) {
        return <Text>No reports. Click here to add.</Text>;
    }

    // This sorts reports in order of most to least severe.
    // Problematic reports are at the top and are easier to see
    reports.sort((a, b) => {
        return b.status_id - a.status_id;
    });

    return (
        <View style={styles.reportListContainer}>
            <FlatList
                data={reports}
                keyExtractor={(item) => item.report_id.toString()}
                renderItem={({ item }) => <ReportItem report={item} />}
            />
            <View
                style={{
                    height: 20,
                }}
            />
            <TouchableWithoutFeedback
                style={{
                    backgroundColor: common.softGray,
                    flex: 1,
                    borderWidth: 5,
                    borderColor: "black",
                    flexDirection: "column",
                }}
                onPress={() => {
                    navigation.push(routes.CREATE_REPORT, {
                        reports,
                    });
                }}
            >
                <View
                    style={{
                        alignItems: "center",
                        flexDirection: "row",
                    }}
                >
                    <MaterialCommunityIcons
                        name="plus"
                        size={24}
                        color="black"
                    />
                    <Text>Add report</Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}

// Might as well style this in the same file

function ReportItem({ report }) {
    return (
        <View style={styles.reportContainer}>
            <View style={styles.titleContainer}>
                <View style={styles.iconContainer}>
                    {createReportIcon(report)}
                </View>
                <Text style={styles.text}>
                    {getReportStatusText(report.status_id, styles.statusText)}
                </Text>
            </View>
            <Text style={styles.reportText}>{report.text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    statusText: {
        color: "tomato",
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    reportContainer: {
        marginVertical: 2,
        justifyContent: "flex-start",
        borderTopWidth: 2,
        borderColor: common.softGray,
    },
    reportListContainer: {
        flex: 1,
    },
    reportText: {
        marginLeft: 34,
        color: common.gray,
    },
    iconContainer: {},
});
