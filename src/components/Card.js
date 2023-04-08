import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Share,
  TouchableWithoutFeedback,
  useWindowDimensions,
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
const screenHeight = Math.round((width * 9) / 16);
const screenWidth = width;
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
      width: width,
    },
  };

  // const defaultTextProps = {
  //   numberOfLines: 20,
  // };
  return (
    // <View activeOpacity={1} style={styles.card}>
    //   <Text style={styles.header}>{card?.attributes?.title ?? ""}</Text>
    //   <Text style={styles.abstract}>{card?.attributes?.abstract ?? ""}</Text>
    //   <Text style={styles.text}>
    //     {`${card?.attributes?.details?.slice(0, 45)}...`}
    //   </Text>
    // </View>
    <View style={[styles.card, { height: screenHeight, width: screenWidth }]}>
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
          <View style={{ flex: 1 }}>
            <RenderHtml
              contentWidth={width - 30}
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
    borderRadius: 5,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.3,
    flex: 1,
    padding: 10,
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
});
