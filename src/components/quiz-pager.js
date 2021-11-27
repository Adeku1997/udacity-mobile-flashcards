import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function QuizPager(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.current}>{props.current}</Text>
      <Text style={styles.slash}>/</Text>
      <Text style={styles.total}>{props.total}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center" },
  content: {},
  current: { fontWeight: "bold", fontSize: 30 },
  slash: { paddingHorizontal: 5, fontSize: 30 },
  total: { fontSize: 30 },
});
