import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import NavigationContainer from "@react-navigation/native/src/NavigationContainer";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Text, View } from "react-native";

import AddJobButton from "../job/AddJobButton";
import CreateJob from "../job/CreateJob";
import CreateReport from "../job/CreateReport";
import { FutureJobList, PastJobList } from "../job/JobListScreen";
import JobScreen from "../job/JobScreen";
import AccountScreen from "../screens/AccountScreen";
import LoginScreen from "../screens/LoginScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import routes from "./routes";

const Stack = createStackNavigator();

const WelcomeNavigator = () => (
    <NavigationContainer>
        <Drawer.Navigator
            initialRouteName={routes.WELCOME}
        >
            <Drawer.Screen name={routes.ACCOUNT} component={AccountScreen} />
            <Drawer.Screen name={routes.JOBS} component={BottomTabNav}/>
        </Drawer.Navigator>
    </NavigationContainer>
);

const Tab = createBottomTabNavigator();
const JStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerTest = () => (
    <View>
        <Text>fjdkslfjdksljfkdls</Text>
    </View>
);

const SideBarScreen = () => (
    <View>
        <Text>Side bar item 1</Text>
        <Text>Side bar item 2</Text>
        <Text>Side bar item 3</Text>
    </View>
);

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
                component={CreateReport}
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
                component={CreateReport}
            />
        </JStack.Navigator>
    );
};

const BottomTabNav = () => (
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
            component={CreateJob}
            options={({ navigation }) => ({
                tabBarButton: () => (
                    <AddJobButton
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
