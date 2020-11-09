import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import JobListScreen from "../screens/JobListScreen";
import LoginScreen from "../screens/LoginScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import HomeNavigator from "./HomeNavigator";
import routes from "./routes";

const Stack = createStackNavigator();

const WelcomeNavigator = () => (
    <Stack.Navigator
        screenOptions={{
            headerShown: false,
        }}
    >
        <Stack.Screen name={routes.WELCOME} component={WelcomeScreen} />
        <Stack.Screen name={routes.LOGIN} component={LoginScreen} />
        <Stack.Screen name={routes.HOME} component={HomeNavigator} />
    </Stack.Navigator>
);

export default WelcomeNavigator;
