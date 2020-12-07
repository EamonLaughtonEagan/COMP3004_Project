import React from "react";
import { FlatList, Text } from "react-native";

import { Cache, Jobs } from "../cache/Cache";
import Screen from "../components/Screen";
import routes from "../navigation/routes";
import JobItem from "./JobItem";

class JobListScreen extends React.Component {
    jobData = [];
    navigation;

    constructor(props) {
        super(props);
        this.navigation = props.navigation;

        this.state = {
            loaded: false,
        };
    }

    refreshJobs(force = false) {
        if (force || Date.now() - Cache.lastFetch > 60000 * 5) {
            console.log("Refreshing job list...");
            this.state.loaded = false;

            Jobs.fetchJobs()
                .then(() => {
                    console.log("Done fetching jobs");

                    // Render the screen
                    this.setState({ loaded: true });
                    this.forceUpdate();

                    return Promise.resolve();
                })
                .catch((err) => {
                    this.setState({ error: true });
                    return Promise.reject(err);
                });
        } else {
            console.log(
                "Skipped fetch; jobs were loaded less than 5 minutes ago."
            );

            if (!this.state.loaded) {
                console.log("Skipped re-render; screen is already loaded");
                this.setState({ loaded: true });
                this.forceUpdate();
            }

            return Promise.resolve();
        }
    }

    async componentDidMount() {
        return this.refreshJobs(false);
    }

    render() {
        if (!this.state.loaded) {
            return <Text>Loading...</Text>;
        }

        return (
            <Screen>
                <FlatList
                    data={Cache.jobs}
                    keyExtractor={(d) => d.job.job_id.toString()}
                    renderItem={({ item }) => (
                        <JobItem
                            jobData={item}
                            onPress={() => {
                                this.navigation.navigate(routes.JOB, item);
                            }}
                        />
                    )}
                />
            </Screen>
        );
    }
}

export default JobListScreen;
