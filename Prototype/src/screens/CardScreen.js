import React, { Component } from "react";
import { StyleSheet} from "react-native";
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
    Image,
    Right
} from "native-base";

const logo = require("../assets/logo.png");
const cardImage = require("../assets/chair.jpg");

class NHCardImage extends Component {
    render() {
        return (
            <Container style={styles.container}>


                <Content padder scrollEnabled={true}>
                    <Card style={styles.mb}>
                        <CardItem>
                            <Left>
                                <Thumbnail source={logo} />
                                <Body>
                                    <Text>Pool cleaning</Text>
                                    <Text note>In 45 minutes</Text>
                                </Body>
                            </Left>
                        </CardItem>

                        <CardItem cardBody>
                           <Text>Regular pool cleaning</Text>
                            <Image
                                style={{
                                    resizeMode: "cover",
                                    width: null,
                                    height: 200,
                                    flex: 1
                                }}
                                source={cardImage}
                            />
                        </CardItem>

                        <CardItem style={{ paddingVertical: 0 }}>
                            <Left>
                                <Button transparent>
                                    <Icon active name="thumbs-up" />
                                    <Text>23 Karens liked this</Text>
                                </Button>
                            </Left>
                            {/*<Body>*/}
                            {/*    <Button transparent>*/}
                            {/*        <Icon active name="chatbubbles" />*/}
                            {/*        <Text>89 Comments</Text>*/}
                            {/*    </Button>*/}
                            {/*</Body>*/}
                            <Right>
                                <Text>3:25PM</Text>
                            </Right>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF"
    },
    mb: {
        marginBottom: 15
    }
});

export default NHCardImage;
