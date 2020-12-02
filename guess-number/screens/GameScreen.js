import React, { useState, useRef, useEffect } from 'react'
import { View, StyleSheet, ScrollView, Alert, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import MainButton from "../components/MainButton";
import Card from "../components/Card";
import BodyText from "../components/BodyText";
import NumberContainer from "../components/NumberContainer";

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const randomNumber = Math.floor(Math.random() * (max - min)) + min;

    if (randomNumber === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return randomNumber;
    }
}

const renderListItem = (value, pastGuesses, numberOfRound) =>
    (<View key={numberOfRound} style={styles.listItem}>
        <BodyText>#{pastGuesses.length - numberOfRound}</BodyText>
        <BodyText>{value}</BodyText>
    </View>);


const GameScreen = ({ userChoice, onGameOver }) => {
    const initialGuess = generateRandomBetween(1, 100, userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess]);
    const [availableDeviceHeight, setAvailabelDeviceHeight] = useState(Dimensions.get("window").height);

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    useEffect(()=>{
        const updateLayout = () =>{
            setAvailabelDeviceHeight(Dimensions.get("window").height);
        }

        Dimensions.addEventListener("change", updateLayout);

        return () =>{
            Dimensions.removeEventListener("change", updateLayout);
        }
    })

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = (direction) => {
        if (direction === "lower" && currentGuess < userChoice ||
            direction === "greater" && currentGuess > userChoice) {
            Alert.alert("Don\'t lie!", "You know that this is wrong...", [
                {
                    text: "Sorry!",
                    style: "cancel"
                }
            ]);
            return;
        }
        if (direction === "lower") {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess + 1;
        }
        const nextNumber =
            generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);

        setCurrentGuess(nextNumber);

        setPastGuesses(currPastGuesses => [nextNumber, ...currPastGuesses]);
    }

    if (availableDeviceHeight < 500)
        return (<View style={styles.screen}>
            <BodyText>Opponent's Guess</BodyText>
            <View style={styles.controls}>
                <MainButton onPress={() => { nextGuessHandler("lower") }}>
                    <Ionicons name="md-remove" size={24} color="white" />
                </MainButton>
                <NumberContainer number={currentGuess}></NumberContainer>
                <MainButton onPress={() => { nextGuessHandler("greater") }}>
                    <Ionicons name="md-add" size={24} color="white" />
                </MainButton>
            </View>
            <View style={styles.listContainer}>
                <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, i) => renderListItem(guess, pastGuesses, i))}
                </ScrollView>
            </View>
        </View>)
    return (
        <View style={styles.screen}>
            <BodyText>Opponent's Guess</BodyText>
            <NumberContainer number={currentGuess}></NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={() => { nextGuessHandler("lower") }}>
                    <Ionicons name="md-remove" size={24} color="white" />
                </MainButton>
                <MainButton onPress={() => { nextGuessHandler("greater") }}>
                    <Ionicons name="md-add" size={24} color="white" />
                </MainButton>
            </Card>
            <View style={styles.listContainer}>
                <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, i) => renderListItem(guess, pastGuesses, i))}
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center"
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: Dimensions.get("window").height > 600 ? 20 : 5,
        width: 400,
        maxWidth: "90%"
    },
    controls: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: "80%"
    },
    listContainer: {
        flex: 1,
        width: Dimensions.get("window").width > 350 ? "80%" : "100%"
    },
    list: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "flex-end"
    },
    listItem: {
        borderColor: "#ccc",
        padding: 15,
        marginVertical: 10,
        backgroundColor: "white",
        borderWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        width: "60%"
    }
})

export default GameScreen;