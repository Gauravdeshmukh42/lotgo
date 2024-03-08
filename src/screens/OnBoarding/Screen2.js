import React, {useEffect, useState} from 'react';
import {StyleSheet, Dimensions, View, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {defaultValues} from '../../constants/defaultValues';
import {LOCAL_USER} from '../../constants/keys';
import {categoriesRequest} from '../../redux/slices';
import {color} from '../../theme';
import {Text} from '../../ui';
import {Footer} from './Footer';
import {save} from '../../utils';
import CategoryCard from '../../components/common/CategoryCard';
import {ScrollView} from 'react-native-gesture-handler';
// import Checkbox from "expo-checkbox";
const {width} = Dimensions.get('window');

export const Screen2 = ({
  currentSlideIndex,
  goToPreviousSlide,
  goToNextSlide,
  currentIndex,
  slides,
}) => {
  const categoryList = [
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
  ];
  const ListOfCategories = [
    {
      id: 1,
      name: 'Software Development',
      description: 'Software Development',
    },
    {
      id: 2,
      name: 'Data Science',
      description: 'Data Science',
    },
    {
      id: 3,
      name: 'Cyber Security',
      description: 'Cyber Security',
    },
  ];
  const ListOfTopics = [
    {
      id: 1,
      name: 'Google Analytics',
      description: 'Google Analytics',
      parent_id: 1,
    },
    {
      id: 2,
      name: 'Google IT Support',
      description: 'Google IT Support',
      parent_id: 1,
    },
    {
      id: 3,
      name: 'Numpy and Pandas',
      description: 'Numpy and Pandas',
      parent_id: 2,
    },
    {
      id: 4,
      name: 'Python',
      description: 'Python',
      parent_id: 2,
    },
    {
      id: 5,
      name: 'Cyber Security',
      description: 'Cyber Security',
      parent_id: 3,
    },
    {
      id: 6,
      name: 'Full Stack Development',
      description: 'Full Stack Development',
      parent_id: 1,
    },
  ];
  const [selectedCategories, setSelectedCategories] = useState([]);
  const {categories, categoriesData} = useSelector(state => state.news);
  const [loadingMoreCategories, setLoadingMoreCategories] =
    React.useState(false);
  // const [categoryList, setCategoryList] = useState([]);
  // useEffect(() => {
  //   setCategoryList(categories?.childs?.filter((cat) => cat?.level === 1));
  // }, [categories]);
  const onSelectCategory = category => {
    if (selectedCategories?.some(cat => cat?.id === category?.id)) {
      setSelectedCategories(
        selectedCategories?.filter(cat => cat?.id !== category?.id),
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const onEndCategoriesReached = () => {
    // const { pageSize, page, total } = categoriesData?.meta?.pagination;
    // setLoadingMoreCategories(true);
    // const pageNo = Number(page);
    // const LIMIT = total / pageSize;
    // if (pageNo < LIMIT) {
    //   const query = `?pagination[pageSize]=${pageSize}&pagination[page]=${
    //     pageNo + 1
    //   }`;
    //   dispatch(
    //     categoriesRequest({
    //       searchType: "next_page",
    //       query,
    //       setLoadingMoreCategories,
    //     })
    //   );
    // } else {
    //   setLoadingMoreCategories(false);
    // }
  };

  const gotoNextScreen = async () => {
    await save(LOCAL_USER, selectedCategories);
    goToNextSlide();
  };
  return (
    <View style={[styles.container, {width, position: 'relative'}]}>
      <View style={{flex: 1}}>
        <Text style={styles.header}>{defaultValues.onBoardScreen2Title}</Text>
        <Text style={styles.desc}>
          {defaultValues.onBoardScrren2Description}
        </Text>
        {/* {ListOfCategories?.length > 0 && (
          <FlatList
            data={ListOfCategories}
            numColumns={Math.ceil(ListOfCategories.length)}
            key={Math.ceil(ListOfCategories.length)}
            columnWrapperStyle={{flexWrap: 'wrap'}}
            style={styles.listContainer}
            renderItem={({item: category}) => (
              <CategoryCard
                category={ListOfTopics[category?.id]}
                onSelect={onSelectCategory}
                selected={selectedCategories.some(
                  cat => cat?.id === category?.id,
                )}
              />
            )}
            onEndReached={onEndCategoriesReached}
            onEndReachedThreshold={0.001}
          /> */}
        {/* )} */}
        {ListOfCategories?.length > 0 ? (
          ListOfCategories.map((data, index) => {
            return (
              <View style={{marginLeft: 15}}>
                <Text style={styles.topicName}>{data.name}</Text>
                <View style={styles.categoryList}>
                  {ListOfTopics.map((topic, index) => {
                    if (topic.parent_id === data.id) {
                      return (
                        <CategoryCard
                          category={topic}
                          onSelect={onSelectCategory}
                          selected={selectedCategories.some(
                            cat => cat?.id === topic?.id,
                          )}
                        />
                      );
                    }
                  })}
                </View>
              </View>
            );
          })
        ) : (
          <Text>No Data Available</Text>
        )}
      </View>

      <Footer
        currentSlideIndex={currentSlideIndex}
        goToPreviousSlide={goToPreviousSlide}
        goToNextSlide={gotoNextScreen}
        currentIndex={currentIndex}
        slides={slides}
        disabled={selectedCategories.length === 0}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
  },
  listContainer: {
    flex: 1,
    paddingTop: 20,
    padding: 2,
  },
  header: {
    color: color.palette.black,
    // textAlign: "center",
    fontSize: 30,
    marginLeft: 13,
    marginTop: 10,
    textTransform: 'capitalize',
  },
  desc: {
    marginTop: 10,
    marginLeft: 15,
  },
  topicName: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  categoryList: {
    display: 'flex',
    flexDirection: 'row',
    // overflow: 'scroll',
  },
});
