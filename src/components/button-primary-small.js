import React from "react";
import { StyleSheet, Text, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const { width: screenWidth } = Dimensions.get("screen");

export default function ButtonPrimarySmall(props) {
  return (
    <TouchableOpacity
      {...props}
      style={[
        styles.container,
        { backgroundColor: props.disabled ? "#CCCCCC" : "#000000" },
      ]}
      onPress={props.onPress}
    >
      <Text style={styles.title}>{props.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: screenWidth * 0.4,
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
