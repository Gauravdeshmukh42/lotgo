import React from 'react';
import {useState} from 'react';
import {
  SCREEN_HEIGHT,
  STATUSBAR_HEIGHT,
} from '../../screens/Home/HeightConstants';
import {StatusBar, StyleSheet} from 'react-native';
import {View, ScrollView} from 'react-native';
import {useRef} from 'react';
const SwiperParent = ({children, onScrollToEnd}) => {
  const [contentHeight, setContentHeight] = useState(0);
  const scrollViewRef = useRef();
  const handleLayout = e => {
    const height = e.nativeEvent.layout.height;
    setContentHeight(height);
  };

  const handleScroll = e => {
    const {contentOffset, layoutMeasurement} = e.nativeEvent;
    onScrollToEnd(contentOffset, layoutMeasurement, contentHeight);
  };
  return (
    <View style={styles.container}>
      <View style={styles.maxContainer}>
        <ScrollView
          ref={scrollViewRef}
          bounces={false}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={handleScroll}>
          <View style={styles.spacing} onLayout={handleLayout}>
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
    // maxHeight: MAX_HEIGHT_CONTENT,
    // marginVertical: STATUSBAR_HEIGHT,
    paddingBottom: 20,
    overflow: 'hidden',
  },
  spacing: {
    paddingHorizontal: 10,
  },
});

export default SwiperParent;
