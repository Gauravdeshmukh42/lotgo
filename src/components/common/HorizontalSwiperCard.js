import React from 'react';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {
  CARD_HEIGHT,
  SCREEN_WIDTH,
  STATUSBAR_HEIGHT,
} from '../../screens/Home/HeightConstants';
import RenderHtml from 'react-native-render-html';
import {StyleSheet} from 'react-native';
import {interpolate} from 'react-native-reanimated';

import HorizontalSwiperParent from './HorizontalSwiperParent';
const HorizontalSwiperCard = ({index, translateX, content}) => {
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
            translateX.value,
            [
              -SCREEN_WIDTH * (index + 1),
              -SCREEN_WIDTH * index,
              -SCREEN_WIDTH * (index - 1),
            ],
            [0.9, 1.05, 0.9],
          ),
        },
      ],
    };
  }, []);
  return (
    <Animated.View style={[styles.card, animatedStyles]}>
      <HorizontalSwiperParent>
        <RenderHtml
          contentWidth={SCREEN_WIDTH * 0.7}
          source={{html: content?.attributes?.content}}
          tagsStyles={tagsStyles}
        />
      </HorizontalSwiperParent>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  card: {
    height: CARD_HEIGHT,
    width: SCREEN_WIDTH - 50,
    backgroundColor: '#f8f9fc',
    marginHorizontal: 25,
    marginVertical: STATUSBAR_HEIGHT,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'black',
    overflow: 'hidden',
  },
});
export default HorizontalSwiperCard;
