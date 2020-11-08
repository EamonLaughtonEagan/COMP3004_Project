import "react-native-gesture-handler";
import NavigationContainer from "@react-navigation/native/src/NavigationContainer";
import { createStackNavigator } from "@react-navigation/stack";
import * as Font from "expo-font";
import React from "react";

import routes from "./src/navigation/routes";
import JobScreen from "./src/screens/JobScreen";
import LoginScreen from "./src/screens/LoginScreen";

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name={routes.LOGIN}
                    component={LoginScreen}
                    options={{ title: "Login" }}
                />
                <Stack.Screen name={routes.JOBS} component={JobScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
