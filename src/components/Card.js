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
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {addBookmark, removeBookmark} from '../redux/slices';
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
    img: defaultHTMLElementModels.img.extend({
      contentModel: HTMLContentModel.block,
    }),
  };
  const renderers = {
    img: CustomImageRenderer,
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
    img: {
      height: 50,
      width: 50,
      objectFit: 'contain',
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

  // console.log('Bookmark', isBookmarked);
  return (
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
              // borderColor: 'green',
              // borderWidth: 5,
              overflow: 'hidden',
              alignItems: 'center',
              flex: 1,
            }}>
            <View>
              <RenderHtml
                contentWidth={SCREEN_WIDTH * 0.7}
                source={{html: news?.attributes?.content}}
                customHTMLElementModels={customHTMLElementModels}
                // renderers={renderers}
                tagsStyles={tagsStyles}
                ignoredStyles={['height', 'width']}
                enableExperimentalMarginCollapsing={true}
              />
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
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (!isBookmarked) {
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
                    addBookmark({collectionId: option, bookmark: newBookmark}),
                  );
                },
                value: 'Take Image',
                snaps: ['20%', height / 4],
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
            } else {
              const collectionID = collection.find(item =>
                item.bookmarks.some(
                  bookmark =>
                    bookmark.attributes.title === news.attributes.title,
                ),
              ).id;
              dispatch(
                removeBookmark({
                  collectionId: collectionID,
                  bookmarkTitle: news.attributes.title,
                }),
              );
            }
          }}>
          <Ionicons
            name={isBookmarked ? 'bookmarks' : 'bookmarks-outline'}
            color={color.primary}
            size={26}
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
    // borderStyle: 'solid',
    // borderColor: 'red',
    // borderWidth: 2,
    zIndex: 1,
    color: 'white',
    // height: 'auto',

    overflow: 'hidden',
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
