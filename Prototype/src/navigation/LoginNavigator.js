import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import LoginScreen from "../screens/LoginScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import routes from "./routes";

const Stack = createStackNavigator();

const LoginNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen name={routes.JOB_LIST} component={LoginScreen} />
        <Stack.Screen name={routes.JOB} component={WelcomeScreen} />
    </Stack.Navigator>
);

export default LoginNavigator;
