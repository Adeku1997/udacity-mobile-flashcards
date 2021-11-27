import React from "react";
import { StyleSheet, View, TextInput } from "react-native";

export default function InputTextBig(props) {
  return (
    <View
      style={[
        styles.container,
        { borderColor: props.focus ? "#999999" : "#000000" },
      ]}
    >
      <TextInput
        {...props}
        placeholder={props.placeholder}
        onChageText={props.onChangeText}
        style={styles.textInput}
        underlineColorAndroid={"transparent"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 130,
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderColor: "#000000",
    borderRadius: 10,
    padding: 10,
    borderWidth: 2,
  },
  textInput: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 24,
    color: "#000000",
    height: "100%",
    textAlignVertical: "top",
  },
});
