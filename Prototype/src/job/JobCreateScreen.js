import React from "react";
import { Text, View, StyleSheet, Keyboard, TextInput } from "react-native";

import AppButton from "../components/AppButton";
import Screen from "../components/AppScreen";
import AppTextInput from "../components/AppTextInput";

function JobCreateScreen({ route }) {
    const form = {};
    return (
        <Screen>
            <View style={styles.textContainer}>
                <AppTextInput
                    style={styles.inputField}
                    placeholder="Name"
                    autoCapitalize="none"
                    onChangeText={(text) => {
                        form.name = text;
                    }}
                />
                <AppTextInput
                    style={styles.inputField}
                    placeholder="Description"
                    autoCapitalize="none"
                    onChangeText={(text) => {
                        form.description = text;
                    }}
                />
                <Text>Start Time</Text>
                <AppTextInput
                    style={styles.inputField}
                    placeholder="YYYY/MM/DD HH:MM"
                    autoCapitalize="none"
                    onChangeText={(text) => {
                        form.startTime = text;
                    }}
                />
                <Text>End Time</Text>
                <AppTextInput
                    style={styles.inputField}
                    placeholder="YYYY/MM/DD HH:MM"
                    autoCapitalize="none"
                    onChangeText={(text) => {
                        form.endTime = text;
                    }}
                />
            </View>
            <View style={styles.buttonContainer}>
                <AppButton
                    title="Submit"
                    onPress={() => {
                        Keyboard.dismiss();
                        // need to add navigation route

                        //JSON object
                        const json = JSON.stringify(form);
                        console.log(json);
                        //need to sned JSON obejct to server
                    }}
                />
            </View>
        </Screen>
    );
}

export default JobCreateScreen;

const styles = StyleSheet.create({
    textContainer: {
        marginTop: 50,
        marginLeft: 50,
        marginRight: 50,
    },
    buttonContainer: {
        marginTop: 10,
    },
    inputField: {
        width: "100%",
        textAlign: "center",
        margin: 0,
    },
});

//customer id, site_id, start time, end time, name, description
// add customer drop-down to display (name, email, phone, etc...)
