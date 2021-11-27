import React from "react";
import { StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Animatable from "react-native-animatable";

export default function ButtonCorrect(props) {
  return (
    <Animatable.View style={{ borderWidth: props.selected ? 3 : 0 }}>
      <TouchableOpacity
        {...props}
        style={[styles.container, { ...props.containerStyle }]}
        onPress={props.onPress}
      >
        <Text style={styles.title}>Correct</Text>
      </TouchableOpacity>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: "100%",
    backgroundColor: "green",
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
