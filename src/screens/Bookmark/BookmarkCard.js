import React from 'react';
import {Dimensions, View} from 'react-native';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native';

const {width} = Dimensions.get('window');

const BookmarkCard = ({data, style}) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.header}>{data}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '48%',
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  icons: {
    alignItems: 'flex-end',
  },
});

const tagsStyles = {
  h1: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  p: {
    fontSize: 16,
    color: 'black',
  },
  img: {
    width: '100%',
    height: 100,
    objectFit: 'cover',
  },
};

export default BookmarkCard;
