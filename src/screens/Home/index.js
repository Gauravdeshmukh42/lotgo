import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Screen} from '../../ui';
import {useSelector, useDispatch} from 'react-redux';
import {newsRequest} from '../../redux/slices';
import SectionScreen from './SectionScreen';
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
    if (newsList.length > 2) {
      let id = newsList[newsList.length - 3].id;
      const lastSecondItemIndex = newsList.findIndex(x => x.id === id);
      if (lastSecondItemIndex === index) {
        onEndNewsReached();
      }
    }
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

  const result = [
    {
      attributes: {
        name: 'For You',
        courses: [
          {
            id: 1,
            attributes: {
              name: 'Google Analytics',
              icon: {
                data: {
                  attributes: {
                    formats: {
                      thumbnail: {
                        url: 'https://images.unsplash.com/photo-1674505667713-4d4e8523366e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
                      },
                    },
                  },
                },
              },
            },
          },
          {
            id: 2,
            attributes: {
              name: 'Google It Support',
              icon: {
                data: {
                  attributes: {
                    formats: {
                      thumbnail: {
                        url: 'https://images.unsplash.com/photo-1674505667713-4d4e8523366e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
                      },
                    },
                  },
                },
              },
            },
          },
          {
            id: 3,
            attributes: {
              name: 'Google Project Management',
              icon: {
                data: {
                  attributes: {
                    formats: {
                      thumbnail: {
                        url: 'https://images.unsplash.com/photo-1674505667713-4d4e8523366e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
                      },
                    },
                  },
                },
              },
            },
          },
          {
            id: 1,
            attributes: {
              name: 'Google Analytics',
              icon: {
                data: {
                  attributes: {
                    formats: {
                      thumbnail: {
                        url: 'https://images.unsplash.com/photo-1674505667713-4d4e8523366e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
                      },
                    },
                  },
                },
              },
            },
          },
          {
            id: 2,
            attributes: {
              name: 'Google It Support',
              icon: {
                data: {
                  attributes: {
                    formats: {
                      thumbnail: {
                        url: 'https://images.unsplash.com/photo-1674505667713-4d4e8523366e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
                      },
                    },
                  },
                },
              },
            },
          },
          {
            id: 3,
            attributes: {
              name: 'Google Project Management',
              icon: {
                data: {
                  attributes: {
                    formats: {
                      thumbnail: {
                        url: 'https://images.unsplash.com/photo-1674505667713-4d4e8523366e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
                      },
                    },
                  },
                },
              },
            },
          },
          {
            id: 1,
            attributes: {
              name: 'Google Analytics',
              icon: {
                data: {
                  attributes: {
                    formats: {
                      thumbnail: {
                        url: 'https://images.unsplash.com/photo-1674505667713-4d4e8523366e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
                      },
                    },
                  },
                },
              },
            },
          },
          {
            id: 2,
            attributes: {
              name: 'Google It Support',
              icon: {
                data: {
                  attributes: {
                    formats: {
                      thumbnail: {
                        url: 'https://images.unsplash.com/photo-1674505667713-4d4e8523366e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
                      },
                    },
                  },
                },
              },
            },
          },
          {
            id: 3,
            attributes: {
              name: 'Google Project Management',
              icon: {
                data: {
                  attributes: {
                    formats: {
                      thumbnail: {
                        url: 'https://images.unsplash.com/photo-1674505667713-4d4e8523366e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
                      },
                    },
                  },
                },
              },
            },
          },
          {
            id: 1,
            attributes: {
              name: 'Google Analytics',
              icon: {
                data: {
                  attributes: {
                    formats: {
                      thumbnail: {
                        url: 'https://images.unsplash.com/photo-1674505667713-4d4e8523366e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
                      },
                    },
                  },
                },
              },
            },
          },
          {
            id: 2,
            attributes: {
              name: 'Google It Support',
              icon: {
                data: {
                  attributes: {
                    formats: {
                      thumbnail: {
                        url: 'https://images.unsplash.com/photo-1674505667713-4d4e8523366e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
                      },
                    },
                  },
                },
              },
            },
          },
          {
            id: 3,
            attributes: {
              name: 'Google Project Management',
              icon: {
                data: {
                  attributes: {
                    formats: {
                      thumbnail: {
                        url: 'https://images.unsplash.com/photo-1674505667713-4d4e8523366e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
                      },
                    },
                  },
                },
              },
            },
          },
          {
            id: 1,
            attributes: {
              name: 'Google Analytics',
              icon: {
                data: {
                  attributes: {
                    formats: {
                      thumbnail: {
                        url: 'https://images.unsplash.com/photo-1674505667713-4d4e8523366e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
                      },
                    },
                  },
                },
              },
            },
          },
          {
            id: 2,
            attributes: {
              name: 'Google It Support',
              icon: {
                data: {
                  attributes: {
                    formats: {
                      thumbnail: {
                        url: 'https://images.unsplash.com/photo-1674505667713-4d4e8523366e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
                      },
                    },
                  },
                },
              },
            },
          },
          {
            id: 3,
            attributes: {
              name: 'Google Project Management',
              icon: {
                data: {
                  attributes: {
                    formats: {
                      thumbnail: {
                        url: 'https://images.unsplash.com/photo-1674505667713-4d4e8523366e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
                      },
                    },
                  },
                },
              },
            },
          },
          {
            id: 1,
            attributes: {
              name: 'Google Analytics',
              icon: {
                data: {
                  attributes: {
                    formats: {
                      thumbnail: {
                        url: 'https://images.unsplash.com/photo-1674505667713-4d4e8523366e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
                      },
                    },
                  },
                },
              },
            },
          },
          {
            id: 2,
            attributes: {
              name: 'Google It Support',
              icon: {
                data: {
                  attributes: {
                    formats: {
                      thumbnail: {
                        url: 'https://images.unsplash.com/photo-1674505667713-4d4e8523366e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
                      },
                    },
                  },
                },
              },
            },
          },
          {
            id: 3,
            attributes: {
              name: 'Google Project Management',
              icon: {
                data: {
                  attributes: {
                    formats: {
                      thumbnail: {
                        url: 'https://images.unsplash.com/photo-1674505667713-4d4e8523366e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
                      },
                    },
                  },
                },
              },
            },
          },
        ],
      },
      id: 1,
    },
    {
      attributes: {
        name: 'New',
        courses: [
          {
            id: 1,
            attributes: {
              name: 'Google Analytics',
              icon: {
                data: {
                  attributes: {
                    formats: {
                      thumbnail: {
                        url: 'https://images.unsplash.com/photo-1674505667713-4d4e8523366e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
                      },
                    },
                  },
                },
              },
            },
          },
          {
            id: 2,
            attributes: {
              name: 'Google It Support',
              icon: {
                data: {
                  attributes: {
                    formats: {
                      thumbnail: {
                        url: 'https://images.unsplash.com/photo-1674505667713-4d4e8523366e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
                      },
                    },
                  },
                },
              },
            },
          },
          {
            id: 3,
            attributes: {
              name: 'Google Project Management',
              icon: {
                data: {
                  attributes: {
                    formats: {
                      thumbnail: {
                        url: 'https://images.unsplash.com/photo-1674505667713-4d4e8523366e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
                      },
                    },
                  },
                },
              },
            },
          },
        ],
      },
      id: 2,
    },
    {
      attributes: {
        name: 'Popular',
        courses: [
          {
            id: 1,
            attributes: {
              name: 'Google Analytics',
              icon: {
                data: {
                  attributes: {
                    formats: {
                      thumbnail: {
                        url: 'https://images.unsplash.com/photo-1674505667713-4d4e8523366e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
                      },
                    },
                  },
                },
              },
            },
          },
          {
            id: 2,
            attributes: {
              name: 'Google It Support',
              icon: {
                data: {
                  attributes: {
                    formats: {
                      thumbnail: {
                        url: 'https://images.unsplash.com/photo-1674505667713-4d4e8523366e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
                      },
                    },
                  },
                },
              },
            },
          },
          {
            id: 3,
            attributes: {
              name: 'Google Project Management',
              icon: {
                data: {
                  attributes: {
                    formats: {
                      thumbnail: {
                        url: 'https://images.unsplash.com/photo-1674505667713-4d4e8523366e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
                      },
                    },
                  },
                },
              },
            },
          },
        ],
      },
      id: 3,
    },
  ];
  return (
    <Screen variant={'scroll'}>
      {/* {newsList?.length > 0 ? (
        <Swiper
          data={newsList}
          cardIndex={cardIndex}
          renderCard={(news) => <Card news={news} />}
          onSwipedTop={(index) => onSwipedTopCard(index)}
          onSwipedBottom={(index) => onSwipedBottomCard(index)}
        />
      ) : (
        <View style={styles.noData}>
          <Text>No Data Available</Text>
        </View>
      )} */}
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
        <SectionScreen title="Popular" dataList={names} /> */}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  noData: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
