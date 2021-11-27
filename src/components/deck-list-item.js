import React, { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";

import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { AppContext } from "../context";
import { handleGetDeck } from "../context/handler";

export default function DeckListItem(props) {
  const {
    state: { sortedDecks },
    dispatch,
  } = useContext(AppContext);

  const navigation = useNavigation();

  const onPress = () => {
    handleGetDeck({ dispatch, payload: props.title });
    navigation.navigate({ name: "DeckCardView", params: { ...props } });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.noOfCards}>
        {props.questions?.length} card{props.questions?.length > 1 && "s"}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 100,
  },
  content: {},
  title: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#000000",
  },
  noOfCards: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#999999",
  },
});
