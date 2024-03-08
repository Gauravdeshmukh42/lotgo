import React from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import {useState} from 'react';
import {Modal} from 'react-native';
import {Screen} from '../../ui';
import BookmarkCard from './BookmarkCard';
import {defaultValues} from '../../constants/defaultValues';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useBottomSheet} from '../../context';
import {SheetOptions} from '../../context';
import {TextInput} from 'react-native';
import {set} from 'ramda';
export const Bookmark = () => {
  const {height} = Dimensions.get('window');
  const [collection, setCollection] = React.useState([]);
  const {openBottomSheet} = useBottomSheet();
  const addToCollection = topic => {
    setCollection([...collection, topic]);
  };
  const removeFromCollection = topic => {
    setCollection(collection.filter(item => item !== topic));
  };
  return (
    <Screen variant={'scroll'}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.icons}>
          <Ionicons
            name="search-outline"
            size={30}
            color="black"
            style={{marginLeft: 5}}
          />
          <Ionicons
            name="add-outline"
            size={30}
            color="black"
            style={{marginLeft: 5}}
            onPress={() => {
              openBottomSheet({
                type: SheetOptions.CREATE_COLLECTION,

                snaps: ['50%', '75%'],
                onPressItem: option => {
                  setCollection([...collection, option]);
                },
              });
            }}
          />
        </TouchableOpacity>

        <Text style={styles.header}>{defaultValues.bookmarkText}</Text>
        <View style={styles.innerContainer}>
          {collection.map((post, index) => {
            return <BookmarkCard data={post} key={index} />;
          })}
        </View>
      </View>
    </Screen>
  );
};
const styles = StyleSheet.create({
  header: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 20,
  },
  container: {
    flexDirection: 'column',
    padding: 20,
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  innerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  modalContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});
