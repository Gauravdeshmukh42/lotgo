import React from "react";
import { StyleSheet, Linking } from "react-native";
import { color } from "../../theme";
import { Text } from "../../ui";

export function BottomMessage() {
  return (
    <>
      <Text style={styles.text}>
        By continuing you accept
        <Text
          style={styles.textLink}
          onPress={() => {
            Linking.openURL("https://www.google.co.in/");
          }}
        >
          {" "}
          Terms of use{" "}
        </Text>
        &
        <Text
          style={styles.textLink}
          onPress={() => {
            Linking.openURL("https://www.google.co.in/");
          }}
        >
          {" "}
          privacy policy.
        </Text>
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    color: color.palette.warmGrey,
    // textAlign: "center",
    fontSize: 14,
  },
  textLink: {
    color: color.primary,
    textDecorationColor: color.primary,
    textDecorationLine: "underline",
    fontSize: 14,
  },
});
