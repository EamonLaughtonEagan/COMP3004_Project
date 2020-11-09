import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import AccountScreen from "../screens/AccountScreen";
import JobListNavigator from "./JobListNavigator";
import routes from "./routes";

const Tab = createBottomTabNavigator();

const HomeNavigator = () => (
    <Tab.Navigator
        tabBarOptions={{
            activeBackgroundColor: "dodgerblue",
            activeTintColor: "white",
            inactiveBackgroundColor: "#eee",
            inactiveTintColor: "black",
        }}
    >
        <Tab.Screen
            name={routes.JOB_LIST}
            component={JobListNavigator}
            options={{
                tabBarIcon: ({ size }) => (
                    <MaterialCommunityIcons name="atom" size={size} />
                ),
            }}
        />
        <Tab.Screen
            name="Account"
            component={AccountScreen}
            options={{
                tabBarIcon: ({ size }) => (
                    <MaterialCommunityIcons name="account" size={size} />
                ),
            }}
        />
    </Tab.Navigator>
);

export default HomeNavigator;
