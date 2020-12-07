import "react-native-gesture-handler";
import React from "react";

import { ReportList } from "./src/job/ReportList";
import WelcomeNavigator from "./src/navigation/WelcomeNavigator";
import Screen from "./src/components/Screen";
import {Text} from "react-native";

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

const dummyReports = [
    {
        report_id: 4,
        user_id: 2,
        job_id: 1,
        status_id: 2,
        text: "Dummy report text here",
    },
    {
        report_id: 5,
        user_id: 2,
        job_id: 1,
        status_id: 1,
        text: "Other dummy report text",
    },
];

export default function App() {
 //    return (
 //        <Screen>
 //            <ReportList reports={dummyReports} />
 //        </Screen>
 //    );
    return <WelcomeNavigator />;
}
