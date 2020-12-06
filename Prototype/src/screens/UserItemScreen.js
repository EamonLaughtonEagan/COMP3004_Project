import React from "react";
import { FlatList, StyleSheet } from "react-native";

import Screen from "../components/AppScreen";
import UserItem from "../components/UserItem";
//import routes from "../navigation/routes";

const datas = [
    {
        id: 1,
        first_name: "Chris",
        last_name: "Green",
        email: "christlg@rogers.com",
        permission_name: "Supervisor",
    },
    {
        id: 2,
        first_name: "Dummy",
        last_name: "Info",
        email: "christlg@rogers.com",
        permission_name: "Supervisor",
    },
    {
        id: 3,
        first_name: "Happy",
        last_name: "Birthday",
        email: "christlg@rogers.com",
        permission_name: "Supervisor",
    },
    {
        id: 4,
        first_name: "Eamon",
        last_name: "Red",
        email: "eemstar@rogers.com",
        permission_name: "Guest",
    },
    {
        id: 5,
        first_name: "Noura",
        last_name: "Green",
        email: "nono@rogers.com",
        permission_name: "Supervisor",
    },
    {
        id: 6,
        first_name: "Trevor",
        last_name: "Blue",
        email: "trevg@rogers.com",
        permission_name: "Tech",
    },
];

function UserItemScreen({ navigation }) {
    return (
        <Screen>
            <FlatList
                data={datas}
                keyExtractor={(d) => d.id.toString()}
                renderItem={({ item }) => (
                    <UserItem
                        first_name={item.first_name}
                        last_name={item.last_name}
                        email={item.email}
                        permission_name={item.permission_name}
                    />
                )}
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    screen: {
        paddingHorizontal: 10,
        paddingTop: 20,
    },
    background: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
});

export default UserItemScreen;
