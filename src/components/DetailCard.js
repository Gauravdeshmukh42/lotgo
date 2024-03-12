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
} from 'react-native';
const {height, width} = Dimensions.get('window');
import {
  CARD_HEIGHT,
  CARD_IMAGE_HEIGHT,
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
} from 'react-native-render-html';
import {getFormatedImageUrl} from '../utils/imageUrlManipulation';
import {ScrollView} from 'react-native-gesture-handler';
const screenWidth = width;
export const DetailCard = ({news, cardIndex}) => {
  const {openBottomSheet} = useBottomSheet();
  const navigation = useNavigation();
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

  const tagsStyles = {
    p: {
      color: 'black',
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
  return (
    <View style={[styles.card, {width: screenWidth - 30}]}>
      <View>
        <Text style={styles.header}>{news?.attributes?.title ?? ''}</Text>
      </View>

      <View
        style={{
          // borderColor: 'green',
          // borderWidth: 5,
          // height: 'auto',
          alignItems: 'center',
        }}>
        <View>
          <RenderHtml
            contentWidth={SCREEN_WIDTH * 0.7}
            source={{html: news?.attributes?.content}}
            customHTMLElementModels={customHTMLElementModels}
            tagsStyles={tagsStyles}
            ignoredStyles={['height', 'width']}
            enableExperimentalMarginCollapsing={true}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    overflow: 'hidden',
    // height: 'auto',
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
