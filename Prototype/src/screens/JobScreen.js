import React from "react";
import { FlatList, StyleSheet } from "react-native";

import Screen from "../components/AppScreen";
import JobCard from "../components/JobCard";

const cardImage = require("../assets/chair.jpg");
const logo = require("../assets/logo.png");

const datas = [
    {
        id: 1,
        title: "Pool cleaning",
        subtitle: "In 30m",
        description:
            "Vacuum floor, brush scumline, and skim leaves.\nRecord levels and balance water.",
        address: "82 Carrot Ln.",
        time: "9:30AM",
    },
    {
        id: 2,
        title: "Pump Replacement",
        subtitle: "In 2h",
        description:
            "Replace existing Hayward Super II with Pentair SuperFlo VS. Customer has qualified for a rebate, so take pictures and bring the old pump back",
        address: "95 Banana Cr.",
        time: "11:00AM",
    },
    {
        id: 3,
        title: "Leak Detection",
        subtitle: "In 2h30m",
        description: "Pressure test & acoustic listening",
        address: "912 Apple Dr.",
        time: "11:30AM",
    },
    {
        id: 4,
        title: "Bulk Salt Pickup",
        subtitle: "In 4h30m",
        description:
            "Order from Costco will be ready by 1:00PM\nGo to the back and ask for Purchase Order FN720031",
        address: "4315 Strandherd Dr",
        time: "1:30PM",
    },
    {
        id: 5,
        title: "Gold Pool Opening",
        subtitle: "In 5h30m",
        description:
            "Standard gold opening + tarp and water bags. Customer requested a chemical opening kit",
        address: "12 Badger Crt.",
        time: "2:30PM",
    },
    {
        id: 6,
        title: "Sand Filter Change",
        subtitle: "In 7h30m",
        description:
            "Bring 250lbs filter sand\nReplace the laterals\nCustomer requested water balance\nline4",
        address: "772 Midnight Rd.",
        time: "4:30PM",
    },
];

function JobScreen({ navigation }) {
    return (
        <Screen style={styles.screen}>
            <FlatList
                data={datas}
                keyExtractor={(listing) => listing.id.toString()}
                renderItem={({ item }) => (
                    <JobCard
                        title={item.title}
                        subTitle={item.subtitle}
                        description={item.description}
                        address={item.address}
                        time={item.time}
                        onPress={() => navigation.navigate("(TODO)", item)}
                    />
                )}
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    screen: {
        paddingHorizontal: 10,
        paddingVertical: 20,
        backgroundColor: "white",
    },
    background: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
});

export default JobScreen;
