import React from 'react';
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
  Modal,
  Pressable,
} from 'react-native';
const {height, width} = Dimensions.get('window');
import {CARD_IMAGE_HEIGHT, SCREEN_WIDTH} from '../screens/Home/HeightConstants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {SheetOptions, useBottomSheet} from '../context';
import {color} from '../theme';
import Routes from '../navigation/routes';
import {useNavigation} from '@react-navigation/native';
import RenderHtml, {
  defaultHTMLElementModels,
  HTMLContentModel,
  useInternalRenderer,
} from 'react-native-render-html';
import {getFormatedImageUrl} from '../utils/imageUrlManipulation';
import {useState} from 'react';
import {useEffect} from 'react';
import {useRef} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {set, toLower, view} from 'ramda';
import {useRoute} from '@react-navigation/native';
import {SCREEN_HEIGHT, TouchableHighlight} from '@gorhom/bottom-sheet';
import {MAX_HEIGHT_CONTENT} from '../screens/Home/HeightConstants';
const screenHeight = Math.round((width * 3) / 5);
const screenWidth = width;
// console.log('Screen Height ', screenHeight);

const CustomImageRenderer = props => {
  const {Renderer, rendererProps} = useInternalRenderer('img', props);
  const uri = rendererProps.source.uri;
  const thumbnailSource = {
    ...rendererProps.source,
    // You could change the uri here, for example to provide a thumbnail.
    uri: getFormatedImageUrl(uri),
  };
  return <Renderer {...rendererProps} source={thumbnailSource} />;
};
// console.log('Height', screenHeight, 'Width', width);
export const Card = ({news, cardIndex}) => {
  const {openBottomSheet} = useBottomSheet();
  const navigation = useNavigation();
  const {width, height} = useWindowDimensions();
  const route = useRoute();
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
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
    button: defaultHTMLElementModels.button.extend({
      contentModel: HTMLContentModel.block,
    }),
  };
  const renderers = {
    img: CustomImageRenderer,
  };
  const tagsStyles = {
    // img: {
    //   // width: 100,
    //   // height: 100,
    //   enableExperimentalPercentWidth: true,
    // },
    p: {
      // color: 'white',
      color: 'black',
    },
    button: {
      width: 90,
      color: 'blue',
    },
    h1: {
      color: 'black',
    },
  };
  const [visible, setVisible] = useState(false);
  const [buttonFlag, setButtonFlag] = useState(false);
  const toggleSwitch = () => {
    setVisible(previousState => !previousState);
  };
  const [content, setContent] = useState(news?.attributes?.content);
  const [totalHeight, setTotalHeight] = useState((height * 80) / 100);
  const getTotalHeight = event => {
    setTotalHeight(event.nativeEvent.layout.height);
    // console.log('Real Height : ', event.nativeEvent.layout.height);
  };
  const truncateHTML = (html, maxLength) => {
    const truncated = html.slice(0, maxLength);
    const lastTagIndex = truncated.lastIndexOf('>');
    return truncated.substring(0, lastTagIndex + 1);
  };
  const expectedHeight = (totalHeight * 80) / 100;
  const compressContent = event => {
    // console.log('Total Height', totalHeight);
    // console.log('Expected Height', expectedHeight);
    // if (event.nativeEvent.layout.height > expectedHeight) {
    //   setButtonFlag(true);
    //   const limit = height + totalHeight - expectedHeight;
    //   console.log('limit', limit);
    //   // setContent(truncateHTML(news?.attributes?.content, limit));
    // }
  };
  // const getHeightOfChildContainer = event => {
  //   // console.log('Height of Child Container', event.nativeEvent.layout.height);
  //   // setChildHeight(event.nativeEvent.layout.height);
  //   if (childRef.current) {
  //     childRef.current.measure(height => {
  //       console.log('Parent Height', height);
  //     });
  //   }
  // };
  // const parentRef = useRef(null);
  // const childRef = useRef(null);
  // const [isOverflowing, setIsOverflowing] = useState(true);
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   if (childRef.current && parentRef.current) {
  //     childRef.current.measure((childX, childY, childWidth, childHeight) => {
  //       parentRef.current.measure(
  //         (parentX, parentY, parentWidth, parentHeight) => {
  //           setIsOverflowing(childHeight > parentHeight);
  //           setLoading(false);
  //           console.log("Card Index : ", cardIndex);
  //           console.log('Child Height', childHeight);
  //           console.log('Parent Height', parentHeight);
  //           console.log('Overflow', childHeight > parentHeight);
  //         },
  //       );
  //     });
  //   }
  //   console.log('Child Height23');
  //   console.log(cardIndex);
  // }, [parentRef.current, childRef.current,cardIndex]);
  const [contentHeight, setContentHeight] = useState(0);
  const showMore = contentHeight > MAX_HEIGHT_CONTENT;
  console.log('*******CARD INDEX********', cardIndex);
  console.log('Max height', MAX_HEIGHT_CONTENT);
  console.log('Content Height', contentHeight);
  console.log('ShowMore', showMore);

  const handleLayout = event => {
    const height = event.nativeEvent.layout.height;
    setContentHeight(height);
  };
  return visible ? (
    <Modal>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 30,
          marginTop: 15,
        }}>
        <ScrollView style={styles.overlay}>
          <Pressable onPress={toggleSwitch}>
            <RenderHtml
              contentWidth={screenWidth}
              source={{html: content}}
              customHTMLElementModels={customHTMLElementModels}
              renderers={renderers}
              tagsStyles={tagsStyles}
              ignoredStyles={['height', 'width']}
              enableExperimentalMarginCollapsing={true}
            />
          </Pressable>
        </ScrollView>
      </View>
    </Modal>
  ) : (
    <View style={[styles.card, {width: screenWidth - 30}]}>
      <View>
        <Text style={styles.header}>{news?.attributes?.title ?? ''}</Text>
      </View>
      <View style={{flex: 1}}>
        <TouchableWithoutFeedback
          style={{flex: 1}}
          onPress={() => {
            news.attributes.more_content
              ? navigation.navigate(Routes.CARD_DETAILS_SCREEN, {
                  cardDetails: news,
                })
              : null;
          }}>
          <View
            style={{
              flex: 1,
              borderColor: 'white',
              borderWidth: 5,
              alignItems: 'center',
              // height: 'auto',
              overflow: 'hidden',
            }}
            onLayout={compressContent}>
            {news?.attributes?.imgUrl ? (
              <Image
                source={{uri: news?.attributes?.imgUrl}}
                style={{
                  height: 50,
                  resizeMode: 'contain',
                  width: width,
                }}
              />
            ) : null}

            <View
              style={{borderColor: 'red', borderWidth: 5, height: 'auto'}}
              onLayout={handleLayout}>
              <View>
                <RenderHtml
                  contentWidth={SCREEN_WIDTH * 0.7}
                  source={{html: content}}
                  customHTMLElementModels={customHTMLElementModels}
                  renderers={renderers}
                  tagsStyles={tagsStyles}
                  ignoredStyles={['height', 'width']}
                  enableExperimentalMarginCollapsing={true}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View
        style={{
          height: 40,
          marginTop: 8,
          marginBottom: 8,
          flexDirection: 'row',
          justifyContent: 'center',
          alignSelf: 'flex-end',
          alignItems: 'flex-end',
        }}>
        <TouchableOpacity style={styles.button} onPress={onShare}>
          <Ionicons name="md-share-social" color={color.primary} size={26} />
        </TouchableOpacity>
        <View style={styles.button}>
          <Ionicons name="md-add-sharp" color={color.primary} size={26} />
        </View>
        {showMore ? (
          <View style={{marginRight: 5}}>
            <Ionicons
              name="book"
              size={26}
              color={color.primary}
              onPress={toggleSwitch}
            />
          </View>
        ) : null}

        <TouchableOpacity
          onPress={() => {
            openBottomSheet({
              type: SheetOptions.CUSTOM_LIST,
              selectOptions: [
                {label: 'Like', icon: 'like1'},
                {label: 'Unlike', icon: 'dislike1'},
                {label: 'Report', icon: 'questioncircle'},
              ],
              onPressItem: option => {
                console.log('optionn', option);
              },
              value: 'Take Image',
              snaps: ['20%', height / 4],
              itemLayout: ({
                item: {label, icon},
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
                    }}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        // justifyContent: "center",
                        // marginVertical: 0,
                        // marginHorizontal: "auto",
                        alignItems: 'center',
                      }}>
                      <AntDesign name={icon} color={color.primary} size={24} />
                      <Text style={styles.title}>{label}</Text>
                    </View>
                  </TouchableOpacity>
                );
              },
            });
          }}>
          <Ionicons name="ellipsis-vertical" color={color.primary} size={26} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    // backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 10,
    width: SCREEN_WIDTH - 10,
    padding: 10,
    height: 'auto',
  },
  card: {
    /* Setting the height according to the screen height, it also could be fixed value or based on percentage. */
    // height: height - tabBarHeight,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: '#5e5858',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    flex: 1,
    shadowRadius: 6,
    shadowOpacity: 0.3,
    padding: 10,
    marginTop: 7,
    borderStyle: 'solid',
    borderColor: 'white',
    borderWidth: 2,
    zIndex: 1,
    color: 'white',
    height: 'auto',
    // flexDirection: "column",
  },
  header: {
    // margin: 10,
    marginTop: 10,
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
    textTransform: 'capitalize',
  },
  abstract: {
    margin: 10,
    color: 'black',
    fontSize: 16,
  },
  container: {
    flexDirection: 'column',
  },
  button: {
    width: '15%',
  },
  customListItem: isEven => ({
    width: '100%',
    flexDirection: 'column',
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
    flexDirection: 'row',
    alignSelf: 'flex-end',
    // paddingTop: 15,
    // paddingBottom: 15,
    // marginRight: 15,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
});
