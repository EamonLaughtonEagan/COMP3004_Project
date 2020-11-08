import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import navigationTheme from "./src/nav/navigationTheme";
import AppNavigator from "./src/nav/AppNavigator";

export default function App() {
    return (
        <NavigationContainer theme={navigationTheme}>
            <AppNavigator />
        </NavigationContainer>
    );
}
