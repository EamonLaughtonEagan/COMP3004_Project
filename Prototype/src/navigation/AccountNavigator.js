import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import AccountScreen from "../screens/AccountScreen";
import routes from "./routes";

const Stack = createStackNavigator();
const AccountNavigator = () => (
    <Stack.Navigator
        screenOptions={{ headerTitleAlign: "center", headerShown: true }}
    >
        <Stack.Screen name={routes.ACCOUNT} component={AccountScreen} />
    </Stack.Navigator>
);

export default AccountNavigator;
