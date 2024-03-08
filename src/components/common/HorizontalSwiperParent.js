import React from 'react';
import {STATUSBAR_HEIGHT} from '../../screens/Home/HeightConstants';
import {StyleSheet} from 'react-native';
import {View, ScrollView} from 'react-native';
import {set} from 'ramda';
const handleScroll = event => {
  const position = event.nativeEvent.contentOffset.y;
  console.log('Position of Scroll ', position);
};
const HorizontalSwiperParent = ({children}) => {
  return (
    <View style={styles.container}>
      <View style={styles.maxContainer}>
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={handleScroll}
          >
          <View style={styles.spacing}>
            <View>{children}</View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: '100%',
    flex: 1,
  },
  maxContainer: {
    marginVertical: STATUSBAR_HEIGHT,
    overflow: 'hidden',
  },
  spacing: {
    paddingHorizontal: 10,
  },
});

export default HorizontalSwiperParent;
