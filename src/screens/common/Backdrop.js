import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useBottomSheet } from "../../context";
import { useBackHandler } from "@react-native-community/hooks";
import { RootNavigation } from "../../navigation";

const NON_PRESSABLE_OFFSET = 3;

export function Backdrop({ navigation, route }) {
  const backdropHeight = route.params?.backdropHeight;
  const closeHeightPerFromTop =
    100 - +backdropHeight?.replace("%", "") - NON_PRESSABLE_OFFSET || 65;

  const { closeBottomSheet } = useBottomSheet();

  useBackHandler(() => {
    closeBottomSheet(navigation);
    return true;
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.closeArea(closeHeightPerFromTop)}
        onPress={() => {
          closeBottomSheet();
          navigation.goBack();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  closeArea: (heightInPerc) => ({
    height: `${heightInPerc}%`,
  }),
});
