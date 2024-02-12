import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import React from "react";
import { Screen } from "../../ui";
const { width } = Dimensions.get("window");
import Swiper from "../../components/common/Swiper";
const screenHeight = Math.round((width * 9) / 16);
import RenderHtml, {
  defaultHTMLElementModels,
  HTMLContentModel,
} from "react-native-render-html";
import { useState } from "react";
import { Card } from "../../components/Card";
const DetailsScreen = ({ navigation, route }) => {
  const [cardIndex, setCardIndex] = useState(0);
  const onSwipedTopCard = index => {
    console.log("**********************I am called******************")
    setCardIndex(index + 1);
  };
  const onSwipedBottomCard = index => {
    setCardIndex(index - 1);
  };
  const customHTMLElementModels = {
    label: defaultHTMLElementModels.label.extend({
      contentModel: HTMLContentModel.block,
    }),
    input: defaultHTMLElementModels.input.extend({
      contentModel: HTMLContentModel.block,
    }),
  };
  const details = route.params.cardDetails;
  console.log("Card Details ", details?.attributes?.more_content)
  return (
    <Screen variant={"scroll"}>

      {/* <View activeOpacity={1} style={[styles.card]}> */}
      {/*<View style={[styles.details]}>
          <Text style={styles.header}>{details?.attributes?.title ?? ""}</Text> */}
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
      </View> */}

      <View style={[styles.container]}>
        {details?.attributes?.more_content ? (
          <Swiper
            data={details.attributes.more_content}
            cardIndex={cardIndex}
            renderCard={(news) => <Card news={news} />}
            onSwipedTop={(index) => onSwipedTopCard(index)}
            onSwipedBottom={(index) => onSwipedBottomCard(index)}
          />
        ) : (
          <View style={styles.noData}>
            <Text>No Data Available</Text>
          </View>
        )}

      </View>


      {/* </View> */}
    </Screen>
  );
};

export default DetailsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
  },
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
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 5,
    padding: 10,
  },
  details: {
    flex: 1, borderColor: 'red', borderWidth: 5, width: width - 30,
    alignItems: 'center',
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
