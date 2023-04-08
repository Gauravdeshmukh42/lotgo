import {
  View,
  FlatList,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import React from "react";
import { color } from "../../theme";
import { Text } from "../../ui";

const CoursesByTopic = () => {
  const CourseList = [
    {
      course: "Java",
      subCourses: ["Java Programming Basics", "Spring", "Java Advance"],
    },
    {
      course: "Python",
      subCourses: ["Python Basics", "Python Data Types"],
    },
    {
      course: "Data Structure",
      subCourses: ["Data Structure Basics", "Types of Data Structure"],
    },
  ];

  function renderCourseList({ item }) {
    return (
      <TouchableWithoutFeedback>
        {
          <View
            style={{
              paddingVertical: 5,
              paddingHorizontal: 20,
              justifyContent: "center",
            }}
          >
            <View style={{ marginTop: 10 }}>
              <Text style={[color.text, { fontSize: 18, marginLeft: 20 }]}>
                {item.course}
              </Text>
            </View>
          </View>
        }
      </TouchableWithoutFeedback>
    );
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={CourseList}
        renderItem={renderCourseList}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
};

export default CoursesByTopic;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  rectangle: {
    height: 10,
    width: 10,
    backgroundColor: "black",
    position: "absolute",
    marginRight: 10,
  },
});
