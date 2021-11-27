import React, { useContext, useState } from "react";
import { StyleSheet, View, Text, ActivityIndicator, Alert } from "react-native";
import InputText from "../components/input-text";
import ButtonPrimarySmall from "../components/button-primary-small";
import { useNavigation } from "@react-navigation/native";
import { handleGetDecks, handleSaveDeckTitle } from "../context/handler";
import { AppContext } from "../context";
import { getDecks } from "../utils/storage-config";

export default function NewDeckView(props) {
  const {
    state: { existingDecks },
    dispatch,
  } = useContext(AppContext);

  const navigation = useNavigation();

  const [title, setTitle] = useState(null);
  const [focus, setFocus] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const _getDecks = () => {
    getDecks()
      .then((values) => {
        handleGetDecks({ dispatch, payload: values });
      })
      .catch((error) => {});
  };

  const onCheckIfDeckExist = () => {
    return existingDecks?.includes(title?.trim().toLowerCase());
  };

  const onSaveDeckTitle = () => {
    setSubmitting(true);
    if (onCheckIfDeckExist()) {
      setSubmitting(false);
      return Alert.alert("Sorry! Deck already exist");
    } else {
      handleSaveDeckTitle({ dispatch, payload: title?.trim() }).then(() => {
        _getDecks();
        setSubmitting(false);
        setTitle(null);
        navigation.navigate({
          name: "Home",
          params: {
            screen: "DECKS",
          },
        });
      });
    }
    setSubmitting(false);
  };

  const onFocus = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.topContentWrapper}>
          <Text style={styles.question}>
            What is the title of your new deck?
          </Text>
        </View>
        <View style={styles.bottomContentWrapper}>
          <InputText
            placeholder={"Deck Title"}
            onChangeText={setTitle}
            value={title}
            onFocus={onFocus}
            onBlur={onBlur}
            focus={focus}
          />
          {submitting ? (
            <View style={styles.indicatorWrapper}>
              <ActivityIndicator color={"#000000"} size={"large"} />
            </View>
          ) : (
            <ButtonPrimarySmall
              title={"Submit"}
              onPress={onSaveDeckTitle}
              disabled={!title || title.trim() === "" || submitting}
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
  indicatorWrapper: {
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
});
