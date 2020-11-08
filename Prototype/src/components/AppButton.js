import React from 'react';
import colors from '../config/colors';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

function AppButton({ title, onPress, color = "black"}) {
    return (
        <TouchableOpacity style={[styles.button, {backgroundColor: colors[color]}]} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create ({
    button: {
        backgroundColor: colors.black,
        borderRadius: 25, //round corners
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        width: "100%",
        marginVertical: 10
    },
    text: {
        color: colors.white,
        fontSize: 18,
        textTransform: 'uppercase',
        fontWeight: 'bold'
    }
})

export default AppButton;