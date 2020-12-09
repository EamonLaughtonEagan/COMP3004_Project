import DateTimePicker from "@react-native-community/datetimepicker";
import React from "react";
import { Text, View, StyleSheet, Keyboard, Picker, Button } from "react-native";
import PickerModal from "react-native-picker-modal-view";

import { Customers, Jobs } from "../cache/Cache";
import AppButton from "../components/AppButton";
import AppTextInput from "../components/AppTextInput";
import Screen from "../components/Screen";
import common from "../config/common";

class CreateJobScreen extends React.Component {
    navigation;
    route;

    items = [];
    constructor(props) {
        super(props);
        this.navigation = props.navigation;
        this.routes = props.route;

        /*
        "[{Id, Name, Value, [key: string]: any}]"
         */

        const customers = JSON.parse(JSON.stringify(Customers.getCustomers()));
        customers.forEach((customer) => {
            this.items.push({
                Id: customer.customer_id.toString(),
                Name: customer.first_name
                    .concat(" ")
                    .concat(customer.last_name),
                Value: customer.customer_id,
            });
        });

        this.state = {
            selectedCustomer: {},
        };
    }

    form = {};

    render() {
        const displaySelection = this.state.selectedCustomer.Id ? (
            <Text>{this.state.selectedCustomer.Name} selected.</Text>
        ) : null;

        const getTimeStr = (date) => {
            return date.toISOString().slice(0, 19).replace("T", " ");
        };

        let dateNow = new Date();
        dateNow.setHours(dateNow.getHours() + 1);
        const strTimeNow = getTimeStr(dateNow);

        dateNow = new Date();
        dateNow.setHours(dateNow.getHours() + 2);
        const strTimeLater = getTimeStr(dateNow);

        this.form.start_time = strTimeNow;
        this.form.end_time = strTimeLater;

        return (
            <Screen
                title="New Job"
                headerType="stack"
                navigation={this.navigation}
            >
                <View style={styles.textContainer}>
                    <AppTextInput
                        style={styles.inputField}
                        placeholder="Enter job name..."
                        autoCapitalize="none"
                        onChangeText={(text) => {
                            this.form.name = text;
                        }}
                    />
                    <AppTextInput
                        style={styles.inputField}
                        placeholder="Enter description..."
                        autoCapitalize="none"
                        onChangeText={(text) => {
                            this.form.description = text;
                        }}
                    />
                    <Text>Start Time</Text>
                    <AppTextInput
                        style={styles.inputField}
                        defaultValue={strTimeNow}
                        autoCapitalize="none"
                        onChangeText={(text) => {
                            this.form.startTime = text;
                        }}
                    />
                    <Text>End Time</Text>
                    <AppTextInput
                        style={styles.inputField}
                        defaultValue={strTimeLater}
                        autoCapitalize="none"
                        onChangeText={(text) => {
                            this.form.endTime = text;
                        }}
                    />
                    <PickerModal
                        renderSelectView={(disabled, selected, showModal) => (
                            <View>
                                <AppButton
                                    title="Select customer"
                                    onPress={showModal}
                                    style={{
                                        alignSelf: "flex-start",
                                    }}
                                />
                                {displaySelection}
                            </View>
                        )}
                        onSelected={(selected) => {
                            console.log("selected " + selected.Value);
                            this.setState({
                                selectedCustomer: selected,
                            });

                            return selected;
                        }}
                        onClosed={() => {
                            console.log("closed");
                        }}
                        items={this.items}
                        onEndReached={() => {}}
                        sortingLanguage="tr"
                        showToTopButton
                        selected={this.items[1]}
                        selectPlaceholderText="Choose one..."
                        searchPlaceholderText="Find a customer..."
                        requireSelection
                        autoSort={false}
                    />
                    <View
                        style={{
                            padding: 10,
                            alignItems: "center",
                            backgroundColor: "#ddd",
                        }}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <AppButton
                        title="Submit"
                        onPress={() => {
                            Keyboard.dismiss();

                            // TODO: Post request to server (Cache.postJob())
                            // TODO: Navigate back to screens + update cache jobs

                            const job = {
                                customer_id: this.state.selectedCustomer.Id,
                                start_time: this.form.start_time,
                                end_time: this.form.end_time,
                                name: this.form.name,
                                description: this.form.description,
                            };

                            console.log("Create job params:");
                            console.log(JSON.stringify(job));

                            Jobs.postJob(job);
                        }}
                    />
                </View>
            </Screen>
        );
    }

    onClosed() {
        console.log("close key pressed");
    }

    onBackButtonPressed() {
        console.log("back key pressed");
    }
}

export default CreateJobScreen;

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
