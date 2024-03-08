import React from 'react';
import {StyleSheet, BackHandler, View, Dimensions} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Topic} from '../../../screens/Explore';
import Target from '../../../screens/Target';
import Settings from '../../../screens/Settings';
import {color} from '../../../theme';
import Home from '../../../screens/Home';
import Routes from '../../routes';
import {DashboardStack} from './dashboard-stack';
import {AccountStack} from './account-stack';
import {TargetStack} from './target-stack';
import {Text} from '../../../ui';
import {ExploreStack} from './explore-stack';
import {BookmarkStack} from './bookmark-stack';
const {width, height} = Dimensions.get('window');
const BottomTabs = createBottomTabNavigator();

export const BottomTabsStack = () => {
  React.useEffect(() => {
    const handleBackButton = () => {
      // console.log('>> back handler called');
      return false;
    };
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
  }, []);
  return (
    // <NavigationContainer>
    <View
      style={{
        width,
        height,
      }}>
      <BottomTabs.Navigator
        screenOptions={{
          tabBarShowLabel: true,
          tabBarActiveTintColor: '#000',
          tabBarStyle: {
            height: 58,
          },
          tabBarLabelStyle: {
            paddingBottom: 6,
          },
          headerShown: false,
        }}
        backBehavior={'none'}>
        {/* <BottomTabs.Screen
        name="Home"
        component={Home}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name="ios-home"
                color={focused ? color.primary : "#8F8F8F"}
                size={26}
              />
            );
          },
        }}
      /> */}
        <BottomTabs.Screen
          name={Routes.DASHBOARD_STACK}
          component={DashboardStack}
          options={{
            unmountOnBlur: true,
            title: 'Home',
            tabBarIcon: ({focused}) => {
              return (
                <Ionicons
                  name="ios-home"
                  color={focused ? color.primary : '#8F8F8F'}
                  size={26}
                />
              );
            },
          }}
        />
        <BottomTabs.Screen
          name={Routes.BOTTOM_TAB_STACK}
          component={BookmarkStack}
          options={{
            unmountOnBlur: true,
            title: 'Bookmark',
            tabBarIcon: ({focused}) => {
              return (
                <Ionicons
                  name="bookmark-outline"
                  color={focused ? color.primary : '#8F8F8F'}
                  size={26}
                />
              );
            },
          }}
        />
        <BottomTabs.Screen
          name={Routes.EXPLORE_STACK}
          component={ExploreStack}
          options={{
            unmountOnBlur: true,
            title: 'Profile',
            tabBarIcon: ({focused}) => {
              return (
                <Ionicons
                  name="person-outline"
                  color={focused ? color.primary : '#8F8F8F'}
                  size={26}
                />
              );
            },
          }}
        />

        {/* <BottomTabs.Screen
          name={Routes.ACCOUNT_STACK}
          component={AccountStack}
          options={{
            unmountOnBlur: true,
            title: 'Settings',
            tabBarIcon: ({focused}) => {
              return (
                <Ionicons
                  name="settings-outline"
                  color={focused ? color.primary : '#8F8F8F'}
                  size={26}
                />
              );
            },
          }}
        /> */}
      </BottomTabs.Navigator>
    </View>
    // </NavigationContainer>
  );
};
console.log('Tab bar height : ', BottomTabs.Navigator.height);
export const styles = StyleSheet.create({
  tabContainer: {
    width: 24,
    height: 24,
    position: 'relative',
  },
  tabBadge: {
    position: 'absolute',
    top: 0,
    right: -1,
    backgroundColor: '#000',
    borderRadius: 16,
    zIndex: 2,
    width: 10,
    height: 10,
  },
  tabBadgeText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '600',
  },
});
