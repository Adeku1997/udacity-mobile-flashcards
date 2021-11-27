import {
  AddCardToDeck,
  DeleteDeck,
  GetDeck,
  GetDecks,
  QuizedDeck,
  ReStartQuiz,
  SaveDeckTitle,
  SaveQuizProgress,
  SelectedDeck,
} from "./constants";
import { saveDecks } from "../utils/storage-config";

export const initialState = {
  decks: {},
  sortedDecks: [],
  existingDecks: [],
  addDeck: {},
  selectedDeck: {},
  saveDeckTitle: null,
  quizedDeck: {},
};

export const appReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GetDecks:
      return {
        ...state,
        decks: payload,
        sortedDecks: Object.values(payload),
        existingDecks: Object.keys(payload).map((deck) => deck.toLowerCase()),
      };

    case GetDeck:
      const getDeck = state.sortedDecks.find((deck) => deck.title === payload);
      return { ...state, selectedDeck: getDeck };

    case SaveDeckTitle:
      const saveData = {
        ...state.decks,
        [`${payload}`]: { title: payload, questions: [] },
      };
      saveDecks(saveData);

      return { ...state, saveDeckTitle: payload };

    case AddCardToDeck:
      const { title, question, answer } = payload;
      const decks = state.decks;
      const deck = state.decks[`${title}`];
      const addData = {
        ...decks,
        [`${title}`]: {
          title,
          questions: [...deck?.questions, { question, answer }],
        },
      };
      saveDecks(addData);
      return {
        ...state,
        decks: addData,
        sortedDecks: Object.values(addData),
        existingDecks: Object.keys(addData).map((deck) => deck.toLowerCase()),
      };
    case QuizedDeck:
      const getQuizedDeck = state.sortedDecks.find(
        (deck) => deck.title === payload
      );
      return { ...state, quizedDeck: getQuizedDeck };

    case SaveQuizProgress:
      const { title: _title, deck: _deck } = payload;
      const _saveData = {
        ...state.decks,
        [`${_title}`]: { ..._deck },
      };
      saveDecks(_saveData);
      return {
        ...state,
        decks: _saveData,
        sortedDecks: Object.values(_saveData),
        existingDecks: Object.keys(_saveData).map((deck) => deck.toLowerCase()),
        quizedDeck: _deck,
      };

    case ReStartQuiz:
      const newData = {
        ...state.decks,
        [`${payload.title}`]: { ...payload.deck },
      };
      saveDecks(newData);
      return {
        ...state,
        decks: newData,
        sortedDecks: Object.values(newData),
        existingDecks: Object.keys(newData).map((deck) => deck.toLowerCase()),
      };

    case DeleteDeck:
      const allData = {
        ...state.decks,
      };
      delete allData[`${payload.title}`];

      saveDecks(allData);
      return {
        ...state,
        decks: allData,
        sortedDecks: Object.values(allData),
        existingDecks: Object.keys(allData).map((deck) => deck.toLowerCase()),
      };

    default:
      return state;
  }
};
