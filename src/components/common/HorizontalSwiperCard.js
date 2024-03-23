import React from 'react';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {
  CARD_HEIGHT,
  OFFSET,
  SCREEN_WIDTH,
  STATUSBAR_HEIGHT,
} from '../../screens/Home/HeightConstants';
import RenderHtml from 'react-native-render-html';
import {StyleSheet} from 'react-native';
import {View} from 'react-native';
import {useRef} from 'react';
import {useEffect} from 'react';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {Dimensions} from 'react-native';
import {SCREEN_HEIGHT} from '../../screens/Home/HeightConstants';
const HorizontalSwiperCard = ({content, resetScroll}) => {
  const {height: SCREEN_HEIGHT} = Dimensions.get('window');
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollToIndex({index: 0});
    }
  }, [resetScroll]);
  const keyExtractor = (item, index) => {
    return index.toString();
  };
  const renderItem = () => {
    // console.log('Content', content);
    return <CardItem item={content} />;
  };
  // console.log('Content', content);
  return (
    <View>
      <FlatList
        vertical
        data={[0]}
        ref={scrollRef}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
const CardItem = ({item}) => {
  const tagsStyles = {
    p: {
      fontSize: 15,
      color: 'black',
    },
    h1: {
      color: 'black',
    },
    img: {
      margin:2,
      width: SCREEN_WIDTH - 50,
      height: SCREEN_HEIGHT * 0.3,
      resizeMode: 'cover',
      borderRadius:5,
      // borderColor: 'black',
      // borderWidth: 5,
    },
  };
  // console.log('Item', item);
  return (
    <Animated.View style={styles.card}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <RenderHtml
          source={{
            html: item?.attributes?.content,
          }}
          contentWidth={SCREEN_WIDTH * 0.7}
          tagsStyles={tagsStyles}
        />
      </ScrollView>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  card: {
    width: SCREEN_WIDTH - 20,
    backgroundColor: '#f8f9fc',
    marginHorizontal: (SCREEN_WIDTH - (SCREEN_WIDTH - 20)) / 2,
    height: CARD_HEIGHT,
    borderRadius: 12,
    paddingHorizontal: 4,
  },
});
export default React.memo(HorizontalSwiperCard);
