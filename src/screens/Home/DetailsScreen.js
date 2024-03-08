import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
const {height, width} = Dimensions.get('window');
import SmoothSwiperRoot from '../../components/common/SmoothSwiper';
import Swiper from '../../components/common/Swiper';
import {Card} from '../../components/Card';
import {useState} from 'react';
import {Screen} from '../../ui';
import {ScrollView} from 'react-native-gesture-handler';
import {DetailCard} from '../../components/DetailCard';
const DetailsScreen = ({navigation, route}) => {
  const [cardIndex, setCardIndex] = useState(0);
  const onSwipedTop = index => {
    setCardIndex(index + 1);
  };
  const onSwipedBottom = index => {
    setCardIndex(index - 1);
  };
  const details = route.params.cardDetails;
  return (
    <Screen variant={'scroll'}>
      <View style={styles.container}>
        {details?.attributes?.more_content ? (
          // <SmoothSwiperRoot data={details?.attributes?.more_content} />
          <Swiper
            data={details.attributes.more_content}
            cardIndex={cardIndex}
            renderCard={news => (
              <ScrollView>
                <DetailCard news={news} cardIndex={cardIndex} />
              </ScrollView>
            )}
            onSwipedTop={index => onSwipedTop(index)}
            onSwipedBottom={index => onSwipedBottom(index)}
          />
        ) : (
          <View style={styles.noData}>
            <Text>No Data Available</Text>
          </View>
        )}
      </View>
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
