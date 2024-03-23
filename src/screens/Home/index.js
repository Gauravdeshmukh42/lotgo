import {StyleSheet, View, Text} from 'react-native';
import React, {createContext, useContext, useEffect, useState} from 'react';
import {Screen} from '../../ui';
import {useSelector, useDispatch} from 'react-redux';
import {newsRequest} from '../../redux/slices';
import {Card} from '../../components/Card';
import posts from './constants';
export const Home = () => {
  const [cardIndex, setCardIndex] = useState(0);
  const {newsList, data} = useSelector(state => state.news);
  const dispatch = useDispatch();

  const [loadingMoreNews, setLoadingMoreNews] = React.useState(false);
  useEffect(() => {
    dispatch(newsRequest());
  }, [dispatch]);

  const onSwipedTopCard = index => {
    setCardIndex(index + 1);
    // if (newsList.length > 2) {
    //   let id = newsList[newsList.length - 3].id;
    //   const lastSecondItemIndex = newsList.findIndex(x => x.id === id);
    //   if (lastSecondItemIndex === index) {
    //     onEndNewsReached();
    //   }
    // }
  };
  const onSwipedBottomCard = index => {
    setCardIndex(index - 1);
  };

  const onEndNewsReached = () => {
    const {pageSize, page, total} = data?.meta?.pagination;
    setLoadingMoreNews(true);
    const pageNo = Number(page);
    const LIMIT = total / pageSize;
    if (pageNo < LIMIT) {
      // console.log("pageNo", LIMIT, pageSize);
      const query = `?pagination[pageSize]=${pageSize}&pagination[page]=${
        pageNo + 1
      }`;
      dispatch(
        newsRequest({searchType: 'next_page', query, setLoadingMoreNews}),
      );
    } else {
      setLoadingMoreNews(false);
    }
  };

  return (
    <Screen variant={'scroll'}>
      <View style={[styles.container]}>
        {posts?.map((news, index) => {
          return <Card news={news} key={index} />;
        })}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  noData: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
