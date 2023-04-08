import { View, TextInput, StyleSheet } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { color } from "../../theme";

const SearchBar = ({ searchText, setSearchText, onSubmit }) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchIcon}>
        <Ionicons name="search" color={color.palette.warmGrey} size={20} />
      </View>
      <TextInput
        placeholder="Search"
        style={styles.input}
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
        onSubmitEditing={onSubmit}
      />
      {searchText?.length > 0 && (
        <View style={styles.cancelIcon}>
          <Ionicons
            name="close"
            color={color.palette.warmGrey}
            size={25}
            onPress={() => {
              setSearchText();
              onSubmit();
            }}
          />
        </View>
      )}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginRight: 10,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    borderColor: color.palette.warmGrey,
  },
  input: {
    marginVertical: 10,
    height: 25,
    width: "80%",
    fontSize: 18,
  },
  searchIcon: {
    position: "absolute",
    left: 5,
  },
  cancelIcon: {
    position: "absolute",
    right: 10,
  },
});
