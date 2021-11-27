import React from "react";
import { StyleSheet, View, TextInput } from "react-native";

export default function InputText(props) {
  return (
    <View
      style={[
        styles.container,
        {
          borderColor: props.focus ? "#999999" : "#000000",
          ...props.containerStyle,
        },
      ]}
    >
      <TextInput
        {...props}
        placeholder={props.placeholder}
        onChageText={props.onChangeText}
        style={[styles.textInput]}
        underlineColorAndroid={"transparent"}
        onFocus={props.onFocus}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderColor: "#000000",
    borderRadius: 10,
    paddingHorizontal: 10,
    borderWidth: 2,
    justifyContent: "center",
  },
  textInput: { flex: 1, fontWeight: "bold", fontSize: 24, color: "#000000" },
});
