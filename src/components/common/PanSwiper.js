import React, {useRef} from 'react';
import {
  PanResponder,
  Dimensions,
  View,
  Animated,
  StatusBar,
  useColorScheme,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import SwiperCard from './SwiperCard';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useAnimatedStyle} from 'react-native-reanimated';
import {useSharedValue} from 'react-native-reanimated';
import {OFFSET, SCREEN_HEIGHT} from '../../screens/Home/HeightConstants';
import {withTiming} from 'react-native-reanimated';
const PanSwiper = ({data}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const translateY = useSharedValue(-OFFSET);
  const startY = useSharedValue(0);
  const index = useSharedValue(0);
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        translateY.value = gestureState.dy + startY.value;
      },
      onPanResponderRelease: (_, gestureState) => {
        const {dy} = gestureState;
        if (Math.abs(dy) > 50) {
          if (dy < 0 && index.value < data.length - 1) {
            translateY.value = withTiming(
              -SCREEN_HEIGHT * (index.value + 1),
              {duration: 400},
              () => {
                startY.value = translateY.value;
              },
            );
            index.value = index.value + 1;
          } else if (dy > 0 && index.value > 0) {
            translateY.value = withTiming(
              -SCREEN_HEIGHT * (index.value - 1),
              {duration: 400},
              () => {
                startY.value = translateY.value;
              },
            );
            index.value = index.value - 1;
          }
        } else {
          translateY.value = withTiming(
            -SCREEN_HEIGHT * index.value,
            {duration: 400},
            () => {
              startY.value = translateY.value;
            },
          );
        }
      },
    }),
  ).current;

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  }, []);

  function onScrollToEnd() {
    'worklet';
    translateY.value = withTiming(
      -SCREEN_HEIGHT * (index.value + 1),
      {duration: 400},
      () => {
        startY.value = translateY.value;
      },
    );
    index.value = index.value + 1;
  }

  return (
    <SafeAreaView
      {...panResponder.panHandlers}
      style={[styles.container, backgroundStyle]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{translateY: translateY.value}],
          },
        ]}>
        {data.map((post, idx) => (
          <SwiperCard
            key={idx}
            index={idx}
            currentIndex={index}
            translateY={translateY}
            onScrollToEnd={onScrollToEnd}
            content={post}
          />
        ))}
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PanSwiper;
