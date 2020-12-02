import React from "react";
import { View, StyleSheet, Dimensions, Text, Image, ScrollView } from "react-native";

import MainButton from "../components/MainButton";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import Colors from "../constants/colors";

const { primary } = Colors;

const GameOverScreen = ({ roundsNumber, userNumber, onRestart }) => {
    return (
        <ScrollView>
            <View style={styles.screen}>
                <TitleText>The Game is Over!</TitleText>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={require("../assets/success.png")} />
                </View>
                <View style={styles.resultContainer}>
                    <BodyText style={styles.resultText}>
                        Your phone needed <Text style={styles.highlight}>{roundsNumber}</Text> rounds to guess the number
                <Text style={styles.highlight}> {userNumber}</Text>.
            </BodyText>
                </View>

                <MainButton onPress={onRestart}>NEW GAME</MainButton>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10
    },
    imageContainer: {
        borderRadius: Dimensions.get("window").width * 0.7 / 2,
        borderWidth: 3,
        borderColor: "black",
        width: Dimensions.get("window").width * 0.7,
        height: Dimensions.get("window").width * 0.7,
        overflow: "hidden",
        marginVertical: Dimensions.get("window").height / 30
    },
    image: {
        width: "100%",
        height: "100%"
    },
    highlight: {
        color: primary,
        fontFamily: "open-sans-bold",
    },
    resultContainer: {
        marginHorizontal: 30,
        marginVertical: Dimensions.get("window").width * 0.7 / 60,
    },
    resultText: {
        textAlign: "center",
        fontSize: Dimensions.get("window").height < 400 ? 16 : 20
    }
});

export default GameOverScreen;