import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Text } from "../../ui";
import { Footer } from "./Footer";
import { defaultValues } from "../../constants/defaultValues";
import { color } from "../../theme";
import Chip from "../../components/common/Chip";
import { useSelector } from "react-redux";
import { save } from "../../utils";
import { LOCAL_USER } from "../../constants/keys";

const { width } = Dimensions.get("window");

export const Screen4 = ({
  currentSlideIndex,
  goToPreviousSlide,
  goToNextSlide,
  currentIndex,
  slides,
  selectedCategories,
}) => {
  const topics = ["java", "python", "react js", "angular js", "nest js"];
  const [selectedTopics, setSelectedTopics] = useState([]);
  const { categories, categoriesData } = useSelector((state) => state.news);
  const [topicList, setTopicList] = useState([]);

  useEffect(() => {
    // setTopicList(categories?.filter((cat) => cat?.attributes?.level === 4));
    setTopicList(selectedCategories);
  }, [categories, selectedCategories]);
  const onSelectTopic = (topic) => {
    if (selectedTopics.some((selectedTopic) => selectedTopic === topic)) {
      setSelectedTopics(
        selectedTopics.filter((selectedTopic) => selectedTopic !== topic)
      );
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };
  const gotoNextScreen = async () => {
    // await save(LOCAL_USER, selectedTopics);
    goToNextSlide();
  };
  return (
    <View style={[styles.container, { width, position: "relative" }]}>
      <View style={{ flex: 1 }}>
        <Text style={styles.header}>{defaultValues.onBoardScreen4Title}</Text>
        {topicList?.length > 0 && (
          <FlatList
            data={topicList?.childs || []}
            numColumns={2}
            style={styles.listContainer}
            renderItem={({ item: topic }, index) => (
              <Chip
                index={index}
                title={topic?.name}
                onSelect={onSelectTopic}
                selected={selectedTopics.some((top) => top?.id === topic?.id)}
                style={{ flex: 0.5 }}
                category={topic}
              />
            )}
          />
        )}
      </View>

      <Footer
        currentSlideIndex={currentSlideIndex}
        goToPreviousSlide={goToPreviousSlide}
        goToNextSlide={gotoNextScreen}
        currentIndex={currentIndex}
        slides={slides}
        disabled={selectedTopics.length === 0}
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
    marginLeft: 15,
    marginTop: 10,
    textTransform: "capitalize",
  },
  listContainer: {
    flex: 1,
    paddingTop: 20,
    padding: 10,
  },
});
