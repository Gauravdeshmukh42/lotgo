import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions, View, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { defaultValues } from "../../constants/defaultValues";
import { LOCAL_USER } from "../../constants/keys";
import { categoriesRequest } from "../../redux/slices";
import { color } from "../../theme";
import { Text } from "../../ui";
import { Footer } from "./Footer";
import { save } from "../../utils";
import CategoryCard from "../../components/common/CategoryCard";
// import Checkbox from "expo-checkbox";
const { width } = Dimensions.get("window");

export const Screen2 = ({
  currentSlideIndex,
  goToPreviousSlide,
  goToNextSlide,
  currentIndex,
  slides,
}) => {
  const categoryList = [{
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
  },]
  const [selectedCategories, setSelectedCategories] = useState([]);
  const { categories, categoriesData } = useSelector((state) => state.news);
  const [loadingMoreCategories, setLoadingMoreCategories] =
    React.useState(false);
  // const [categoryList, setCategoryList] = useState([]);
  // useEffect(() => {
  //   setCategoryList(categories?.childs?.filter((cat) => cat?.level === 1));
  // }, [categories]);
  const onSelectCategory = (category) => {
    if (selectedCategories?.some((cat) => cat?.id === category?.id)) {
      setSelectedCategories(
        selectedCategories?.filter((cat) => cat?.id !== category?.id)
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
    <View style={[styles.container, { width, position: "relative" }]}>
      <View style={{ flex: 1 }}>
        <Text style={styles.header}>{defaultValues.onBoardScreen2Title}</Text>
        {categoryList?.length > 0 && (
          <FlatList
            data={categoryList}
            numColumns={Math.ceil(categoryList.length)}
            key={Math.ceil(categoryList.length)}
            columnWrapperStyle={{ flexWrap: "wrap" }}
            style={styles.listContainer}
            renderItem={({ item: category }) => (
              <CategoryCard
                category={category}
                onSelect={onSelectCategory}
                selected={selectedCategories.some(
                  (cat) => cat?.id === category?.id
                )}
              />
            )}
            onEndReached={onEndCategoriesReached}
            onEndReachedThreshold={0.001}
          />
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
    textAlign: "center",
    fontSize: 20,
    marginLeft: 15,
    marginTop: 10,
    textTransform: "capitalize",
  },
});
