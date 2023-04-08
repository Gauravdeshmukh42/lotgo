import {
  View,
  FlatList,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import React from "react";
import { color } from "../../theme";
import { Text } from "../../ui";
import Routes from "../../navigation/routes";

const CourseList = ({ navigation }) => {
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
              paddingVertical: 10,
              paddingHorizontal: 20,
              justifyContent: "center",
            }}
          >
            <View
              style={{
                paddingHorizontal: 20,
              }}
            ></View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View>
                <Text
                  style={[color.text, { fontSize: 18, fontWeight: "bold" }]}
                >
                  {item.course}
                </Text>
              </View>
              <View>
                <TouchableWithoutFeedback
                  onPress={() => {
                    navigation.navigate(Routes.COURSE_BY_TOPIC_SCREEN);
                  }}
                >
                  <Text style={{ color: "grey" }}>See All</Text>
                </TouchableWithoutFeedback>
              </View>
            </View>
            <View style={{ marginTop: 10 }}>
              {item.subCourses.length > 0
                ? item.subCourses.map((topic) => (
                    <View
                      style={{
                        marginTop: 10,
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <View style={styles.rectangle}></View>
                      <Text
                        style={[color.text, { fontSize: 16, marginLeft: 20 }]}
                      >
                        {topic}
                      </Text>
                    </View>
                  ))
                : null}
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

export default CourseList;
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
