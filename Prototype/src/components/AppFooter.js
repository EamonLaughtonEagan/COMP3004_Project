import { Button, Footer, FooterTab, Icon, Text } from "native-base";
import React from "react";

const AppFooter = (props) => {
    return (
        <Footer>
            <FooterTab>
                <Button vertical>
                    <Icon name="bookmarks" />
                    <Text>Jobs</Text>
                </Button>
                <Button vertical active>
                    <Icon active name="navigate" />
                    <Text>Navigate</Text>
                </Button>
                <Button vertical>
                    <Icon name="person" />
                    <Text>Contact</Text>
                </Button>
            </FooterTab>
        </Footer>
    );
};

export default AppFooter;
