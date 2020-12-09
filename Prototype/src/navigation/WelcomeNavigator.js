import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import NavigationContainer from "@react-navigation/native/src/NavigationContainer";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Text, View } from "react-native";

import common from "../config/common";
import CreateJobButton from "../job/CreateJobButton";
import CreateJobScreen from "../job/CreateJobScreen";
import CreateReportScreen from "../job/CreateReportScreen";
import { FutureJobList, PastJobList } from "../job/JobListScreen";
import JobScreen from "../job/JobScreen";
import AccountScreen from "../screens/AccountScreen";
import LoginScreen from "../screens/LoginScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import routes from "./routes";

const Stack = createStackNavigator();

// const WelcomeNavigator = () => (
//     <NavigationContainer>
//         <Stack.Navigator>
//             <Stack.Screen
//                 name={"test"}
//                 headerType={"pop"}
//             />
//         </Stack.Navigator>
//     </NavigationContainer>
// );

const DrawerNavigator = () => (
    <Drawer.Navigator initialRouteName={routes.JOBS}>
        <Drawer.Screen name={routes.ACCOUNT} component={AccountScreen} />
        <Drawer.Screen name={routes.JOBS} component={BottomTabNav} />
    </Drawer.Navigator>
);

const WelcomeNavigator = () => (
    <NavigationContainer>
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                gestureEnabled: false,
            }}
        >
            <Stack.Screen name={routes.WELCOME} component={WelcomeScreen} />
            <Stack.Screen name={routes.LOGIN} component={LoginScreen} />
            <Stack.Screen name={routes.JOBS} component={DrawerNavigator} />
        </Stack.Navigator>
    </NavigationContainer>
);

const Tab = createBottomTabNavigator();
const JStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const FutureJobListNavigator = () => {
    return (
        <JStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <JStack.Screen
                name={routes.FUTURE_JOBS}
                component={FutureJobList}
            />
            <JStack.Screen name={routes.JOB} component={JobScreen} />
            <JStack.Screen
                name={routes.CREATE_REPORT}
                component={CreateReportScreen}
            />
        </JStack.Navigator>
    );
};

const PastJobListNavigator = () => {
    return (
        <JStack.Navigator
            screenOptions={{
                headerTitleAlign: "center",
                headerShown: false,
                headerTintColor: "dodgerblue",
            }}
        >
            <JStack.Screen name={routes.PAST_JOBS} component={PastJobList} />
            <JStack.Screen name={routes.JOB} component={JobScreen} />
            <JStack.Screen
                name={routes.CREATE_REPORT}
                component={CreateReportScreen}
            />
        </JStack.Navigator>
    );
};

const BottomTabNav = () => (
    <Tab.Navigator
        tabBarOptions={{
            activeBackgroundColor: "dodgerblue",
            activeTintColor: "black",
            inactiveBackgroundColor: "#eee",
            inactiveTintColor: "black",
        }}
    >
        <Tab.Screen
            name={routes.FUTURE_JOBS}
            component={FutureJobListNavigator}
            options={{
                tabBarIcon: ({ size, color }) => (
                    <MaterialCommunityIcons
                        name="format-list-bulleted-square"
                        size={size}
                        color={color}
                    />
                ),
                titleFontSize: 1,
            }}
        />
        <Tab.Screen
            name={routes.CREATE_JOB}
            component={CreateJobScreen}
            options={({ navigation }) => ({
                tabBarButton: () => (
                    <CreateJobButton
                        onPress={() => navigation.navigate(routes.CREATE_JOB)}
                    />
                ),
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons
                        name="plus-circle"
                        color={color}
                        size={size}
                    />
                ),
            })}
        />
        <Tab.Screen
            name={routes.PAST_JOBS}
            component={PastJobListNavigator}
            options={{
                tabBarIcon: ({ size, color }) => (
                    <MaterialCommunityIcons
                        name="account"
                        size={size}
                        color={color}
                    />
                ),
                titleFontSize: 1,
            }}
        />
    </Tab.Navigator>
);

export default WelcomeNavigator;
