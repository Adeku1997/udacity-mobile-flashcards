import React from "react";
import { StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function ButtonPrimaryBig(props) {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <Text style={styles.title}>{props.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: "100%",
    backgroundColor: "#000000",
    borderRadius: 10,
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {},
  title: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#FFFFFF",
  },
});
