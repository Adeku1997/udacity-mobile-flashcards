import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";

import NavBar from "../components/nav-bar";
import ButtonPrimaryBig from "../components/button-primary-big";
import ButtonSecondaryBig from "../components/button-secondary-big";
import { AppContext } from "../context";
import { handleDeleteDeck, handleGetQuizedDeck } from "../context/handler";
import ButtonIncorrect from "../components/button-incorrect";

export default function DeckCardView(props) {
  const {
    state: { selectedDeck, decks },
    dispatch,
  } = useContext(AppContext);

  const [data, setData] = useState({ title: null, questions: null });
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [unFlippedCards, setUnFlippedCards] = useState(null);

  const toggleShowResult = () => setShowQuizResult((prev) => !prev);

  const { title, questions } = data;

  const navigation = useNavigation();

  const onAddCard = () => {
    navigation.navigate({
      name: "AddCard",
      params: { title, questions },
    });
  };

  const onStartQuiz = () => {
    if (Boolean(questions.length)) {
      if (!Boolean(unFlippedCards?.length)) {
        // toggleShowResult();
        navigation.navigate({
          name: "QuizResult",
          params: {
            questions,
            title,
          },
        });
      } else {
        handleGetQuizedDeck({ dispatch, payload: title });
        navigation.navigate({ name: "QuizView" });
      }
    } else {
      return Alert.alert(
        "Empty Deck",
        "This deck has no card at the moment. Kindly press Add Card to add new card",
        [
          {
            text: "Cancel",
            onPress: () => {},
            style: "cancel",
          },
          {
            text: "Add Card",
            onPress: () =>
              navigation.navigate({
                name: "AddCard",
                params: { title, questions },
              }),
          },
        ]
      );
    }
  };

  const onDeleteDeck = () => {
    Alert.alert("Warning!!!", "Are you sure you want to delete this deck? ", [
      {
        text: "Cancel",
        onPress: () => {},
      },
      {
        text: "Okay",
        onPress: () => {
          handleDeleteDeck({ dispatch, payload: { title } });
          navigation.navigate("Home");
        },
      },
    ]);
  };

  useEffect(() => {
    setData(selectedDeck);
    setUnFlippedCards(selectedDeck.questions?.filter((deck) => !deck.myAnswer));
  }, []);

  return (
    <View style={styles.container}>
      <NavBar title={title} />
      <View style={styles.content}>
        <View style={styles.topContentWrapper}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.noOfCards}>
            {questions?.length} card{questions?.length > 1 && "s"}
          </Text>
        </View>
        <View style={styles.bottomContentWrapper}>
          <ButtonSecondaryBig title={"Add Card"} onPress={onAddCard} />
          <ButtonPrimaryBig title={"Start Quiz"} onPress={onStartQuiz} />
          <ButtonIncorrect title={"Delete Deck"} onPress={onDeleteDeck} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
    // alignItems: "center",
  },
  topContentWrapper: {
    flex: 1 / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomContentWrapper: {
    flex: 1 / 2,
    justifyContent: "space-evenly",
    // alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    color: "#000000",
  },
  noOfCards: {
    fontWeight: "bold",
    fontSize: 26,
    color: "#999999",
  },
});
