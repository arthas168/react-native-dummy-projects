import React from 'react'
import { View, StyleSheet } from "react-native";
import BodyText from "./BodyText";

import Colors from "../constants/colors";
const { accent } = Colors;

const NumberContainer = ({ number }) => {
    return (
        <View style={styles.container}>
            <BodyText style={styles.number}>{number}</BodyText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: accent,
        padding:10,
        borderRadius: 10,
        marginVertical: 10,
        alignItems:"center",
        justifyContent:"center"
    },
    number:{
        color: accent,
        fontSize: 22
    }
})

export default NumberContainer;