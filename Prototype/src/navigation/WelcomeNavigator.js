import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import NavigationContainer from "@react-navigation/native/src/NavigationContainer";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { FutureJobList, PastJobList } from "../job/JobListScreen";
import AccountScreen from "../screens/AccountScreen";
import LoginScreen from "../screens/LoginScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import routes from "./routes";

const Stack = createStackNavigator();

const WelcomeNavigator = () => (
    <NavigationContainer>
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name={routes.WELCOME} component={WelcomeScreen} />
            <Stack.Screen name={routes.LOGIN} component={LoginScreen} />
            <Stack.Screen name={routes.HOME} component={TabNavigator} />
        </Stack.Navigator>
    </NavigationContainer>
);

const Tab = createBottomTabNavigator();
const JobsTab = createMaterialTopTabNavigator();

const JobListNavigator = () => (
    <JobsTab.Navigator>
        <Stack.Screen name={routes.FUTURE_JOBS} component={FutureJobList} />
        <Stack.Screen name={routes.PAST_JOBS} component={PastJobList} />
    </JobsTab.Navigator>

    // <Stack.Navigator
    //     screenOptions={{
    //         headerTitleAlign: "center",
    //         headerShown: false,
    //         headerTintColor: "dodgerblue",
    //     }}
    // >
    //     <Stack.Screen options = {{}} name={routes.JOB_LIST} component={JobListScreen} />
    //     <Stack.Screen name={routes.JOB} component={JobScreen} />
    //     <Stack.Screen name={routes.CREATE_REPORT} component={CreateReport} />
    // </Stack.Navigator>
);

const TabNavigator = () => (
    <Tab.Navigator
        tabBarOptions={{
            activeBackgroundColor: "dodgerblue",
            activeTintColor: "white",
            inactiveBackgroundColor: "#eee",
            inactiveTintColor: "black",
        }}
    >
        <Tab.Screen
            name={routes.FUTURE_JOBS}
            component={JobListNavigator}
            options={{
                tabBarIcon: ({ size }) => (
                    <MaterialCommunityIcons
                        name="format-list-bulleted-square"
                        size={size}
                    />
                ),
            }}
        />
        <Tab.Screen
            name={routes.ACCOUNT}
            component={AccountScreen}
            options={{
                tabBarIcon: ({ size }) => (
                    <MaterialCommunityIcons name="account" size={size} />
                ),
            }}
        />
    </Tab.Navigator>
);

export default WelcomeNavigator;
