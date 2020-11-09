import "react-native-gesture-handler";
import NavigationContainer from "@react-navigation/native/src/NavigationContainer";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import HomeNavigator from "./src/navigation/HomeNavigator";
import routes from "./src/navigation/routes";
import JobListScreen from "./src/screens/JobListScreen";
import LoginScreen from "./src/screens/LoginScreen";

const Stack = createStackNavigator();
const StackNavigator = () => (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen
                name={routes.LOGIN}
                component={LoginScreen}
                options={{ title: "Login", headerShown: false }}
            />
            <Stack.Screen name={routes.JOB_LIST} component={JobListScreen} />
        </Stack.Navigator>
    </NavigationContainer>
);

export default function App() {
    return (
        <NavigationContainer>
            <HomeNavigator />
        </NavigationContainer>
    );
}
