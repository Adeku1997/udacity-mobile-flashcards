import React from "react";
import { StyleSheet, Text, View } from "react-native";
import RootNavigation from "./src/navigation";
import AppContextProvider from "./src/context";

export default function App() {
  return (
    <AppContextProvider>
      <RootNavigation />
    </AppContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
