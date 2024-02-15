import React, {useRef} from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  View,
  StatusBar,
  ScrollView,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {Screen} from '../../ui';
const {height} = Dimensions.get('screen');
const SCREEN_HEIGHT = Dimensions.get('window').height;
const INPUT_RANGE = [-height, 0, height];
const getScaleStyles = responder =>
  responder.y.interpolate({
    inputRange: INPUT_RANGE,
    outputRange: [1, 0.9, 1],
  });

const getTranslateYStyles = responder =>
  responder.y.interpolate({
    inputRange: INPUT_RANGE,
    outputRange: [0, 40, 0],
  });
// const getOpacityStyle = (responder) =>
//   responder.interpolate({
//     inputRange: [0, 0.5, 0.99],
//     outputRange: [1, 0, 1],
//   });
export default function Swiper({
  data,
  renderCard,
  cardIndex,
  onSwipedTop,
  onSwipedBottom,
}) {
  console.log('Screen Height', SCREEN_HEIGHT);
  console.log('Status Bar Height', StatusBar.currentHeight);
  const pan = useRef(new Animated.ValueXY()).current;
  const swipeCardPosition = useRef(
    new Animated.ValueXY({
      x: 0,
      y: -SCREEN_HEIGHT - StatusBar.currentHeight,
    }),
  ).current;

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderMove: (_, gestureState) => {
      if (
        (gestureState.dy > 0 && cardIndex === 0) ||
        (gestureState.dy < 0 && cardIndex === data.length - 1)
      ) {
        if (gestureState.dy < 0 && cardIndex === data.length - 1) {
          Toast.show({
            type: 'success',
            position: 'bottom',
            text1: 'You have read through all currently available cards.',
            visibilityTime: 3000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 20,
          });
        }
        return pan.setValue({
          y: 0,
          x: 0,
        });
      }
      if (gestureState.dy > 0 && cardIndex > 0) {
        swipeCardPosition.setValue({
          x: 0,
          y: -SCREEN_HEIGHT - StatusBar.currentHeight + gestureState.dy,
        });
      } else {
        pan.setValue({
          y: gestureState.dy,
          x: 0,
        });
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      if (cardIndex > 0 && gestureState.dy > 50) {
        Animated.timing(swipeCardPosition, {
          toValue: {x: 0, y: 0},
          duration: 200,
          useNativeDriver: true,
        }).start(() => {
          onSwipedBottom(cardIndex);
          swipeCardPosition.setValue({
            x: 0,
            y: -SCREEN_HEIGHT - StatusBar.currentHeight,
          });
        });
      } else if (cardIndex < data.length - 1 && -gestureState.dy > 50) {
        Animated.timing(pan, {
          toValue: {x: 0, y: -SCREEN_HEIGHT - StatusBar.currentHeight},
          duration: 200,
          useNativeDriver: true,
        }).start(() => {
          onSwipedTop(cardIndex);
          pan.setValue({x: 0, y: 0});
        });
      } else {
        Animated.parallel([
          Animated.spring(pan, {
            toValue: {x: 0, y: 0},
            useNativeDriver: true,
          }),
          Animated.spring(swipeCardPosition, {
            toValue: {x: 0, y: -SCREEN_HEIGHT - StatusBar.currentHeight},
            useNativeDriver: true,
          }),
        ]).start();
      }
    },
  });

  const nextCardScale = getScaleStyles(pan);
  const nextCardTranslateY = getTranslateYStyles(pan);
  console.log('SwipeCardPosition', swipeCardPosition);
  const currentCardScale = getScaleStyles(swipeCardPosition);
  console.log('CurrentCardScale : ', currentCardScale);
  const currentCardTranslateY = getTranslateYStyles(swipeCardPosition);
  console.log('currentCardTranslateY', currentCardTranslateY);
  return (
    <View style={{flex: 1,borderColor:'green',borderWidth:5}}>
      {data
        ?.map((news, index) => {
          console.log('Swiper compo', news);
          if (index === cardIndex - 1) {
            return (
              <Animated.View
                key={index}
                {...panResponder.panHandlers}
                style={[
                  styles.container,
                  {
                    transform: [
                      {translateX: swipeCardPosition.x},
                      {translateY: swipeCardPosition.y},
                    ],
                  },
                ]}>
                {renderCard(news)}
              </Animated.View>
            );
          }
          if (index < cardIndex) return null;
          if (index === cardIndex) {
            return (
              <Animated.View
                key={index}
                {...panResponder.panHandlers}
                style={[
                  styles.container,
                  {
                    transform: [
                      {translateX: pan.x},
                      {translateY: pan.y},
                      {scale: currentCardScale},
                      {translateY: currentCardTranslateY},
                    ],
                  },
                ]}>
                {renderCard(news)}
              </Animated.View>
            );
          }
          if (index === cardIndex + 1) {
            return (
              <Animated.View
                key={index}
                style={[
                  styles.container,
                  {
                    transform: [
                      {scale: nextCardScale},
                      {translateY: nextCardTranslateY},
                    ],
                  },
                ]}>
                {renderCard(news)}
              </Animated.View>
            );
          }
        })
        .reverse()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
  },
});
