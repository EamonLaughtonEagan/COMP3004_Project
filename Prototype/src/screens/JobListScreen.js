import React from "react";
import { FlatList, StyleSheet } from "react-native";

import Screen from "../components/AppScreen";
import JobItem from "../components/JobItem";
import routes from "../navigation/routes";

const datas = [
    {
        id: 1,
        customer: "Stanley Summers",
        title: "Pool cleaning",
        subtitle: "in 30m",
        description:
            "Vacuum, skim leaves, brush scumline, and empty pump/skimmer baskets.\nBalance water, and take pictures of any issues that remain.",
        address: "82 Carrot Ln.",
        time: "9:30AM",
    },
    {
        id: 2,
        customer: "Olivia Pope",
        title: "Pump Replacement",
        subtitle: "in 2h",
        description:
            "Replace existing Hayward Super II with Pentair SuperFlo VS. Customer has qualified for a rebate, so take pictures of the pump nameplate and add them to the app.",
        address: "95 Banana Cr.",
        time: "11:00AM",
    },
    {
        id: 3,
        customer: "Lydia Brown",
        title: "Plumbing Leak Fix",
        subtitle: "in 2h30m",
        description:
            "Lydia did a bucket test and we know there is a leak in the plumbing somewhere.\nPressure test to find out which line the leak is in, then locate it with the acoustic listening device. Record the time spent in the app!",
        address: "912 Apple Dr.",
        time: "11:30AM",
    },
    {
        id: 4,
        customer: "Costco Wholesale",
        title: "Bulk Salt Pickup",
        subtitle: "in 4h30m",
        description:
            "Two skids of salt have been ordered and will be ready by 1:00PM\nGo to the loading bay office and ask for Purchase Order FN720031",
        address: "4315 Strandherd Dr",
        time: "1:30PM",
    },
    {
        id: 5,
        customer: "Patrick Romley",
        title: "Gold Pool Opening",
        subtitle: "in 5h30m",
        description:
            "Standard gold opening with tarp and water bags.\nCustomer requested a chemical opening kit",
        address: "12 Badger Crt.",
        time: "2:30PM",
    },
    {
        id: 6,
        customer: "Meredith Grey",
        title: "Sand Filter Change",
        subtitle: "in 7h30m",
        description:
            "Bring 250lbs filter sand\nReplace the laterals\nTheir pool is also green; check water chemistry add chemicals as necessary.",
        address: "772 Midnight Rd.",
        time: "4:30PM",
    },
];

function JobListScreen({ navigation }) {
    return (
        <Screen>
            <FlatList
                data={datas}
                keyExtractor={(d) => d.id.toString()}
                renderItem={({ item }) => (
                    <JobItem
                        title={item.title}
                        subtitle={item.subtitle}
                        description={item.description}
                        address={item.address}
                        time={item.time}
                        onPress={() => {
                            navigation.navigate(routes.JOB, item);
                        }}
                    />
                )}
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    screen: {
        paddingHorizontal: 10,
        paddingTop: 20,
    },
    background: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
});

export default JobListScreen;
