import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, View, StatusBar, FlatList, Text } from "react-native";
import { _decksData, decksData } from "../api/data";
import DeckListItem from "../components/deck-list-item";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getDecks, saveDecks } from "../utils/storage-config";
import useStable from "react-native-web/dist/modules/useStable";
import { AppContext } from "../context";

export default function DeckListView(props) {
  const {
    state: { sortedDecks },
  } = useContext(AppContext);

  const [decks, setDecks] = useState(null);
  const [loadingDecks, setLoadingDecks] = useState(false);

  const ItemSeparatorComponent = () => <View style={styles.itemSeparator} />;

  return (
    <View style={styles.container}>
      <StatusBar barStyle={"dark-content"} backgroundColor={"#FFF"} />
      <FlatList
        data={sortedDecks}
        renderItem={({ item, index }) => <DeckListItem {...item} />}
        keyExtractor={({ title }, index) => title + index}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={ItemSeparatorComponent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#FFFFFF" },
  content: {},
  itemSeparator: { borderBottomWidth: 2, borderBottomColor: "#00000060" },
});
