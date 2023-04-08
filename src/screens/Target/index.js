import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Routes from "../../navigation/routes";
import { useBackHandler } from "../../hooks";

export const Target = ({ navigation }) => {
  useBackHandler(navigation, Routes.DASHBOARD_STACK);
  return (
    <View style={styles.container}>
      <Text>Target Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
