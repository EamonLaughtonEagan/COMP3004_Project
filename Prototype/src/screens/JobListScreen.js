import React, { useState } from "react";
import { FlatList, Text } from "react-native";

import { fetchJobs } from "../cache/Cache";
import JobItem from "../components/JobItem";
import Screen from "../components/Screen";
import routes from "../navigation/routes";

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

    loadJobs = async () => {
        this.jobData = await fetchJobs();
        this.setState({ loaded: true });
    };

    async componentDidMount() {
        const start = new Date();

        await this.loadJobs();
        const end = new Date();
        console.log("Jobs loaded (" + (end - start) + "ms)");

        // Render the screen
        this.forceUpdate();
    }

    render() {
        if (!this.state.loaded) {
            return <Text>Loading...</Text>;
        }

        return (
            <Screen>
                <FlatList
                    data={this.jobData}
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
