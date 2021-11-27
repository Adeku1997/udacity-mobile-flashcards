import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Dimensions,
  Button,
  Alert,
} from "react-native";

import { useRoute } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";

import NavBar from "../components/nav-bar";
import QuizPager from "../components/quiz-pager";
import ButtonCorrect from "../components/button-correct";
import ButtonIncorrect from "../components/button-incorrect";
import { AppContext } from "../context";
import InputText from "../components/input-text";
import { handleSaveQuizProgress } from "../context/handler";

const { width, height } = Dimensions.get("window");

export default function QuizView(props) {
  const {
    state: { quizedDeck },
    dispatch,
  } = useContext(AppContext);

  const navigation = useNavigation();

  const [deck, setDeck] = useState({ title: null, questions: null });
  const [showAnswer, setShowAnswer] = useState(false);
  const [myAnswer, setMyAnswer] = useState(null);
  const [validateMyAnswer, setValidateMyAnswer] = useState(null);
  const [editAnswer, setEditAnswer] = useState(true);
  const [currentCard, setCurrentCard] = useState(1);
  // const [currentCard, setCurrentCard] = useState(1);

  const { title, questions } = deck;

  const endOfQuiz = currentCard === questions?.length;

  const onToggleCard = () => setShowAnswer((prev) => !prev);
  const onToggleEdit = () => setEditAnswer((prev) => !prev);

  const onNextQuestion = () => {
    setShowAnswer(null);
    setMyAnswer(null);
    setValidateMyAnswer(null);
    setEditAnswer(true);

    const _deck = { ...deck };
    _deck.questions[currentCard - 1] = {
      ..._deck.questions[currentCard - 1],
      myAnswer: validateMyAnswer,
    };

    !endOfQuiz &&
      setCurrentCard(
        _deck.questions?.filter((deck) => deck.myAnswer).length + 1
      );

    setDeck({ ..._deck });

    handleSaveQuizProgress({ dispatch, payload: { title, deck: _deck } });

    if (endOfQuiz) {
      navigation.navigate({
        name: "QuizResult",
        params: {
          questions,
          title,
        },
      });
      // return Alert.alert("Yeah!", "Quiz Completed", [
      //   {
      //     text: "Okay",
      //     onPress: () => {
      //       navigation.goBack();
      //     },
      //   },
      // ]);
    }
  };

  const renderQuizItem = ({ item, index }) => {
    return (
      !item.myAnswer && (
        <Animatable.View
          style={styles.itemContainer}
          animation={!item.myAnswer ? "bounceInUp" : "bounceOutDown"}
        >
          {!showAnswer ? (
            <Animatable.View
              animation={!showAnswer ? "fadeInRight" : "fadeOutRight"}
              style={styles.itemWrapper}
            >
              <Text style={styles.helperText}>Question: </Text>
              <Text style={styles.question}>{item?.question}</Text>
            </Animatable.View>
          ) : (
            <Animatable.View
              style={styles.itemWrapper}
              animation={showAnswer ? "fadeInLeft" : "fadeOutLeft"}
            >
              <Text style={styles.helperText}>Answer: </Text>
              <Text style={styles.question}>{item?.answer}</Text>
            </Animatable.View>
          )}
        </Animatable.View>
      )
    );
  };

  useEffect(() => {
    setDeck(quizedDeck);
    !endOfQuiz &&
      setCurrentCard(
        quizedDeck.questions?.filter((deck) => deck.myAnswer).length + 1
      );
  }, [quizedDeck?.title, quizedDeck?.questions]);

  return (
    <View style={styles.container}>
      <NavBar title={"Quiz"} />
      <View style={styles.content}>
        <View style={styles.pagerWrapper}>
          <QuizPager current={currentCard} total={questions?.length} />
          {!endOfQuiz ? (
            <Button
              onPress={onNextQuestion}
              title={"Next"}
              disabled={validateMyAnswer === null}
            />
          ) : (
            <Button
              onPress={onNextQuestion}
              title={"See Result"}
              disabled={validateMyAnswer === null}
            />
          )}
        </View>
        <>
          <FlatList
            scrollEnabled={false}
            data={questions}
            renderItem={renderQuizItem}
            keyExtractor={({ title }, index) => index}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            snapToInterval={width}
            style={styles.listStyle}
            contentContainerStyle={styles.contentContainer}
          />
        </>
        <View style={styles.bottomContentContainer}>
          <View style={styles.swipeBtnWrapper}>
            <Button
              title={showAnswer ? "See Question" : "See Answer"}
              onPress={onToggleCard}
            />
          </View>
          <View style={styles.bottomBtnWrapper}>
            <ButtonCorrect
              onPress={() => setValidateMyAnswer("correct")}
              containerStyle={{ marginRight: 10, width: "100%" }}
              selected={validateMyAnswer === "correct"}
            />
            <ButtonIncorrect
              onPress={() => setValidateMyAnswer("incorrect")}
              containerStyle={{ marginRight: 10, width: "100%" }}
              selected={validateMyAnswer === "incorrect"}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
    justifyContent: "space-between",
    // alignItems: "center",
  },
  listStyle: { height: width, flex: 1 },
  contentContainer: {},
  itemContainer: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width,
    height: width,
    // flexWrap: "wrap",
    backgroundColor: "#DDDDDD",
  },
  itemWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // flexWrap: "wrap",
    padding: 20,
  },
  bottomContentContainer: {
    // flex: 1 / 2,
    justifyContent: "space-evenly",
    // alignItems: "center",
    padding: 10,
    paddingHorizontal: 20,
  },
  bottomBtnWrapper: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 20,
  },
  bottomInputWrapper: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  question: {
    fontWeight: "bold",
    fontSize: 40,
    color: "#000000",
    textAlign: "center",
    marginBottom: 20,
  },
  helperText: {
    fontWeight: "bold",
    fontSize: 26,
    color: "brown",
  },
  pagerWrapper: {
    padding: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  swipeBtnWrapper: {
    top: -10,
    left: 0,
    right: 0,
    zIndex: 10,
  },
});
