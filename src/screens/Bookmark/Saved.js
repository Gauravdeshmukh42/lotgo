import React from 'react';
import {Dimensions, ScrollView, View} from 'react-native';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native';
import RenderHTML from 'react-native-render-html';
import {Card} from '../../components/Card';
import {useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {color} from '../../theme';
import {SCREEN_WIDTH} from '../Home/HeightConstants';
import {useBottomSheet} from '../../context';
import {SheetOptions} from '../../context';
import {
  addCollection,
  removeCollection,
  renameCollection,
} from '../../redux/slices';
import {useDispatch} from 'react-redux';
import Routes from '../../navigation/routes';
import {useNavigation} from '@react-navigation/native';
const tagsStyles = {
  img: {
    width: Dimensions.get('window').width - 20,
    height: 100,
    objectFit: 'contain',
  },
  p: {
    color: 'black',
    textAlign: 'center',
  },
};
const Saved = ({route}) => {
  const {openBottomSheet} = useBottomSheet();
  const dispatch = useDispatch();
  const posts = useSelector(state => state.bookmark.collection);
  const collectionName = posts.find(
    item => item.id === route.params.currentCollectionID,
  );
  const currentCollectionID = route.params.currentCollectionID;
  const AvailableBookmarks = posts?.filter(
    item => item.id === currentCollectionID,
  );
  const navigation = useNavigation();
  // console.log(currentCollectionID);
  return (
    <>
      <View style={styles.saveContainer}>
        <Text style={styles.header}>{collectionName?.name}</Text>
        <Ionicons
          name="ellipsis-vertical"
          color={color.text}
          size={20}
          onPress={() => {
            openBottomSheet({
              type: SheetOptions.MANIPULATE_COLLECTION,
              snaps: ['20%', '40%'],
              currentCollectionID: currentCollectionID,
              collectionName: collectionName?.name,
              onPressItem: option => {
                dispatch(removeCollection(option));
                navigation.navigate(Routes.BOOKMARK_SCREEN);
              },
              onPressRename: option => {
                dispatch(
                  renameCollection({
                    collectionId: currentCollectionID,
                    newCollectionName: option,
                  }),
                );
              },
            });
          }}
        />
      </View>

      <ScrollView style={[styles.container]}>
        <View style={styles.cardContainer}>
          {AvailableBookmarks[0]?.bookmarks?.map((item, index) => {
            return <Card news={item} cardIndex={index} key={index} />;
          })}
        </View>
      </ScrollView>
    </>
  );
};

export default Saved;
const styles = StyleSheet.create({
  cardContainer: {
    alignItems: 'center',
    margin: 10,
    paddingVertical: 30,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  card: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
  saveContainer: {
    padding: 15,
    // borderBottomColor: 'black',
    // borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
