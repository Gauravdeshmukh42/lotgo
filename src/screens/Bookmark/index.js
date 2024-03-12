import React, {useEffect} from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import {useDispatch} from 'react-redux';
import {Screen} from '../../ui';
import BookmarkCard from './BookmarkCard';
import {defaultValues} from '../../constants/defaultValues';
import {
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useBottomSheet} from '../../context';
import {SheetOptions} from '../../context';
import {useSelector} from 'react-redux';
import {addCollection} from '../../redux/slices';
import {removeCollection} from '../../redux/slices';
import {Alert} from 'react-native';
import {Image} from 'react-native';
import {useState} from 'react';
import {SCREEN_WIDTH} from '@gorhom/bottom-sheet';
import {searchCollection} from '../../redux/slices/bookmarkSlice';
export const Bookmark = () => {
  const {openBottomSheet} = useBottomSheet();
  const {collection} = useSelector(state => state.bookmark);
  const dispatch = useDispatch();
  const buttonAlert = post =>
    Alert.alert('Alert', `Do you want to delete ${post.name}`, [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {text: 'OK', onPress: () => dispatch(removeCollection(post.id))},
    ]);

  return (
    <Screen variant={'scroll'}>
      <View style={styles.container}>
        <TouchableWithoutFeedback style={styles.icons}>
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
                  const newCollection = {
                    id: collection.length + 1,
                    name: option,
                    bookmarks: [],
                  };
                  dispatch(addCollection(newCollection));
                },
              });
            }}
          />
        </TouchableWithoutFeedback>

        <Text style={styles.header}>{defaultValues.bookmarkText}</Text>

        <View style={styles.innerContainer}>
          {collection?.length > 0 ? (
            collection?.map((post, index) => {
              return (
                <BookmarkCard
                  key={index}
                  data={post}
                  onLongPress={() => buttonAlert(post)}
                />
              );
            })
          ) : (
            <View>
              <Text style={[styles.header, {textAlign: 'center'}]}>
                No Collections
              </Text>
              <Image
                source={{
                  uri: 'https://img.freepik.com/free-vector/hand-drawn-essay-illustration_23-2150292643.jpg?w=740&t=st=1710088767~exp=1710089367~hmac=ef4565135f3b212bfc3c376f4fbf9929462ed330a1f3f136eee560a119d174cc',
                }}
                style={{width: 320, height: 400, opacity: 0.6}}
              />
            </View>
          )}
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
    padding: 10,
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    // alignItems: 'center',
  },
  innerContainer: {
    flexDirection: 'row',
    // borderColor: 'red',
    // borderWidth: 3,
    flexWrap: 'wrap',
  },
  searchBox: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    width: SCREEN_WIDTH - 100,
  },
});
