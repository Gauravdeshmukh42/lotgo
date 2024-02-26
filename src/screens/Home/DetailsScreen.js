import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import {Screen} from '../../ui';
const {height, width} = Dimensions.get('window');
import Swiper from '../../components/common/Swiper';
const screenHeight = Math.round((width * 9) / 16);
import RenderHtml, {
  defaultHTMLElementModels,
  HTMLContentModel,
} from 'react-native-render-html';
import {useState} from 'react';
import {Card} from '../../components/Card';
import DeepStash from './DeepStash';
import Horizontal from './Horizontal';
import List from './List';
// import LoadingBar from 'react-top-loading-bar';
const DetailsScreen = ({navigation, route}) => {
  const [cardIndex, setCardIndex] = useState(0);
  const onSwipedTopCard = index => {
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
  // console.log(details.attributes.more_content);
  return (
    <Screen variant={'scroll'}>
      <View style={styles.container}>
        {details?.attributes?.more_content ? (
          <Swiper
            data={details.attributes.more_content}
            cardIndex={cardIndex}
            renderCard={(news)=> <Card news={news} cardIndex={cardIndex}/>}
            onSwipedTop={index => onSwipedTopCard(index)}
            onSwipedBottom={index => onSwipedBottomCard(index)}
          />
        ) : (
          <View style={styles.noData}>
            <Text>No Data Available</Text>
          </View>
        )}
        {/* <Horizontal data={details.attributes.more_content}/> */}
        {/* <List data={details.attributes.more_content} /> */}

        {/* <DeepStash data={details.attributes.more_content}/> */}
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
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: 'black',
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
    flex: 1,
    borderColor: 'red',
    borderWidth: 5,
    width: width - 30,
    alignItems: 'center',
  },
  header: {
    margin: 10,
    fontWeight: 'bold',
    color: 'black',
    fontSize: 20,
    textTransform: 'capitalize',
  },
  abstract: {
    margin: 10,
    color: 'black',
    fontSize: 16,
  },
});
