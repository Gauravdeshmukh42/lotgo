import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Routes from '../../routes';
import {Bookmark} from '../../../screens/Bookmark';
import Saved from '../../../screens/Bookmark/Saved';
const Stack = createStackNavigator();
export const BookmarkStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Routes.BOOKMARK_SCREEN}
        component={Bookmark}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={Routes.DETAILS_SCREEN}
        component={Saved}
        options={{
          headerBackTitle: '',
          headerTitle: '',
          headerTransparent: true,
          headerTintColor: 'black',
        }}
      />
    </Stack.Navigator>
  );
};
