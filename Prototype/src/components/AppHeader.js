import React from 'react';
import {Body, Button, Header, Icon, Left, Right, Title} from "native-base";

const AppHeader = (props) => {
    return (
        <Header>
            <Left>
                <Button transparent onPress={() => this.props.navigation.goBack()}>
                    <Icon name="arrow-back" />
                </Button>
            </Left>
            <Body>
                <Title>{props.title}</Title>
            </Body>
            <Right />
        </Header>
    );

}

export default AppHeader;
