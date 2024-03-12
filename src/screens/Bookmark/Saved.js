import React from 'react';
import {Dimensions, ScrollView, View} from 'react-native';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native';
import RenderHTML from 'react-native-render-html';
import {Card} from '../../components/Card';
import {useSelector} from 'react-redux';
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
  const posts = useSelector(state => state.bookmark.collection);
  // console.log('posts', posts);
  const currentCollectionID = route.params.currentCollectionID;
  const AvailableBookmarks = posts?.filter(
    item => item.id === currentCollectionID,
  );
  return (
    <ScrollView style={[styles.container]}>
      <View style={styles.cardContainer}>
        {AvailableBookmarks[0]?.bookmarks?.map((item, index) => {
          return <Card news={item} cardIndex={index} key={index} />;
        })}
      </View>
    </ScrollView>
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
});
