import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Dimensions, View} from 'react-native';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import {FlatList} from 'react-native-gesture-handler';
import Routes from '../../navigation/routes';
const {width} = Dimensions.get('window');

const BookmarkCard = ({data, onLongPress}) => {
  const navigation = useNavigation();
  // const noOfBookmarks=
  // console.log('BookmarkCard', data);

  return (
    <TouchableWithoutFeedback
      onLongPress={onLongPress}
      onPress={() => {
        navigation.navigate(Routes.DETAILS_SCREEN, {
          currentCollectionID: data.id,
        });
      }}>
      <View style={styles.outerContainer}>
        <View style={[styles.container]}>
          {data?.bookmarks?.length > 0 ? (
            data?.bookmarks?.map((item, index) => {
              return (
                <View key={index}>
                  <Text style={{color: 'black'}}>{item.attributes.title}</Text>
                </View>
              );
            })
          ) : (
            <View>
              <Text style={[styles.header, {textAlign: 'center'}]}>
                No Bookmarks
              </Text>
            </View>
          )}
        </View>
        <Text style={styles.header}>{data.name}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    height: 170,
    width: 170,
    marginBottom: 10,

    padding: 10,
  },
  container: {
    width: 150,
    height: 150,
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    height: '25%',
    width: '25%',
  },
  header: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
});

export default BookmarkCard;
