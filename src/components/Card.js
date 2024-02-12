import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Share,
  TouchableWithoutFeedback,
  useWindowDimensions,
  StatusBar,
} from "react-native";
const { height, width } = Dimensions.get("window");
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { SheetOptions, useBottomSheet } from "../context";
import { color } from "../theme";
import Routes from "../navigation/routes";
import { useNavigation } from "@react-navigation/native";
import RenderHtml, {
  defaultHTMLElementModels,
  HTMLContentModel,
  useInternalRenderer,
} from "react-native-render-html";
import { getFormatedImageUrl } from "../utils/imageUrlManipulation";
import { useState } from "react";
const screenHeight = Math.round((width * 3) / 5);
const screenWidth = width;
console.log("Screen Height ", screenHeight)
console.log("Screen Width ", screenWidth)
const CustomImageRenderer = (props) => {
  const { Renderer, rendererProps } = useInternalRenderer("img", props);
  const uri = rendererProps.source.uri;
  const thumbnailSource = {
    ...rendererProps.source,
    // You could change the uri here, for example to provide a thumbnail.
    uri: getFormatedImageUrl(uri),
  };
  return <Renderer {...rendererProps} source={thumbnailSource} />;
};
console.log("Height", screenHeight, "Width", width)
export const Card = ({ news }) => {
  const { openBottomSheet } = useBottomSheet();
  const navigation = useNavigation();
  const { width } = useWindowDimensions();

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          "React Native | A framework for building native apps using React",
        url: news.link,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const customHTMLElementModels = {
    label: defaultHTMLElementModels.label.extend({
      contentModel: HTMLContentModel.block,
    }),
    input: defaultHTMLElementModels.input.extend({
      contentModel: HTMLContentModel.block,
    }),
  };
  const renderers = {
    img: CustomImageRenderer,
  };
  const tagsStyles = {
    img: {
      width: 60,
      height: 60,

    },
    p: {
      color: 'black',
    }
  };
  // console.log("Content ", news?.attributes?.imgUrl)
  // const defaultTextProps = {
  //   numberOfLines: 20,
  // };
  const [cardHeight, setCardHeight] = useState(screenHeight);
  const onLayout = event => {
    let height = event.nativeEvent.layout.height;
    if (height > screenHeight) setCardHeight(height);
  }
  console.log("Card Height : ", cardHeight);
  console.log("Screen Height : ", height - StatusBar.currentHeight - 10);
  return (
    // <View activeOpacity={1} style={styles.card}>
    //   <Text style={styles.header}>{card?.attributes?.title ?? ""}</Text>
    //   <Text style={styles.abstract}>{card?.attributes?.abstract ?? ""}</Text>
    //   <Text style={styles.text}>
    //     {`${card?.attributes?.details?.slice(0, 45)}...`}
    //   </Text>
    // </View>

    <View style={[styles.card, { width: screenWidth - 30 }]} >
      <View>
        <Text style={styles.header}>{news?.attributes?.title ?? ""}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <TouchableWithoutFeedback
          style={{ flex: 1 }}
          onPress={() => {
            news.attributes.more_content
              ? navigation.navigate(Routes.CARD_DETAILS_SCREEN, {
                cardDetails: news,
              })
              : null;
          }}
        >
          <View style={{ flex: 1, borderColor: "red", borderWidth: 5, alignItems: 'center' }} >
            <Image source={{ uri: news?.attributes?.imgUrl }} style={{
              height: 50,
              resizeMode: "contain",
              width: width,
            }} />
            <RenderHtml
              contentWidth={width}
              source={{ html: news?.attributes?.content }}
              customHTMLElementModels={customHTMLElementModels}
              renderers={renderers}
              tagsStyles={tagsStyles}
              ignoredStyles={["height", "width"]}
              enableExperimentalMarginCollapsing={true}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View
        style={{
          height: 40,
          marginTop: 8,
          marginBottom: 8,
          flexDirection: "row",
          justifyContent: "center",
          alignSelf: "flex-end",
          alignItems: "flex-end",
        }}
      >
        <TouchableOpacity style={styles.button} onPress={onShare}>
          <Ionicons name="md-share-social" color={color.primary} size={26} />
        </TouchableOpacity>
        <View style={styles.button}>
          <Ionicons name="md-add-sharp" color={color.primary} size={26} />
        </View>
        <TouchableOpacity
          onPress={() => {
            openBottomSheet({
              type: SheetOptions.CUSTOM_LIST,
              selectOptions: [
                { label: "Like", icon: "like1" },
                { label: "Unlike", icon: "dislike1" },
                { label: "Report", icon: "questioncircle" },
              ],
              onPressItem: (option) => {
                console.log("optionn", option);
              },
              value: "Take Image",
              snaps: ["20%", height / 4],
              itemLayout: ({
                item: { label, icon },
                index,
                callback,
                closeBottomSheet,
              }) => {
                return (
                  <TouchableOpacity
                    style={styles.customListItem(index % 2)}
                    key={index.toString()}
                    onPress={() => {
                      callback.current(label);
                      closeBottomSheet();
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        // justifyContent: "center",
                        // marginVertical: 0,
                        // marginHorizontal: "auto",
                        alignItems: "center",
                      }}
                    >
                      <AntDesign name={icon} color={color.primary} size={24} />
                      <Text style={styles.title}>{label}</Text>
                    </View>
                  </TouchableOpacity>
                );
              },
            });
          }}
        >
          <Ionicons name="ellipsis-vertical" color={color.primary} size={26} />
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    /* Setting the height according to the screen height, it also could be fixed value or based on percentage. */
    // height: height - tabBarHeight,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    flex: 1,
    shadowRadius: 6,
    shadowOpacity: 0.3,
    padding: 10,
    marginTop: 7,
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 2,
    // flexDirection: "column",
  },
  header: {
    // margin: 10,
    marginTop: 10,
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
  container: {
    flexDirection: "column",
  },
  button: {
    width: "15%",
  },
  customListItem: (isEven) => ({
    width: "100%",
    flexDirection: "column",
    paddingHorizontal: 10,
    paddingVertical: 10,
    flex: 1,
  }),
  title: {
    fontSize: 16,
    color: color.palette.navyTwo,
    marginLeft: 10,
  },
  btnContainer: {
    flexDirection: "row",
    alignSelf: "flex-end",
    // paddingTop: 15,
    // paddingBottom: 15,
    // marginRight: 15,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
});
