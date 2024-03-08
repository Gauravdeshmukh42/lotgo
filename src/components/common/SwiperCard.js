import React from 'react';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {
  CARD_HEIGHT,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  STATUSBAR_HEIGHT,
  CARD_OTHER_ELEMENTS_HEIGHT,
} from '../../screens/Home/HeightConstants';
import RenderHtml from 'react-native-render-html';
import {StyleSheet} from 'react-native';
import {interpolate} from 'react-native-reanimated';
import SwiperParent from './SwiperParent';
const SwiperCard = ({index, translateY, onScrollToEnd, content}) => {
  const tagsStyles = {
    p: {
      fontSize: 15,
      color: 'black',
    },
    h1: {
      color: 'black',
    },
  };
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            translateY.value,
            [
              -SCREEN_HEIGHT * (index + 1),
              -SCREEN_HEIGHT * index,
              -SCREEN_HEIGHT * (index - 1),
            ],
            [0.9, 1.05, 0.9],
          ),
        },
      ],
    };
  }, []);
  return (
    <Animated.View style={[styles.card, animatedStyles]}>
      <SwiperParent onScrollToEnd={onScrollToEnd}>
        <RenderHtml
          contentWidth={SCREEN_WIDTH * 0.7}
          source={{html: content?.attributes?.content}}
          tagsStyles={tagsStyles}
        />
      </SwiperParent>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  card: {
    height: CARD_HEIGHT,
    // marginBottom: 20,
    paddingBottom:20,
    backgroundColor: '#f8f9fc',
    marginHorizontal: 20,
    marginVertical: STATUSBAR_HEIGHT,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'black',
    overflow: 'hidden',
  },
});
export default SwiperCard;
