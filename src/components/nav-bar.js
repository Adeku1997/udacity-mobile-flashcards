import React from "react";
import { StyleSheet, View, Text, StatusBar } from "react-native";

import { TouchableOpacity } from "react-native-gesture-handler";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

export default function NavBar(props) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar barStyle={"light-content"} backgroundColor={"#000000"} />
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <AntDesign name={"arrowleft"} style={styles.icon} />
      </TouchableOpacity>
      <Text style={styles.title}>{props.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: "#000000",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  content: {},
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#FFFFFF",
    paddingHorizontal: 10,
  },
  icon: { fontSize: 30, color: "#FFFFFF" },
});
