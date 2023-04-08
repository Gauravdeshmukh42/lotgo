import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Routes from '../routes';
import {BottomTabsStack} from './bottom-tabs';

import {color} from '../../theme';
import CourseList from '../../screens/Explore/CourseList';
import CoursesByTopic from '../../screens/Explore/CoursesByTopic';
import ListView from '../../screens/Home/ListView';

const Stack = createStackNavigator();

export function MainStack({navigation}) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: color.palette.black,
        headerShown: 'screen',
      }}>
      <Stack.Screen
        name={Routes.BOTTOM_TAB_STACK}
        component={BottomTabsStack}
        options={{
          headerShown: false,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name={Routes.COURSE_LIST_SCREEN}
        component={CourseList}
        options={{
          headerTitleAlign: 'center',
          headerTitle: 'Courses',
        }}
      />
      <Stack.Screen
        name={Routes.COURSE_BY_TOPIC_SCREEN}
        component={CoursesByTopic}
        options={{
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name={Routes.LIST_VIEW_SCREEN}
        component={ListView}
        options={{
          headerTitleAlign: 'center',
          headerBackTitle: '',
        }}
      />
    </Stack.Navigator>
  );
}
