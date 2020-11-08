import {
    Container,
    Content,
    Icon,
    Text,
    Left,
    Body,
    Right,
    List,
    ListItem,
} from "native-base";
import React from "react";
import { StyleSheet } from "react-native";

const cardImage = require("../assets/chair.jpg");
const logo = require("../assets/logo.png");

const datas = [
    {
        title: "Pool cleaning",
        subtitle: "In 30m",
        description: "Pool cleaning & balance",
        address: "82 Carrot Ln.",
        time: "9:30AM",
    },
    {
        title: "Warranty Pump Replacement",
        subtitle: "In 2h",
        description: "Bring the old pump back",
        address: "95 Banana Cr.",
        time: "11:00AM",
    },
    {
        title: "Leak Detection",
        subtitle: "In 2h30m",
        description: "Pressure test & acoustic listening",
        address: "912 Apple Dr.",
        time: "11:30AM",
    },
    {
        title: "Bulk Salt Pickup",
        subtitle: "In 4h30m",
        description: "P.O: FN720031",
        address: "4315 Strandherd Dr",
        time: "1:30PM",
    },
    {
        title: "Gold Pool Opening",
        subtitle: "In 5h30m",
        description: "Chemical opening kit requested",
        address: "12 Badger Crt.",
        time: "2:30PM",
    },
    {
        title: "Sand Filter Change",
        subtitle: "In 7h30m",
        description: "Hayward SPX450 -250lbs filter sand",
        address: "772 Midnight Rd.",
        time: "4:30PM",
    },
];

function JobScreen({ navigation }) {
    return (
        <Container style={styles.container}>
            <Content padder scrollEnabled>
                <List>
                    {datas.map((data, i) => (
                        <ListItem avatar>
                            <Left>
                                <Icon name="map" />
                            </Left>
                            <Body>
                                <Text>{data.title}</Text>
                                <Text note> {data.subtitle}</Text>
                            </Body>
                            <Right>
                                <Text style={styles.time}>{data.time}</Text>
                            </Right>
                        </ListItem>
                    ))}
                </List>
            </Content>
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF",
    },
    mb: {
        marginBottom: 15,
    },
    time: {
        fontSize: 15,
    },
});

// const listings = [
//     {
//         id: 1,
//         title: "Red jacket for sale",
//         price: 100,
//         image: require("../assets/jacket.jpg"),
//     },
//     {
//         id: 2,
//         title: "Couch in great condition",
//         price: 1000,
//         image: require("../assets/couch.jpg"),
//     },
// ];
//
// function ListingsScreen({ navigation }) {
//     return (
//         <Screen style={styles.screen}>
//             <FlatList
//                 data={listings}
//                 keyExtractor={(listing) => listing.id.toString()}
//                 renderItem={({ item }) => (
//                     <Card
//                         title={item.title}
//                         subTitle={"$" + item.price}
//                         image={item.image}
//                         onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
//                     />
//                 )}
//             />
//         </Screen>
//     );
// }

export default JobScreen;
