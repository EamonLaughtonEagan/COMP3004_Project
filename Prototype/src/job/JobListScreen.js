import React from "react";
import { FlatList, Text } from "react-native";

import { Cache, Jobs } from "../cache/Cache";
import Screen from "../components/Screen";
import common from "../config/common";
import routes from "../navigation/routes";
import JobItem from "./JobItem";

const { LoadableComponent } = require("../components/LoadableComponent");

class JobListScreen extends LoadableComponent {
    jobList = [];

    getJobs() {
        throw new Error("getJobs() must be implemented in subclass.");
    }

    load = (force = true) => {
        if (force || !Cache.fetchedRecently()) {
            if (!Jobs.fetchJobs()) {
                this.error = true;
                return false;
            }

            // Deep copy the array (not possible with native Array prototypes)
            this.jobList = this.getJobs();

            this.jobList
                // Sort jobs in order of time
                .sort((a, b) => {
                    const dA = new Date(a.job.start_time);
                    const dB = new Date(b.job.start_time);
                    const diff = Math.abs(dA - dB);
                    return diff > 0 ? -1 : 1;
                });

            return true;
        }
    };

    render() {
        if (this.error) {
            return <Text>An error occurred</Text>;
        }

        if (!this.loaded) {
            return <Text>Loading...</Text>;
        }

        return (
            <Screen
                title={"Jobs"}
                navigation={this.props.navigation}
                headerType={"drawer"}
            >
                <FlatList
                    data={this.jobList}
                    keyExtractor={(d) => d.job.job_id.toString()}
                    renderItem={({ item }) => (
                        <JobItem
                            jobData={item}
                            onPress={() => {
                                this.props.navigation.push(
                                    routes.JOB,
                                    item
                                );
                            }}
                        />
                    )}
                />
            </Screen>
        );
    }
}

/*  The only difference between these components is how they filter Cache.jobs[]
    See: async load() function in JobListScreen
* */
export class FutureJobList extends JobListScreen {
    getJobs() {
        const jobs = JSON.parse(JSON.stringify(Cache.jobs));
        for (let i = jobs.length - 1; i > -1; i--) {
            const jobDate = new Date(jobs[i].job.start_time);
            const now = Date.now();

            if (now - jobDate > -common.MILLIS_DAY) {
                jobs.splice(i, 1);
            }
        }

        return jobs;
    }
}

export class PastJobList extends JobListScreen {
    getJobs() {
        const jobs = JSON.parse(JSON.stringify(Cache.jobs));
        for (let i = jobs.length - 1; i > -1; i--) {
            const jobDate = new Date(jobs[i].job.start_time);
            const now = Date.now();

            if (jobDate - now > common.MILLIS_DAY) {
                jobs.splice(i, 1);
            }
        }

        return jobs;
    }
}
