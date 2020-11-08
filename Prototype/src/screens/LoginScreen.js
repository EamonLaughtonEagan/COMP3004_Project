import React, { Component } from 'react';

import { Container, Header, Content, Form, Item, Input, StyleSheet, View } from 'native-base';
import AppButton from '../components/AppButton';
import colors from '../config/colors';

export default class FormExample extends Component {
    render() {
        return (
            <View style={styles.container}>
                <AppButton title="Login" color="primary"/>
                <AppButton title="Register" color="secondary"/>
            </View>
        );
    }
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})

