import React from 'react';
import {FlatList, View, Dimensions} from 'react-native';
import {LOCAL_USER} from '../../constants/keys';
import {color} from '../../theme';
import {Screen} from '../../ui';
import {load} from '../../utils';
import {Screen1} from './Screen1';
import {Screen2} from './Screen2';
import {Screen3} from './Screen3';
import {Screen4} from './Screen4';
import {Screen5} from './Screen5';

const {width, height} = Dimensions.get('window');

const COLORS = {primary: '#282534', white: '#fff'};

const slides = [1, 2, 3, 4, 5];

export const OnBoarding = ({navigation}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const [selectedCategories, setSelectedCategories] = React.useState([]);
  const [selectedTopics, setSelectedTopics] = React.useState([]);
  const ref = React.useRef();
  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({offset});
      setCurrentSlideIndex(currentSlideIndex + 1);
      if (nextSlideIndex === 2) {
        load(LOCAL_USER).then(res => {
          if (res) setSelectedCategories(res);
        });
      }
    }
  };
  const goToPreviousSlide = () => {
    const nextSlideIndex = currentSlideIndex - 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({offset});
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };
  const skip = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;
    ref?.current.scrollToOffset({offset});
    setCurrentSlideIndex(lastSlideIndex);
  };

  return (
    <Screen>
      {/* <StatusBar backgroundColor={COLORS.primary} /> */}
      <View style={{flex: 1}}>
        <FlatList
          ref={ref}
          onMomentumScrollEnd={updateCurrentSlideIndex}
          contentContainerStyle={{height: height * 0.95}}
          showsHorizontalScrollIndicator={false}
          horizontal
          scrollEnabled={false}
          data={slides}
          pagingEnabled
          renderItem={({item, index}) => {
            if (index === 0) {
              return (
                <Screen1
                  item={item}
                  currentIndex={index}
                  goToNextSlide={goToNextSlide}
                  goToPreviousSlide={goToPreviousSlide}
                  slides={slides}
                />
              );
            }
            if (index === 1) {
              return (
                <Screen2
                  item={item}
                  currentIndex={index}
                  goToNextSlide={goToNextSlide}
                  goToPreviousSlide={goToPreviousSlide}
                  slides={slides}
                />
              );
            }
            // if (index === 2) {
            //   return (
            //     <Screen3
            //       item={item}
            //       currentSlideIndex={index}
            //       goToNextSlide={goToNextSlide}
            //       goToPreviousSlide={goToPreviousSlide}
            //       slides={slides}
            //       selectedCategories={selectedCategories}
            //     />
            //   );
            // }
            // if (index === 3) {
            //   return (
            //     <Screen4
            //       item={item}
            //       currentSlideIndex={index}
            //       goToNextSlide={goToNextSlide}
            //       goToPreviousSlide={goToPreviousSlide}
            //       slides={slides}
            //       selectedCategories={selectedCategories}
            //     />
            //   );
            // }
            // if (index === 3) {
            //   return (
            //     <Screen5
            //       item={item}
            //       currentSlideIndex={index}
            //       goToNextSlide={goToNextSlide}
            //       goToPreviousSlide={goToPreviousSlide}
            //       slides={slides}
            //     />
            //   );
            // }
            return <View></View>;
          }}
        />
      </View>
    </Screen>
  );
};
