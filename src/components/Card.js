import React, {useEffect, useState} from 'react';
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
  ImageBackground,
} from 'react-native';
const {height, width} = Dimensions.get('window');
import {
  CARD_IMAGE_HEIGHT,
  HOME_CARD_HEIGHT,
  SCREEN_WIDTH,
} from '../screens/Home/HeightConstants';
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
  TDefaultRenderer,
  TNode,
} from 'react-native-render-html';
import {getFormatedImageUrl} from '../utils/imageUrlManipulation';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {addBookmark, removeBookmark} from '../redux/slices';
// import CheckBox from '@react-native-community/checkbox';
import CheckBox from 'react-native-check-box';
import {set} from 'ramda';
const screenWidth = width;
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
export const Card = ({news, cardIndex}) => {
  const {openBottomSheet} = useBottomSheet();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {collection} = useSelector(state => state.bookmark);
  const {width, height} = useWindowDimensions();

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

  const tagsStyles = {
    p: {
      color: 'white',
    },
    button: {
      width: 90,
      color: 'blue',
    },
    h1: {
      color: 'black',
    },
  };
  const selectOptions = collection.map(item => ({
    label: item.name,
    icon: 'plus',
    id: item.id,
  }));

  const isBookmarked = collection.some(item =>
    item.bookmarks.some(
      bookmark => bookmark.attributes.title === news.attributes.title,
    ),
  );

  const imgSrcRegex = /<img.*?src="(.*?)"/;
  const match = news?.attributes?.content.match(imgSrcRegex);
  let imgUrl;
  if (match && match[1]) {
    imgUrl = {uri: match[1]};
  }
  const whetherBookmarkPresent = (collectionName, BookmarkName) => {
    const currentCollection = collection.find(
      item => item.name === collectionName,
    );
    if (currentCollection) {
      const bookmark = currentCollection.bookmarks.some(
        bookmark => bookmark.attributes.title === BookmarkName,
      );
      if (bookmark) return true;
    }
    return false;
  };
  // console.log('Bookmark', isBookmarked);
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        news.attributes.more_content
          ? navigation.navigate(Routes.CARD_DETAILS_SCREEN, {
              cardDetails: news,
            })
          : null;
      }}>
      <View style={[styles.card, {width: screenWidth - 30}]}>
        <View style={{flex: 1}}>
          <Image
            source={imgUrl}
            style={{width: '100%', height: HOME_CARD_HEIGHT * 0.65}}
            resizeMode="cover"
          />
          <RenderHtml
            contentWidth={SCREEN_WIDTH * 0.7}
            source={{html: news?.attributes?.content}}
            customHTMLElementModels={customHTMLElementModels}
            renderers={{
              img: (TNode, TDefaultRenderer) => null,
            }}
            tagsStyles={tagsStyles}
            ignoredStyles={['height', 'width']}
            enableExperimentalMarginCollapsing={true}
          />
        </View>

        <View style={styles.desContainer}>
          <Text style={styles.header}>{news?.attributes?.title ?? ''}</Text>
        </View>
        <View
          style={{
            height: 40,
            // marginTop: 8,
            marginBottom: 15,
            flexDirection: 'row',
            justifyContent: 'center',
            alignSelf: 'flex-end',
            alignItems: 'flex-end',
            // backgroundColor: 'white',
          }}>
          <TouchableOpacity style={styles.button} onPress={onShare}>
            <Ionicons name="md-share-social" color={color.primary} size={24} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              // if (!isBookmarked) {
              openBottomSheet({
                type: SheetOptions.CUSTOM_LIST,
                selectOptions,
                onPressItem: option => {
                  const newBookmark = {
                    id: collection.length + 1,
                    attributes: {
                      title: news.attributes.title,
                      content: news.attributes.content,
                    },
                  };
                  dispatch(
                    addBookmark({
                      collectionId: option,
                      bookmark: newBookmark,
                    }),
                  );
                },
                value: 'Take Image',
                snaps: ['20%', height / 2],
                itemLayout: ({
                  item: {label, icon, id},
                  index,
                  callback,
                  closeBottomSheet,
                }) => {
                  return (
                    <TouchableOpacity
                      style={styles.customListItem(index % 2)}
                      key={index.toString()}
                      // onPress={() => {
                      //   callback.current(label);
                      //   closeBottomSheet();
                      // }}
                    >
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                        <Text style={styles.title}>{label}</Text>

                        <CheckBox
                          style={{flex: 1, padding: 10}}
                          onClick={() => {
                            if (
                              !whetherBookmarkPresent(
                                label,
                                news.attributes.title,
                              )
                            ) {
                              callback.current(label);
                              closeBottomSheet();
                            } else {
                              const currCollection = collection.find(
                                item => item.name === label,
                              );

                              dispatch(
                                removeBookmark({
                                  collectionId: currCollection.id,
                                  bookmarkTitle: news.attributes.title,
                                }),
                              );
                              closeBottomSheet();
                            }
                          }}
                          isChecked={whetherBookmarkPresent(
                            label,
                            news.attributes.title,
                          )}
                          leftText={'CheckBox'}
                        />
                      </View>
                    </TouchableOpacity>
                  );
                },
              });
              // } else {

              // }
            }}>
            <Ionicons
              name={isBookmarked ? 'bookmarks' : 'bookmarks-outline'}
              color={color.primary}
              size={24}
            />
          </TouchableOpacity>
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
                          alignItems: 'center',
                        }}>
                        <AntDesign
                          name={icon}
                          color={color.primary}
                          size={24}
                        />
                        <Text style={styles.title}>{label}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                },
              });
            }}>
            {/* <Ionicons
              name="ellipsis-vertical"
              color={color.primary}
              size={26}
            /> */}
          </TouchableOpacity>
        </View>
        {/* </LinearGradient> */}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#5e5858',
    // borderColor: 'green',
    // borderWidth: 5,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    height: HOME_CARD_HEIGHT,
    shadowRadius: 6,
    shadowOpacity: 0.3,
    // padding: 10,
    marginTop: 7,
    color: color.palette.mainLightColor,
    // borderStyle: 'solid',
    // borderColor: 'red',
    // borderWidth: 2,
    // height: 'auto',
    overflow: 'hidden',
  },
  header: {
    // margin: 10,
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
  imageBackground: {
    flex: 1,
    padding: 10,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 50},
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  desContainer: {
    padding: 10,
  },
});
