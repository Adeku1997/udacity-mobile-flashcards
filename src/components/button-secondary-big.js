import React from "react";
import { StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function ButtonSecondaryBig(props) {
  return (
    <TouchableOpacity
      {...props}
      style={styles.container}
      onPress={props.onPress}
    >
      <Text style={styles.title}>{props.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderColor: "#000000",
    borderRadius: 10,
    borderWidth: 2,
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10000,
  },
  content: {},
  title: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#000000",
  },
});
