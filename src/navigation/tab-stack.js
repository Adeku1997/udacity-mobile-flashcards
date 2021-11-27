import React from "react";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import DeckListView from "../screens/deck-list-view";
import NewDeckView from "../screens/new-deck-view";

const { Navigator, Screen } = createMaterialTopTabNavigator();

export default function TabStack() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: { fontSize: 20, fontWeight: "bold" },
        tabBarStyle: { backgroundColor: "#FFFFFF" },
        tabBarIndicatorStyle: { backgroundColor: "#000000" },
      }}
    >
      <Screen name={"DECKS"} component={DeckListView} />
      <Screen name={"NEW DECK"} component={NewDeckView} />
    </Navigator>
  );
}
