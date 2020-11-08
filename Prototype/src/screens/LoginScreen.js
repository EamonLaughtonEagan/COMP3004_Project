import React, { Component } from 'react';

import { Container, Header, Content, Form, Item, Input, StyleSheet, View } from 'native-base';
import AppButton from '../components/AppButton';
import colors from '../config/colors';

export default class FormExample extends Component {
    render() {
        return (
            <View style={{
                flex: 1,
                justifyContent: "center", // use "flex-end" later
                alignItems: "center",
                padding: 20,
                marginVertical: 10,
            }}>
                <AppButton title="Login" color="primary"></AppButton>
                <AppButton title="Register" color="secondary"></AppButton>
            </View>
        );
    }
}

/*const styles = StyleSheet.create ({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})*/

