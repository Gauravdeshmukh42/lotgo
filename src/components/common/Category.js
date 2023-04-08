import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text } from "../../ui";

export const Category = ({ imageUri, name }) => {
  return (
    <View
      style={{
        // height: 130,
        // width: 150,
        width: 130,
        height: 130,
        borderRadius: 5,
        margin: 10,
      }}
    >
      <View
        style={{
          flex: 2,
          // borderWidth: 0.5,

          borderColor: "#dddddd",
        }}
      >
        <Image
          source={{ uri: imageUri }}
          style={{
            flex: 1,
            width: null,
            borderRadius: 10,
            height: null,
            resizeMode: "cover",
          }}
        />
      </View>
      <View style={{ flex: 1, paddingTop: 10 }}>
        <Text>{name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
