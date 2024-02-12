import React from 'react';
import { StyleSheet, Dimensions, View, TouchableOpacity } from 'react-native';
import { defaultValues } from '../../constants/defaultValues';
import { color } from '../../theme';
import { Button, Text } from '../../ui';
import { BottomMessage } from './BottomMessage';
import { Footer } from './Footer';

const { width } = Dimensions.get('window');
import { authorize } from 'react-native-app-auth';

const config = {
  issuer: 'http://13.234.108.242:31709/realms/learn',
  clientId: 'learn-app',
  redirectUrl: 'myapp://test-callback',
  scopes: ['profile'],
  dangerouslyAllowInsecureHttpRequests: true,
};
export const Screen1 = ({
  goToNextSlide,
  goToPreviousSlide,
  currentIndex,
  slides,
}) => {
  const login = async () => {
    console.log(53454);
    const result = await authorize(config);
    console.log('result', result);
  };
  return (
    <View style={[styles.container, { width, position: 'relative' }]}>
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={{
            alignItems: 'flex-end',
            marginRight: 15,
            // marginTop: 10,
          }}
          onPress={login}>
          <Text
            style={{
              color: color.palette.black,
              fontSize: 16,
              textTransform: 'capitalize',
            }}>
            {defaultValues.loginButtonText}
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            color: color.palette.black,
            fontSize: 16,
            marginLeft: 15,
            marginTop: 20,
          }}>
          Lotgo
        </Text>
        <Text
          style={{
            color: color.palette.black,
            fontSize: 30,
            marginLeft: 15,
            marginTop: 50,
            alignContent: 'center',
            textTransform: 'capitalize',
          }}>
          {defaultValues.onBoardScreenTitle}
        </Text>
      </View>
      <View style={styles.bottomView}>
        <Button
          title={defaultValues.continueButtonText}
          style={[
            {
              width: '50%',
              height: 50,
              borderRadius: 5,
              // backgroundColor: "#fff",
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}
          onPress={goToNextSlide}
          textStyle={{
            color: color.palette.white,
            fontSize: 16,
            textTransform: 'capitalize',
          }}
        />
        <View style={styles.message}>
          <BottomMessage />
        </View>
      </View>
      <Footer
        goToPreviousSlide={goToPreviousSlide}
        goToNextSlide={goToNextSlide}
        currentIndex={currentIndex}
        slides={slides}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    padding: 2,
  },
  message: {
    marginTop: '5%',
  },
  bottomView: {
    width: '100%',
    // height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', //Here is the trick
    bottom: 0, //Here is the trick
  },
});
