import React, { useContext, useState } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import InputText from "../components/input-text";
import ButtonPrimarySmall from "../components/button-primary-small";
import NavBar from "../components/nav-bar";
import { useNavigation, useRoute } from "@react-navigation/native";
import InputTextBig from "../components/input-text-big";
import {
  handleAddCardToDeck,
  handleGetDeck,
  handleGetDecks,
} from "../context/handler";
import { AppContext } from "../context";
import { getDecks } from "../utils/storage-config";

export default function AddCard(props) {
  const { state, dispatch } = useContext(AppContext);

  const navigation = useNavigation();
  const route = useRoute();

  const {
    params: { title, questions },
  } = route;

  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [focusQuestion, setFocusQuestion] = useState(false);
  const [focusAnswer, setFocusAnswer] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validateSubmit =
    question && question.trim() !== "" && answer && answer.trim() !== "";

  const onFocusQuestion = () => {
    setFocusQuestion(true);
  };

  const onBlurQuestion = () => {
    setFocusQuestion(false);
  };

  const onFocusAnswer = () => {
    setFocusAnswer(true);
  };

  const onBlurAnswer = () => {
    setFocusAnswer(false);
  };

  const _getDecks = () => {
    getDecks()
      .then((values) => {
        handleGetDecks({ dispatch, payload: values });
      })
      .catch((error) => {});
  };

  const onSubmit = () => {
    setSubmitting(true);
    handleAddCardToDeck({
      dispatch,
      payload: { title, question, answer },
    }).then(() => {
      _getDecks();
      handleGetDeck({ dispatch, payload: title });
      setSubmitting(false);
      setQuestion(null);
      setAnswer(null);
      navigation.goBack();
    });
  };

  return (
    <View style={styles.container}>
      <NavBar title={"Add Card"} />
      <View style={styles.content}>
        <>
          <Text style={styles.title}>Deck: {title}</Text>
          <Text style={styles.noOfCards}>
            Number of Card(s): {questions?.length ?? 0}
          </Text>
        </>
        <View style={styles.topContentWrapper}>
          <InputText
            placeholder={"Question"}
            onChangeText={setQuestion}
            onFocus={onFocusQuestion}
            onBlur={onBlurQuestion}
            focus={focusQuestion}
          />
          <View style={styles.spacer} />
          <InputTextBig
            placeholder={"Answer"}
            onChangeText={setAnswer}
            onFocus={onFocusAnswer}
            onBlur={onBlurAnswer}
            focus={focusAnswer}
          />
        </View>
        <View style={styles.bottomContentWrapper}>
          {submitting ? (
            <View style={styles.indicatorWrapper}>
              <ActivityIndicator color={"#000000"} size={"large"} />
            </View>
          ) : (
            <ButtonPrimarySmall
              title={"Submit"}
              onPress={onSubmit}
              disabled={!validateSubmit}
            />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
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
    alignItems: "center",
  },
  question: {
    fontWeight: "bold",
    fontSize: 40,
    color: "#000000",
    textAlign: "center",
    marginBottom: 20,
  },
  spacer: { margin: 10 },
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
