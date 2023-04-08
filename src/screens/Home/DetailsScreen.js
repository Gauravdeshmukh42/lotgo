import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import React from "react";
import { Screen } from "../../ui";
const { width } = Dimensions.get("window");
const screenHeight = Math.round((width * 9) / 16);
import RenderHtml, {
  defaultHTMLElementModels,
  HTMLContentModel,
} from "react-native-render-html";
const DetailsScreen = ({ navigation, route }) => {
  const customHTMLElementModels = {
    label: defaultHTMLElementModels.label.extend({
      contentModel: HTMLContentModel.block,
    }),
    input: defaultHTMLElementModels.input.extend({
      contentModel: HTMLContentModel.block,
    }),
  };
  const details = route.params.cardDetails;
  return (
    <Screen variant={"scroll"}>
      <View activeOpacity={1} style={[styles.card]}>
        <View style={{ flex: 1 }}>
          <Text style={styles.header}>{details?.attributes?.title ?? ""}</Text>
          {/* {details?.photo && (
            <Image
              source={details.photo}
              style={{
                height: screenHeight,
                resizeMode: "cover",
                width: width,
              }}
            />
          )}
          <Text style={styles.abstract}>
            {details?.attributes?.details ?? ""}
          </Text> */}
          <RenderHtml
            contentWidth={width}
            source={{ html: details?.attributes?.more_content }}
            customHTMLElementModels={customHTMLElementModels}
          />
        </View>
      </View>
    </Screen>
  );
};

export default DetailsScreen;
const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 5,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.3,
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15,
  },
  header: {
    margin: 10,
    fontWeight: "bold",
    color: "black",
    fontSize: 20,
    textTransform: "capitalize",
  },
  abstract: {
    margin: 10,
    color: "black",
    fontSize: 16,
  },
});
