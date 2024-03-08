import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {color} from '../../theme';

import {API_URL_DEV} from '@env';
export const CategoryCard = React.memo(
  ({category, index, onSelect, selected, style}) => {
    return (
      <TouchableWithoutFeedback onPress={() => onSelect(category)}>
        <View
          style={[
            styles.container,
            // { backgroundColor: category.backgroundColor },
          ]}>
          <View
            style={[
              styles.row,
              // {
              //   backgroundColor: selected
              //     ? color.palette.white
              //     : color.palette.black,
              // },
              {
                backgroundColor: selected
                  ? color.palette.black
                  : color.palette.white,
                color: selected ? color.palette.black : color.palette.white,
                borderColor: selected
                  ? color.palette.white
                  : color.palette.black,
                borderWidth: 1,
                borderRadius: 10,
                height: 100,
              },
            ]}>
            <Text
              style={[
                styles.categoryName,
                {color: selected ? color.palette.white : color.palette.black},
                // {color: 'black'},
              ]}
              numberOfLines={3}>
              {category.name}
            </Text>

            {selected && (
              <View style={styles.iconContainer}>
                <Ionicons
                  name="help-outline"
                  color={color.palette.black}
                  size={18}
                  style={styles.icon}
                />
              </View>
            )}

            {/* {category?.attributes?.icon?.data?.attributes?.formats?.thumbnail
              ?.url ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                  alignSelf: 'flex-end',
                  textAlign: 'flex-end',
                  // position: 'absolute',
                  // right: 4,
                  // top: 4,
                }}>
                <Image
                  source={{
                    // uri: `${API_URL_DEV}${category.attributes.icon.data.attributes.formats.thumbnail.url}`,
                    uri: `${category.attributes.icon.data.attributes.formats.thumbnail.url}`,

                  }}
                  style={[
                    {
                      // margin: -5,
                      // borderTopRightRadius: 10,
                      // borderBottomRightRadius: 10,
                      resizeMode: 'contain',
                      width: 150,
                      height: 100,
                      borderRadius: 5,
                    },
                  ]}
                />
              </View>
            ) : (
              <Text style={{ height: 60 }}></Text>
            )} */}
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  },
);

export default CategoryCard;
const styles = StyleSheet.create({
  container: {
    width: '44%',
    // alignItems: "center",
    margin: '3%',
    borderRadius: 10,
    // backgroundColor: "grey",
  },
  row: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryName: {
    fontSize: 14,
    fontWeight: 'bold',
    // alignSelf: "center",
    // flexShrink: 1,
    flex: 1,
    // color: color.palette.white,
    // position: "absolute",
    flexWrap: 'wrap',
    // alignItems: 'center',
    alignSelf: 'center',
    textAlign: 'center',
  },
  iconContainer: {
    position: 'absolute',
    top: 8,
    right: 10,
    borderRadius: 15,
    height: 25,
    width: 25,
    backgroundColor: color.palette.white,
    justifyContent: 'center',
  },
  icon: {
    textAlign: 'center',
  },
});
