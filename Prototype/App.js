import "react-native-gesture-handler";
import React from "react";

import { Cache, Customers } from "./src/cache/Cache";
import WelcomeNavigator from "./src/navigation/WelcomeNavigator";

//const Stack = createStackNavigator();
// const StackNavigator = () => (
//     <NavigationContainer>
//         <Stack.Navigator>
//             <Stack.Screen
//                 name={routes.LOGIN}
//                 component={LoginScreen}
//                 options={{ title: "Login", headerShown: false }}
//             />
//             <Stack.Screen name={routes.JOB_LIST} component={JobListScreen} />
//         </Stack.Navigator>
//     </NavigationContainer>
// );

export default function App() {
    //    return (
    //        <Screen>
    //            <ReportList reports={dummyReports} />
    //        </Screen>
    //    );
    console.log("Initializing app...");
    Cache.initialize();

    console.log("Rendering app...");

    return <WelcomeNavigator />;
}
