import { View, Text } from "react-native";
import React from "react";
import { useLayoutEffect } from "react";
import { color } from "../../theme";
import { HeaderBackButton } from "@react-navigation/stack";
import { CategoryList } from "./CategoryList";
import { Screen } from "../../ui";
const ListView = ({ route, navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: route.params?.data?.attributes?.name,
      headerTitleStyle: { alignSelf: "center" },
      headerTintColor: color.palette.black,
      headerRight: () => <View />,
    });
  }, [navigation]);
  return (
    <Screen variant={"scroll"}>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          margin: 5,
          marginBottom: 10,
        }}
      >
        {route.params.dataList.map((category) => (
          <CategoryList category={category} />
        ))}
      </View>
    </Screen>
  );
};

export default ListView;
