import React from "react";
import { StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Animatable from "react-native-animatable";

export default function ButtonIncorrect(props) {
  return (
    <Animatable.View style={{ borderWidth: props.selected ? 3 : 0 }}>
      <TouchableOpacity
        {...props}
        style={[styles.container, { ...props.containerStyle }]}
        onPress={props.onPress}
      >
        <Text style={styles.title}>{props?.title ?? "Incorrect"}</Text>
      </TouchableOpacity>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: "100%",
    backgroundColor: "red",
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
