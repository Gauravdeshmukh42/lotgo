import React from 'react';
import {Dimensions, View} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {Card} from '../../components/Card';
import {Screen} from '../../ui';
import {interpolate} from 'react-native-reanimated';
import Extrapolate from 'react-native-reanimated';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
const {height, width} = Dimensions.get('window');
const renderCard = ({item, index, animationValue}) => {
  return (
    <Card news={item} key={`card_${index}`} animationValue={animationValue} />
  );
};
const Horizontal = ({data}) => {
  const parallaxLayout = (baseConfig, modeConfig) => {
    const {size, vertical} = baseConfig;
    const {
      parallaxScrollingOffset = 100,
      parallaxScrollingScale = 0.8,
      parallaxAdjacentItemScale = parallaxScrollingScale ** 2,
    } = modeConfig;

    return value => {
      'worklet';
      const translate = interpolate(
        value,
        [-1, 0, 1],
        [-size + parallaxScrollingOffset, 0, size - parallaxScrollingOffset],
      );

      const zIndex = interpolate(
        value,
        [-1, 0, 1],
        [0, size, 0],
        Extrapolate.CLAMP,
      );
      const opacity = interpolate(
        value,
        [-1, 0, 1],
        [0, 1, 0],
        Extrapolate.CLAMP,
      );
      const scale = interpolate(
        value,
        [-1, 0, 1],
        [
          parallaxAdjacentItemScale,
          parallaxScrollingScale,
          parallaxAdjacentItemScale,
        ],
        Extrapolate.CLAMP,
      );

      return {
        transform: [
          vertical
            ? {
                translateY: translate,
              }
            : {
                translateX: translate,
              },
          {
            scale,
          },
        ],
        zIndex,
        opacity,
      };
    };
  };
  return (
    <Screen variant={'scroll'}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: 'black',
        }}>
        {/* <Carousel
          data={data}
          renderItem={renderCard}
          width={width - 30}
          loop={false}
          layout={'parallax'}
          height={height} 
          customAnimation={parallaxLayout(
            {
              size: width,
              vertical: false,
            },
            {
              parallaxScrollingOffset: 100,
              parallaxScrollingScale: 1,
              parallaxAdjacentItemScale: 0.8,
            },
          )}
        /> */}

        <Carousel
          data={data}
          renderItem={renderCard}
          sliderWidth={width}
          itemWidth={width - 30}
          layout={'parallax'}
          slideStyle={parallaxLayout(
            {
              size: width,
              vertical: false,
            },
            {
              parallaxScrollingOffset: 100,
              parallaxScrollingScale: 1,
              parallaxAdjacentItemScale: 0.8,
            },
          )}
        />
      </View>
    </Screen>
  );
};

export default Horizontal;
