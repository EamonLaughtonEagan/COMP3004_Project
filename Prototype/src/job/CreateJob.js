import DateTimePicker from "@react-native-community/datetimepicker";
import React, {useState} from "react";
import {
    Text,
    View,
    StyleSheet,
    Keyboard,
    TextInput,
    Button,
} from "react-native";

import AppButton from "../components/AppButton";
import Screen from "../components/AppScreen";
import AppTextInput from "../components/AppTextInput";

function CreateJob({ route }) {
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState("date");
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === "ios");
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode("date");
    };

    const showTimepicker = () => {
        showMode("time");
    };

    return (
        <View>
            <View>
                <Button onPress={showDatepicker} title="Show date picker!" />
            </View>
            <View>
                <Button onPress={showTimepicker} title="Show time picker!" />
            </View>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour
                    display="default"
                    onChange={onChange}
                />
            )}
        </View>

        // <Screen>
        //     <View style={styles.textContainer}>
        //         <AppTextInput
        //             style={styles.inputField}
        //             placeholder="Name"
        //             autoCapitalize="none"
        //             onChangeText={(text) => {
        //                 form.name = text;
        //             }}
        //         />
        //         <AppTextInput
        //             style={styles.inputField}
        //             placeholder="Description"
        //             autoCapitalize="none"
        //             onChangeText={(text) => {
        //                 form.description = text;
        //             }}
        //         />
        //         <Text>Start Time</Text>
        //         <AppTextInput
        //             style={styles.inputField}
        //             placeholder="YYYY/MM/DD HH:MM"
        //             autoCapitalize="none"
        //             onChangeText={(text) => {
        //                 form.startTime = text;
        //             }}
        //         />
        //         <Text>End Time</Text>
        //         <AppTextInput
        //             style={styles.inputField}
        //             placeholder="YYYY/MM/DD HH:MM"
        //             autoCapitalize="none"
        //             onChangeText={(text) => {
        //                 form.endTime = text;
        //             }}
        //         />
        //     </View>
        //     <View style={styles.buttonContainer}>
        //         <AppButton
        //             title="Submit"
        //             onPress={() => {
        //                 Keyboard.dismiss();
        //
        //                 // TODO: Post request to server (Cache.postJob())
        //                 // TODO: Navigate back to screens + update cache jobs
        //                 console.log("Create job params:");
        //                 console.log(JSON.stringify(form));
        //             }}
        //         />
        //     </View>
        // </Screen>
    );
}

export default CreateJob;

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
