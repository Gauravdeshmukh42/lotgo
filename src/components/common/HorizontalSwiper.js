import React from 'react';
import {
  Directions,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {OFFSET, SCREEN_WIDTH} from '../../screens/Home/HeightConstants';
import {FlatList, StatusBar, useColorScheme} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Gesture} from 'react-native-gesture-handler';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import HorizontalSwiperCard from './HorizontalSwiperCard';
import {useState, useRef} from 'react';
import Animated from 'react-native-reanimated';
const VIEW_THRESHOLD = 80;
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
  const [resetScrollIndex, setResetScrollIndex] = useState(-1);
  const renderItem = ({item, index}) => {
    return (
      <HorizontalSwiperCard
        key={index}
        cardIndex={index}
        content={item}
        resetScroll={resetScrollIndex === index}
      />
    );
  };
  const keyExtractor = (item, index) => {
    return index.toString();
  };
  function onViewableItemsChanged(info) {
    const visibleItem = info.viewableItems[0];
    if (visibleItem && visibleItem.index !== null) {
      setResetScrollIndex(visibleItem.index);
    }
  }
  const viewabilityConfigCallbackPairs = useRef([{onViewableItemsChanged}]);
  const getItemLayout = (data, index) => ({
    length: SCREEN_WIDTH,
    offset: SCREEN_WIDTH * index,
    index,
  });
  // console.log('Data', data);
  return (
    <SafeAreaView style={[backgroundStyle, {flex: 1}]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      {/* <GestureDetector gesture={flingGestureLeft}>
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
      </GestureDetector> */}
      <Animated.FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal
        snapToInterval={SCREEN_WIDTH}
        disableIntervalMomentum
        decelerationRate={0.9}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        viewabilityConfig={{viewAreaCoveragePercentThreshold: VIEW_THRESHOLD}}
        getItemLayout={getItemLayout}
      />
    </SafeAreaView>
  );
};
const HorizontalSwiperRoot = ({data}) => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <HorizontalSwiper data={data} />
    </GestureHandlerRootView>
  );
};

export default HorizontalSwiperRoot;
