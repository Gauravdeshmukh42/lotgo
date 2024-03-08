import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Routes from '../../routes';
import {Bookmark} from '../../../screens/Bookmark';
const Stack = createStackNavigator();
export const BookmarkStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={Routes.BOOKMARK_SCREEN} component={Bookmark} />
    </Stack.Navigator>
  );
};
