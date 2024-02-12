import { StyleSheet, View, Text } from 'react-native';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Screen } from '../../ui';
import { useSelector, useDispatch } from 'react-redux';
import { newsRequest } from '../../redux/slices';
import { Card } from '../../components/Card';
export const Home = () => {
  const [cardIndex, setCardIndex] = useState(0);
  const { newsList, data } = useSelector(state => state.news);
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
    const { pageSize, page, total } = data?.meta?.pagination;
    setLoadingMoreNews(true);
    const pageNo = Number(page);
    const LIMIT = total / pageSize;
    if (pageNo < LIMIT) {
      // console.log("pageNo", LIMIT, pageSize);
      const query = `?pagination[pageSize]=${pageSize}&pagination[page]=${pageNo + 1
        }`;
      dispatch(
        newsRequest({ searchType: 'next_page', query, setLoadingMoreNews }),
      );
    } else {
      setLoadingMoreNews(false);
    }
  };
  const posts = [
    {
      attributes: {
        title: "React Essentials in 5 minutes",
        content: `<p>React Essentials in 5 minutes</p>`,
        imgUrl: `https://shorturl.at/bisyL`,
        more_content: [
          {
            attributes: {
              title: "React Essentails in 5 minutes",
              imgUrl: `https://shorturl.at/bisyL`,
              content: `<p>Learn about some of the most important
              concepts of react to help you get started quickly.<br/> Knowledge of
              javascript is essential for some of the concepts explain here
              <br/> Knowledge of
              javascript is essential for some of the concepts explain here
              <br/> Knowledge of
              javascript is essential for some of the concepts explain here
              <br/> Knowledge of
              javascript is essential for some of the concepts explain here
              <br/> Knowledge of
              javascript is essential for some of the concepts explain here
              <br/>
              Learn about some of the most important
              concepts of react to help you get started quickly.<br/> Knowledge of
              javascript is essential for some of the concepts explain here
              <br/> Knowledge of
              javascript is essential for some of the concepts explain here
              <br/> Knowledge of
              javascript is essential for some of the concepts explain here
              <br/> Knowledge of
              javascript is essential for some of the concepts explain here
              <br/> Knowledge of
              javascript is essential for some of the concepts explain here
              <br/> Knowledge of
              javascript is essential for some of the concepts explain here
              <br/> Knowledge of
              javascript is essential for some of the concepts explain here
              <br/> Knowledge of
              javascript is essential for some of the concepts explain here</p>`,
            }

          },
          {
            attributes: {
              title: "Components",
              content: `<p>Learn about some of the most important
              concepts of react to help you get started quickly. Knowledge of
              javascript is essential for some of the concepts explain here</p>`,
            }

          }
        ],
        link: "https://example.com/sample-news"
      }
    },
    {
      attributes: {
        title: "Sample News Title 2",
        content: "<p>This is some sample content for the news item.</p>",
        more_content: [
          {
            attributes: {
              title: "Sample subTitle 1",
              content: `<p>Sample content 1`,
            },
          },
          {
            attributes: {
              title: "Sample subTitle 2",
              content: `<p>Sample content 2`,
            }
          }
        ],
        link: "https://example.com/sample-news"
      }
    },
    {
      attributes: {
        title: "Sample News Title 3",
        content: "<p>This is some sample content for the news item.</p>",
        more_content: [
          {
            attributes: {
              title: "Sample subTitle 1",
              content: `<p>Sample content 1`,
            },
          },
          {
            attributes: {
              title: "Sample subTitle 2",
              content: `<p>Sample content 2`,
            }
          }
        ],
        link: "https://example.com/sample-news"
      }
    },
    {
      attributes: {
        title: "Sample News Title 4",
        content: "<p>This is some sample content for the news item.</p>",
        more_content: [
          {
            attributes: {
              title: "Sample subTitle 1",
              content: `<p>Sample content 1`,
            },
          },
          {
            attributes: {
              title: "Sample subTitle 2",
              content: `<p>Sample content 2`,
            }
          }
        ],
        link: "https://example.com/sample-news"
      }
    },
    {
      attributes: {
        title: "Sample News Title 5",
        content: "<p>This is some sample content for the news item.</p>",
        more_content: [
          {
            attributes: {
              title: "Sample subTitle 1",
              content: `<p>Sample content 1`,
            },
          },
          {
            attributes: {
              title: "Sample subTitle 2",
              content: `<p>Sample content 2`,
            }
          }
        ],
        link: "https://example.com/sample-news"
      }
    },
    {
      attributes: {
        title: "Sample News Title 6",
        content: "<p>This is some sample content for the news item.</p>",
        more_content: [
          {
            attributes: {
              title: "Sample subTitle 1",
              content: `<p>Sample content 1`,
            },
          },
          {
            attributes: {
              title: "Sample subTitle 2",
              content: `<p>Sample content 2`,
            }
          }
        ],
        link: "https://example.com/sample-news"
      }
    }
  ]
  return (
    <Screen variant={'scroll'}>
      <View style={[styles.container]}>
        {
          posts?.map((news, index) => {
            console.log("Card", news)
            return (<Card news={news} key={index} />)
          })
        }
      </View>
      {/* <View style={[styles.container]}>
        {posts?.length > 0 ? (
          <Swiper
            data={posts}
            cardIndex={cardIndex}
            renderCard={(news) => <Card news={news} />}
            onSwipedTop={(index) => onSwipedTopCard(index)}
            onSwipedBottom={(index) => onSwipedBottomCard(index)}
          />
        ) : (
          <View style={styles.noData}>
            <Text>No Data Available</Text>
          </View>
        )}
      </View> 
       <View
        style={{
          flex: 1,
          paddingTop: 20,
        }}> 
       {result?.length > 0 &&
          result.map(data => (
            <SectionScreen section={data} dataList={data.attributes.courses} />
          ))} 
      {/* <SectionScreen title="For You" dataList={names} />
        <SectionScreen title="New" dataList={names} />
        <SectionScreen title="Popular" dataList={names} /> 
      {/* </View> */}
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    flexDirection: 'column',
  },
  noData: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
