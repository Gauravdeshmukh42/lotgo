import React from 'react';
import {
  Directions,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {OFFSET, SCREEN_WIDTH} from '../../screens/Home/HeightConstants';
import {StatusBar, useColorScheme} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Gesture} from 'react-native-gesture-handler';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import HorizontalSwiperCard from './HorizontalSwiperCard';
import {useState} from 'react';
const HorizontalSwiper = ({data}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const translateX = useSharedValue(-OFFSET);
  const startX = useSharedValue(0);
  const index = useSharedValue(0);
  const flingGestureLeft = Gesture.Fling()
    .direction(Directions.LEFT)
    .onStart(() => {
      if (index.value === data.length - 1) {
        return;
      }

      translateX.value = withTiming(
        -SCREEN_WIDTH * (index.value + 1),
        {duration: 400},
        () => {
          startX.value = translateX.value;
        },
      );
      index.value = index.value + 1;
    });
  const flingGestureRight = Gesture.Fling()
    .direction(Directions.RIGHT)
    .onStart(() => {
      if (index.value === 0) {
        return;
      }

      translateX.value = withTiming(
        -SCREEN_WIDTH * (index.value - 1),
        {duration: 400},
        () => {
          startX.value = translateX.value;
        },
      );
      index.value = index.value - 1;
    });
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
    };
  }, []);
  return (
    <SafeAreaView style={[backgroundStyle, {flex: 1}]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <GestureHandlerRootView style={{flex: 1}}>
        <GestureDetector gesture={flingGestureLeft}>
          <GestureDetector gesture={flingGestureRight}>
            <Animated.View style={[animatedStyles, {flexDirection: 'row'}]}>
              {data.map((post, idx) => {
                return (
                  <HorizontalSwiperCard
                    key={idx}
                    index={idx}
                    currentIndex={index}
                    translateX={translateX}
                    content={post}
                  />
                );
              })}
            </Animated.View>
          </GestureDetector>
        </GestureDetector>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};
const HorizontalSwiperRoot = ({data}) => {
  return (
    <HorizontalSwiper data={data} />
    // </GestureHandlerRootView>
  );
};

export default HorizontalSwiperRoot;
