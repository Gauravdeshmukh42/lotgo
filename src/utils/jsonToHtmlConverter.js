import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { Text } from "../ui";
const { height, width } = Dimensions.get("window");
export const convertDataToHtml = (block) => {
  switch (block.type) {
    case "header":
      return (
        <Text style={styles.textStyle(block.data.level)}>
          {block.data.text}
        </Text>
      );
    case "paragraph":
      return <Text style={styles.paragraph}>{block.data.text}</Text>;
    case "delimiter":
      return (
        <View
          style={{
            marginTop: 8,
            marginBottom: 8,
          }}
        >
          <Text style={{ justifyContent: "center", textAlign: "center" }}>
            * * *
          </Text>
        </View>
      );
    case "image":
      return (
        <Image
          style={{ resizeMode: "contain", width: width / 1, height: width / 2 }}
          source={{ uri: block.data.file.url }}
        />
      );
    case "list":
      let result = null;
      if (block.data?.items?.length > 0 && block.data.style === "unordered") {
        result = block.data.items.map((item) => {
          return (
            <View style={{ marginBottom: 5 }}>
              <Text style={{ fontSize: 18 }}>{`\u2022 ${item}`}</Text>
            </View>
          );
        });
      }
      if (block.data?.items?.length > 0 && block.data.style === "ordered") {
        result = block.data.items.map((item, index) => {
          return (
            <View style={{ marginBottom: 5 }}>
              <Text style={{ fontSize: 18 }}>{`${index + 1}. ${item}`}</Text>
            </View>
          );
        });
      }
      return result;
    case "rawTool":
      return (
        <Text style={styles.textStyle(block.data.level)}>
          {block.data.html}
        </Text>
      );

    default:
      console.log("Unknown block type", block.type);
      return;
  }
};

const styles = StyleSheet.create({
  header1: {
    fontSize: 18,
    marginLeft: 0,
    marginRight: 0,
    fontWeight: "bold",
  },
  header2: {
    fontSize: 18,
    marginLeft: 0,
    marginRight: 0,
    fontWeight: "bold",
  },
  textStyle: (level) => {
    const textCss = {
      marginLeft: 0,
      marginRight: 0,
    };
    if (level === 1) {
      return {
        fontSize: 32,
        marginTop: 6,
        marginBottom: 6,
        ...textCss,
        fontWeight: "bold",
      };
    }
    if (level === 2) {
      return {
        fontSize: 24,
        marginTop: 8,
        marginBottom: 8,
        ...textCss,
        fontWeight: "bold",
      };
    }
    if (level === 3) {
      return {
        fontSize: 18,
        marginTop: 10,
        marginBottom: 10,
        ...textCss,
        fontWeight: "bold",
      };
    }
    if (level === 4) {
      return {
        fontSize: 14,
        marginTop: 12,
        marginBottom: 12,
        ...textCss,
        fontWeight: "bold",
      };
    }
    if (level === 5) {
      return {
        fontSize: 12,
        marginTop: 14,
        marginBottom: 14,
        ...textCss,
        fontWeight: "bold",
      };
    }
    if (level === 6) {
      return {
        fontSize: 8,
        marginTop: 16,
        marginBottom: 16,
        ...textCss,
        fontWeight: "bold",
      };
    }
  },
  paragraph: {
    marginLeft: 0,
    marginRight: 0,
    fontSize: 16,
    marginTop: 6,
    marginBottom: 6,
  },
});
