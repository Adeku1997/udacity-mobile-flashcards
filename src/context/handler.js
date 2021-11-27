import React, { useContext } from "react";
import {
  AddCardToDeck,
  DeleteDeck,
  GetDeck,
  GetDecks,
  QuizedDeck,
  ReStartQuiz,
  SaveDeckTitle,
  SaveQuizProgress,
} from "./constants";
import { saveDecks } from "../utils/storage-config";
import { AppContext } from "./index";

export const handleGetDecks = ({ dispatch, payload }) => {
  dispatch({ type: GetDecks, payload });
  // saveDecks(payload)
};

export const handleSaveDeckTitle = async ({ dispatch, payload }) => {
  await dispatch({ type: SaveDeckTitle, payload });
};

export const handleGetDeck = ({ dispatch, payload }) => {
  dispatch({ type: GetDeck, payload });
};

export const handleAddCardToDeck = async ({ dispatch, payload }) => {
  await dispatch({ type: AddCardToDeck, payload });
};

export const handleGetQuizedDeck = async ({ dispatch, payload }) => {
  await dispatch({ type: QuizedDeck, payload });
};

export const handleSaveQuizProgress = async ({ dispatch, payload }) => {
  await dispatch({ type: SaveQuizProgress, payload });
};

export const handleReStartQuiz = async ({ dispatch, payload }) => {
  await dispatch({ type: ReStartQuiz, payload });
};

export const handleDeleteDeck = async ({ dispatch, payload }) => {
  await dispatch({ type: DeleteDeck, payload });
};
