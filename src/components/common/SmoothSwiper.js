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
import posts from '../../screens/Home/constants';
import {OFFSET, SCREEN_HEIGHT} from '../../screens/Home/HeightConstants';
import {StatusBar, useColorScheme} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import SwiperCard from './SwiperCard';
import {Gesture} from 'react-native-gesture-handler';
import {Colors} from 'react-native/Libraries/NewAppScreen';
const SmoothSwiper = ({data}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const translateY = useSharedValue(-OFFSET);
  const startY = useSharedValue(0);
  const index = useSharedValue(0);
  const flingGestureUP = Gesture.Fling()
    .direction(Directions.UP)
    .onStart(() => {
      if (index.value === data.length - 1) {
        return;
      }
      translateY.value = withTiming(
        -SCREEN_HEIGHT * (index.value + 1),
        {duration: 400},
        () => {
          startY.value = translateY.value;
        },
      );
      index.value = index.value + 1;
    });
  const flingGestureDOWN = Gesture.Fling()
    .direction(Directions.DOWN)
    .onStart(() => {
      if (index.value === 0) {
        return;
      }
      translateY.value = withTiming(
        -SCREEN_HEIGHT * (index.value - 1),
        {duration: 400},
        () => {
          startY.value = translateY.value;
        },
      );
      index.value = index.value - 1;
    });
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  }, []);
  function onScrollToEnd(contentOffset, layoutMeasurement, contentHeight) {
    'worklet';
    if (contentOffset.y + layoutMeasurement.height >= contentHeight) {
      if (index.value === data.length - 1) return;
      //get the gesture direction if it is up then only swipe to next card

      translateY.value = withTiming(
        -SCREEN_HEIGHT * (index.value + 1),
        {duration: 400},
        () => {
          startY.value = translateY.value;
        },
      );
      index.value = index.value + 1;
    }
  }
  return (
    <SafeAreaView style={[backgroundStyle, {flex: 1}]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <GestureDetector gesture={flingGestureDOWN}>
        <GestureDetector gesture={flingGestureUP}>
          <Animated.View style={animatedStyles}>
            {data.map((post, idx) => {
              return (
                <SwiperCard
                  key={idx}
                  index={idx}
                  currentIndex={index}
                  translateY={translateY}
                  onScrollToEnd={onScrollToEnd}
                  content={post}
                />
              );
            })}
          </Animated.View>
        </GestureDetector>
      </GestureDetector>
    </SafeAreaView>
  );
};
const SmoothSwiperRoot = ({data}) => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SmoothSwiper data={data} />
    </GestureHandlerRootView>
  );
};

export default SmoothSwiperRoot;
