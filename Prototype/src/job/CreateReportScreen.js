import React from "react";
import { StyleSheet, Text } from "react-native";

import Screen from "../components/Screen";

/*
    status_id       text
    1               ok
    2               minor problem
    3               major problem
 */

function CreateReportScreen({ jobData, onPress, navigation }) {
    return (
        <Screen name="New Report" headerType="stack" navigation={navigation}>
            <Text>report screen here</Text>;
        </Screen>
    );
}

const styles = StyleSheet.create({});

export default CreateReportScreen;
