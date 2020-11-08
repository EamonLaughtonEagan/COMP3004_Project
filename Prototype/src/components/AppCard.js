import React, { Component } from "react";
import { StyleSheet, Image } from "react-native";
import { FontAwesome, Entypo } from '@expo/vector-icons';
import {
    Container,
    Content,
    Button,
    Icon,
    Card,
    CardItem,
    Text,
    Thumbnail,
    Left,
    Body,
    Right
} from "native-base";

const logo = require("../assets/logo.png");
const cardImage = require("../assets/chair.jpg");

function AppCard(props) {
    return (
        <Container style={styles.container}>
            <Content padder scrollEnabled={true}>
                <Card style={styles.mb}>
                    <CardItem>
                        <Left>
                            <Icon name="water" />
                            <Body style={{paddingHorizontal: 10}}>
                                <Text>{props.title}</Text>
                                <Text note>{props.subtitle}</Text>
                            </Body>
                        </Left>
                    </CardItem>

                    <CardItem cardBody style={{paddingHorizontal: 10}}>
                       <Text>{props.description}</Text>
                    </CardItem>

                    <CardItem style={{ paddingVertical: 0 }}>
                        <Left>
                            <Button transparent>
                                <Icon active name="map"/>
                                <Text>{props.address}</Text>
                            </Button>
                        </Left>
                        <Right>
                            <Text>{props.time}</Text>
                        </Right>
                    </CardItem>
                </Card>
            </Content>
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF"
    },
    mb: {
        marginBottom: 15
    }
});

export default AppCard;
