import "react-native-gesture-handler";
import React from "react";

import { Cache} from "./src/cache/Cache";
import WelcomeNavigator from "./src/navigation/WelcomeNavigator";

export default function App() {
    console.log("Initializing app...");
    Cache.fetchAll();
    console.log("Rendering app...");

    return <WelcomeNavigator />;
}
