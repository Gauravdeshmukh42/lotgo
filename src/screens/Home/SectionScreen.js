import {View, Text, TouchableWithoutFeedback, FlatList} from 'react-native';
import React from 'react';
import {Category} from '../../components/common/Category';
import {useNavigation} from '@react-navigation/native';
import Routes from '../../navigation/routes';

const SectionScreen = ({section, dataList}) => {
  const navigation = useNavigation();
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
        }}>
        <View style={{width: '85%'}}>
          <Text style={{fontSize: 18, fontWeight: '700', color: '#000'}}>
            {section.attributes.name}
          </Text>
        </View>
        <View>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate(Routes.LIST_VIEW_SCREEN, {
                data: section,
                dataList,
              });
            }}>
            <Text style={{marginTop: 5, fontSize: 14, color: 'grey'}}>
              See All
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <View style={{paddingLeft: 10, paddingTop: 10, paddingBottom: 10}}>
        <FlatList
          keyExtractor={(key, index) => {
            return index;
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
          // contentContainerStyle={{ padding: 10 }}
          data={dataList}
          renderItem={({item, index}) => {
            return (
              <Category
                imageUri="https://images.unsplash.com/photo-1674505667713-4d4e8523366e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
                name={item?.attributes?.name}
              />
            );
          }}
        />
      </View>
    </View>
  );
};

export default SectionScreen;
