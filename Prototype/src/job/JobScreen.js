import React from "react";
import { Text, View, StyleSheet } from "react-native";

import Screen from "../components/AppScreen";
import { timeShortRelativeNow } from "./JobHelper";
import { ReportList } from "./ReportList";

/*
    Known issue:
    When the title is too long, all alignment gets thrown off.
    TODO: Fix this
 */

const dummyReports = [
    {
        report_id: 4,
        user_id: 2,
        job_id: 1,
        status_id: 2,
        text:
            "This is a dummy report, created in JobScreen.js. This report has a status id of 2, which flags it as a minor problem.",
    },
    {
        report_id: 5,
        user_id: 2,
        job_id: 1,
        status_id: 1,
        text:
            "This is a second dummy report. This report's status id is 1, which means OK!",
    },
    {
        report_id: 6,
        user_id: 2,
        job_id: 1,
        status_id: 3,
        text:
            "This is a report with a major problem. The icons are rendered with JobHelper.getReportIcon(getWorstReport())",
    },
];

function JobScreen({ route }) {
    const jobData = route.params;
    const job = jobData.job;
    const customer = jobData.customer;
    const site = jobData.site;
    // TODO: Once reports are styled, use this to render reports
    // const reports = job.reports;

    return (
        <Screen>
            <View style={styles.container}>
                {/*Title container*/}
                <View style={styles.titleContainer}>
                    <View>
                        <Text style={styles.title} numberOfLines={2}>
                            {job.title}
                        </Text>
                        <Text style={styles.soft}>
                            {customer.first_name} {customer.last_name}
                        </Text>
                        <Text style={styles.soft}>{site.address}</Text>
                    </View>
                    <View style={styles.timeContainer}>
                        <Text style={styles.soft}>
                            {timeShortRelativeNow(job.start_time)}
                        </Text>
                    </View>
                </View>

                {/* Details container */}
                <View style={styles.detailsContainer}>
                    <Text style={styles.details} numberOfLines={10}>
                        {job.description}
                    </Text>
                </View>

                {/* Footer container */}

                <ReportList reports={dummyReports} />
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
