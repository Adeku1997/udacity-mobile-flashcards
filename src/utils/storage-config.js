import AsyncStorage from "@react-native-async-storage/async-storage";

/*
getDecks: return all of the decks along with their titles, questions, and answers.
getDeck: take in a single id argument and return the deck associated with that id.
saveDeckTitle: take in a single title argument and add it to the decks.
addCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title.
 */

export const saveDecks = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("mobile_flashcards_decks", jsonValue);
  } catch (e) {
    // save error
  }
};

export const getDecks = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("mobile_flashcards_decks");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // read error
  }
};
