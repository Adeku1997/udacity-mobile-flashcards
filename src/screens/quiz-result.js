import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";

import ButtonPrimaryBig from "../components/button-primary-big";
import ButtonSecondaryBig from "../components/button-secondary-big";
import { handleReStartQuiz } from "../context/handler";
import { AppContext } from "../context";

export default function QuizResult(props) {
  const { state, dispatch } = useContext(AppContext);

  const navigation = useNavigation();

  const route = useRoute();

  const { params } = route;

  const [percentScore, setPercentScore] = useState(null);

  const getCorrectAnswers = params?.questions?.filter(
    (deck) => deck.myAnswer && deck.myAnswer === "correct"
  );

  const calcPercentScore = async () => {
    return (
      (await (getCorrectAnswers?.length / params?.questions?.length)) * 100
    );
  };

  const onGoToDeck = () => {
    navigation.navigate("Home");
  };

  const onReStartQuiz = () => {
    let _questions = [...params?.questions];
    _questions = _questions.map(({ question, answer }, i) => ({
      question,
      answer,
    }));

    let _deck = { title: params?.title, questions: _questions };

    navigation.navigate("DeckCardView");

    handleReStartQuiz({
      dispatch,
      payload: { title: params?.title, deck: _deck },
    });
  };

  useEffect(() => {
    calcPercentScore().then(setPercentScore);
  });

  return (
    // <ReactNativeModal
    //   isVisible={props.isVisible}
    //   onBackdropPress={props.onCloseModal}
    //   onBackButtonPress={props.onCloseModal}
    // >
    <View style={styles.container}>
      <View style={styles.topWrapper}>
        <Text style={styles.introText}>
          All cards in this deck has been flipped
        </Text>
        <Text style={styles.text}>You Scored</Text>
        <Text style={styles.score}>{percentScore ?? 0}%</Text>
      </View>
      <View style={styles.bottomWrapper}>
        <ButtonPrimaryBig title={"Restart Quiz"} onPress={onReStartQuiz} />
        <ButtonSecondaryBig title={"Go back to Deck"} onPress={onGoToDeck} />
      </View>
    </View>
    // </ReactNativeModal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
  },
  content: {},
  topWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  introText: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
    backgroundColor: "#000000",
    color: "#FFFFFF",
    fontStyle: "italic",
  },
  text: { fontSize: 30 },
  score: { fontSize: 60, fontWeight: "bold" },
  bottomWrapper: {
    flex: 1,
    justifyContent: "space-around",
  },
});
