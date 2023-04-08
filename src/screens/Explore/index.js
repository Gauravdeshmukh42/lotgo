import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import Routes from "../../navigation/routes";
import { useBackHandler } from "../../hooks";
import { color, spacing } from "../../theme";
import { Divider, Screen } from "../../ui";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useSelector } from "react-redux";
import CategoryCard from "../../components/common/CategoryCard";
import { useRef } from "react";
import SearchBar from "../../components/common/SearchBar";

export const Explore = ({ navigation }) => {
  useBackHandler(navigation, Routes.DASHBOARD_STACK);
  const { categories, categoriesData } = useSelector((state) => state.news);
  const [loadingMoreCategories, setLoadingMoreCategories] =
    React.useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [hasText, setHasText] = useState(false);
  const searchInput = useRef(null);
  useEffect(() => {
    setCategoryList(categories?.childs?.filter((cat) => cat?.level === 1));
  }, [categories]);
  const onSelectCategory = (category) => {
    // if (selectedCategories?.some((cat) => cat?.id === category?.id)) {
    //   setSelectedCategories(
    //     selectedCategories?.filter((cat) => cat?.id !== category?.id)
    //   );
    // } else {
    //   setSelectedCategories([...selectedCategories, category]);
    // }
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
  const CategoryList = [
    {
      title: "All",
      showArrow: true,
      isDisabled: false,
    },
    {
      title: "It & Software",
      showArrow: true,
      isDisabled: false,
    },
    {
      title: "Finanace & Accounting",
      showArrow: true,
      isDisabled: false,
    },
  ];
  function isDisabled(item) {
    return item.isDisabled === true;
  }
  function renderCategoryList({ item }) {
    const onClickCategory = (category) => {
      navigation.navigate(Routes.COURSE_LIST_SCREEN);
    };
    return (
      <TouchableWithoutFeedback
        disabled={isDisabled(item)}
        onPress={() => onClickCategory(`${item.title}`)}
      >
        {
          <View>
            <View
              style={{
                paddingVertical: 15,
                paddingHorizontal: 10,
                justifyContent: "center",
                opacity: isDisabled(item) ? 0.7 : 1,
              }}
            >
              <View>
                <Text style={{ color: color.text }}>{item.title}</Text>
              </View>
              <MaterialIcons
                name="keyboard-arrow-right"
                color={color.primary}
                style={styles.icon}
                size={26}
              />
            </View>
            <Divider />
          </View>
        }
      </TouchableWithoutFeedback>
    );
  }
  return (
    <Screen>
      <View style={styles.container}>
        {/* <Text
        style={{
          marginLeft: 10,
          marginTop: 10,
          fontSize: 20,
          fontWeight: "500",
        }}
      >
        Categories
      </Text> */}
        {/* <FlatList
        data={CategoryList}
        renderItem={renderCategoryList}
        keyExtractor={(_, index) => index.toString()}
      /> */}
        <SearchBar
          searchText={searchText}
          setSearchText={setSearchText}
          onSubmit={() => {}}
        />
        {categoryList?.length > 0 && (
          <FlatList
            data={categoryList || []}
            numColumns={2}
            // numColumns={Math.ceil(categories.length)}
            // columnWrapperStyle={{ flexWrap: "wrap" }}
            // showsVerticalScrollIndicator={false}
            style={styles.listContainer}
            renderItem={({ item: category }) => {
              return (
                <CategoryCard category={category} onSelect={onSelectCategory} />
              );
            }}
            onEndReached={onEndCategoriesReached}
            onEndReachedThreshold={0.001}
          />
        )}
      </View>
    </Screen>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    marginTop: 15,
    padding: 10,
  },
  icon: {
    marginTop: spacing[2],
    padding: spacing[2],
    paddingTop: spacing[5],
    paddingBottom: spacing[5],
    marginRight: spacing[3],
    position: "absolute",
    right: 0,
  },
  listContainer: {
    marginTop: 20,
  },
});
