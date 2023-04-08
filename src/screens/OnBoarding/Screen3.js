import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions, View, FlatList } from "react-native";
import { Text } from "../../ui";
import { Footer } from "./Footer";
import { defaultValues } from "../../constants/defaultValues";
import { color } from "../../theme";
import Chip from "../../components/common/Chip";
import { useSelector } from "react-redux";
const { width } = Dimensions.get("window");
import { load, save } from "../../utils";
import { LOCAL_USER, SELECTED_COURSES } from "../../constants/keys";

export const Screen3 = ({
  currentSlideIndex,
  goToPreviousSlide,
  goToNextSlide,
  currentIndex,
  slides,
  selectedCategories,
}) => {
  const courses = [
    "programming & framework",
    "devops",
    "software testing",
    "data structure",
  ];
  const [selectedCourses, setSelectedCourses] = useState([]);
  const { categories, categoriesData } = useSelector((state) => state.news);
  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    // console.log("selectedCategories", selectedCategories);
    setCourseList(selectedCategories);
  }, [selectedCategories]);
  const onSelectCourse = (course) => {
    if (
      selectedCourses.some(
        (selectedCourse) => selectedCourse?.id === course?.id
      )
    ) {
      setSelectedCourses(
        selectedCourses.filter(
          (selectedCourse) => selectedCourse?.id !== course?.id
        )
      );
    } else {
      setSelectedCourses([...selectedCourses, course]);
    }
  };
  const gotoNextScreen = async () => {
    // await save(SELECTED_COURSES, filteredData);
    goToNextSlide();
  };

  // const renderSection = ({ item }) => {
  //   return (
  //     <FlatList
  //       data={item.child_categs}
  //       numColumns={3}
  //       renderItem={renderListItem}
  //       keyExtractor={keyExtractor}
  //     />
  //   );
  // };

  // const renderSectionHeader = (section) => {
  //   console.log("2323332", section);
  //   return <Text style={{ color: "#000" }}>{section?.attributes.name}</Text>;
  // };

  // const renderListItem = ({ item }) => {
  //   return (
  //     <View
  //       style={{ height: 50, width: 100, borderColor: "green", borderWidth: 1 }}
  //     >
  //       <Text>{item.name}</Text>
  //       <Text>{item.color}</Text>
  //     </View>
  //   );
  // };

  // const keyExtractor = (item) => {
  //   return item.name;
  // };

  return (
    <View style={[styles.container, { width, position: "relative" }]}>
      <View style={{ flex: 1 }}>
        <Text style={styles.header}>{defaultValues.onBoardScreen3Title}</Text>
        {courseList?.length > 0 && (
          <FlatList
            data={courseList ? courseList : []}
            showsVerticalScrollIndicator={false}
            style={styles.listContainer}
            renderItem={({ item }) => {
              return (
                <View style={{ marginBottom: 15 }}>
                  <Text variant="header" style={{ fontWeight: "bold" }}>
                    {`${item?.name} :`}
                  </Text>
                  {item?.childs?.length > 0 && (
                    <FlatList
                      data={item.childs.length > 0 ? item.childs : []}
                      numColumns={Math.ceil(item.childs.length)}
                      key={Math.ceil(item.childs.length)}
                      columnWrapperStyle={{ paddingLeft: 10, flexWrap: "wrap" }}
                      renderItem={({ item }) => {
                        return (
                          <Chip
                            category={item}
                            onSelect={onSelectCourse}
                            selected={selectedCourses.some(
                              (cour) => cour?.id === item?.id
                            )}
                            title={item?.name}
                            style={{ flex: 0.5 }}
                          />
                        );
                      }}
                      keyExtractor={(innerItem) => innerItem.id}
                    />
                  )}
                </View>
              );
            }}
          />
        )}
      </View>

      <Footer
        currentSlideIndex={currentSlideIndex}
        goToPreviousSlide={goToPreviousSlide}
        goToNextSlide={gotoNextScreen}
        currentIndex={currentIndex}
        slides={slides}
        disabled={selectedCourses.length === 0}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
  },
  header: {
    color: color.palette.black,
    textAlign: "center",
    fontSize: 20,
    // marginLeft: 5,
    marginTop: 10,
    marginBottom: 15,
    textTransform: "capitalize",
    paddingLeft: 8,
    paddingRight: 8,
  },
  listContainer: {
    flex: 1,
    paddingTop: 20,
    padding: 15,
  },
});
