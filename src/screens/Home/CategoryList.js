import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  StyleSheet,
} from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Entypo";
import { color } from "../../theme";

import { API_URL_DEV } from "@env";
export const CategoryList = React.memo(({ category }) => {
  return (
    <TouchableWithoutFeedback onPress={() => {}}>
      <View
        style={[
          styles.container,
          // { backgroundColor: category.backgroundColor },
        ]}
      >
        <View
          style={[
            styles.row,
            // {
            //   backgroundColor: selected
            //     ? color.palette.white
            //     : color.palette.black,
            // },
            {
              backgroundColor: color.palette.white,
              color: color.palette.white,
              borderColor: color.palette.black,
              borderWidth: 1,
              borderRadius: 10,
              height: 70,
            },
          ]}
        >
          {/* {category?.attributes?.icon?.data?.attributes?.formats?.thumbnail
            ?.url ? (
            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
                alignItems: "flex-end",
                alignSelf: "flex-end",
                textAlign: "flex-end",
                position: "absolute",
                right: 4,
                top: 4,
              }}
            >
              <Image
                source={{
                  uri: `${API_URL_DEV}${category.attributes.icon.data.attributes.formats.thumbnail.url}`,
                }}
                style={[
                  {
                    // margin: -5,
                    // borderTopRightRadius: 10,
                    // borderBottomRightRadius: 10,
                    resizeMode: "contain",
                    width: 60,
                    height: 60,
                    borderRadius: 5,
                  },
                ]}
              />
            </View>
          ) : (
            <Text style={{ height: 60 }}></Text>
          )} */}
          <Text
            style={[
              styles.categoryName,
              { textAlign: "center", color: color.palette.black },
            ]}
            numberOfLines={3}
          >
            {category?.attributes?.name}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
});

const styles = StyleSheet.create({
  container: {
    width: "44%",
    // alignItems: "center",
    margin: "3%",
    borderRadius: 10,
    // backgroundColor: "grey",
  },
  row: {
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  categoryName: {
    fontSize: 14,
    fontWeight: "bold",
    // alignSelf: "center",
    // flexShrink: 1,
    flex: 1,
    // color: color.palette.white,
    // position: "absolute",
    flexWrap: "wrap",
    alignItems: "center",
    alignSelf: "center",
  },
  iconContainer: {
    position: "absolute",
    top: 8,
    right: 10,
    borderRadius: 15,
    height: 25,
    width: 25,
    backgroundColor: color.palette.white,
    justifyContent: "center",
  },
  icon: {
    textAlign: "center",
  },
});
