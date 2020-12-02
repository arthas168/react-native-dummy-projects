import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform } from "react-native";
import Colors from "../constants/colors";
const { primary } = Colors;

const MainButton = ({ onPress, children }) => {
    let ButtonComponent = Platform.OS ===
        "android" && Platform.Version >= 21 ? TouchableNativeFeedback : TouchableOpacity;

    return (
        <View style={styles.buttonContainer}>
            <ButtonComponent activeOpacity={0.6} onPress={onPress}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>{children}</Text>
                </View>
            </ButtonComponent>
        </View>)
};

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 25,
        overflow: "hidden"
    },
    button: {
        backgroundColor: primary,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25
    },
    buttonText: {
        color: "white",
        fontFamily: "open-sans",
        fontSize: 18
    }
});

export default MainButton;