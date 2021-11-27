import React, { useEffect, useContext, useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import TabStack from "./tab-stack";
import DeckCardView from "../screens/deck-card-view";
import QuizView from "../screens/quiz-view";
import AddCard from "../screens/add-card";
import { getDecks, saveDecks } from "../utils/storage-config";
import { _decksData } from "../api/data";
import { AppContext } from "../context";
import { handleGetDecks } from "../context/handler";
import QuizResult from "../screens/quiz-result";

const { Navigator, Screen } = createStackNavigator();

export default function RootNavigation() {
  const { state, dispatch } = useContext(AppContext);

  const [loadingDecks, setLoadingDecks] = useState();

  // console.log("App state", state);

  const _saveDecks = async () => {
    await saveDecks(_decksData)
      .then((values) => {
        // console.log("values", values);
      })
      .catch((error) => {
        // console.log("error", error);
      });
  };

  const _getDecks = async () => {
    setLoadingDecks(true);
    await getDecks()
      .then((values) => {
        if (values) {
          handleGetDecks({ dispatch, payload: values });
          setLoadingDecks(false);
        } else {
          _saveDecks().then(() => {
            getDecks().then((values) => {
              handleGetDecks({ dispatch, payload: values });
              setLoadingDecks(false);
            });
          });
        }
      })
      .catch((error) => {
        setLoadingDecks(false);
        return false;
      });
  };

  useEffect(() => {
    _getDecks().then((value) => {});

    // _saveDecks();
  }, []);

  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name={"Home"} component={TabStack} />
        <Screen name={"DeckCardView"} component={DeckCardView} />
        <Screen name={"QuizView"} component={QuizView} />
        <Screen name={"QuizResult"} component={QuizResult} />
        <Screen name={"AddCard"} component={AddCard} />
      </Navigator>
    </NavigationContainer>
  );
}
