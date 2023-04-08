import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import React, { memo } from "react";
import { Text } from "../../ui";
import { color } from "../../theme";

const Chip = memo(({ category, title, index, onSelect, selected, style }) => {
  return (
    <TouchableWithoutFeedback
      key={index}
      onPress={() => onSelect(category)}
      style={style}
    >
      <Text
        style={[
          styles.element,
          {
            backgroundColor: selected
              ? color.palette.black
              : color.palette.white,
            color: selected ? color.palette.white : color.palette.black,
            borderColor: selected ? color.palette.white : color.palette.black,
          },
        ]}
      >
        {title}
      </Text>
    </TouchableWithoutFeedback>
  );
});

export default Chip;
const styles = StyleSheet.create({
  element: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 10,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    // borderColor: color.primary,
    // color: "#fff",
    textTransform: "capitalize",
  },
});
