import React from "react";
import { FlatList, StyleSheet } from "react-native";

import Screen from "../components/AppScreen";
import UserItem from "./UserItem";
//import routes from "../navigation/routes";

const datas = JSON.parse(
    '{"data":[{"user_id":2,"permission_id":4,"email":"trevori","first_name":"trevor","last_name":"incze","permission_name":"admin"},{"user_id":3,"permission_id":3,"email":"bob.d","first_name":"bob","last_name":"donut","permission_name":"supervisor"},{"user_id":4,"permission_id":3,"email":"jbat","first_name":"jordan","last_name":"battram","permission_name":"supervisor"},{"user_id":5,"permission_id":2,"email":"troy.tech","first_name":"troy","last_name":"smith","permission_name":"tech"}],"message":"All users successfully retrieved."}'
);

function UserItemScreen({ navigation }) {
    return (
        <Screen>
            <FlatList
                style={{
                    width: "100%",
                }}
                data={datas}
                keyExtractor={(d) => d.user_id.toString()}
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
