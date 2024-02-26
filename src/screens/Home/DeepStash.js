import React from 'react';
import {Screen} from '../../ui';
import {Text, View, ScrollView} from 'react-native';
import {Card} from '../../components/Card';
import {BlurView} from '@react-native-community/blur';
import {StyleSheet} from 'react-native';
const DeepStash = ({data}) => {
  return (
    <Screen variant={'scroll'}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          zIndex: -100,
          backgroundColor: 'black',
        }}>
        <BlurView
          // style={styles.absolute}
          blurType="dark"
          blurAmount={10}>
          <ScrollView>
            {data.map(card => {
              return <Card news={card} />;
            })}
          </ScrollView>
        </BlurView>
      </View>
    </Screen>
  );
};
const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default DeepStash;
