// App container / Root navigator
import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import {color} from '../theme';
import Routes from './routes';
import {dialogOptions} from './navigation-utils';
import {Backdrop} from '../screens';
import {InsideStack} from './stacks/inside-stack';
import Toast from 'react-native-toast-message';

import {OutsideStack} from './stacks/outside-stack';
import {ONBOARDING_SCREEN} from '../constants/keys';
import {load} from '../utils';
import {useDispatch} from 'react-redux';
import {categoriesRequest} from '../redux/slices';
const Stack = createStackNavigator();
const InsideModalStack = () => (
  <Stack.Navigator screenOptions={dialogOptions}>
    <Stack.Screen
      name={Routes.BACKDROP}
      component={Backdrop}
      options={{gestureEnabled: false}}
    />
  </Stack.Navigator>
);
export const RootNavigator = React.forwardRef((props, ref) => {
  const [isFirstTimeLoad, setIsFirstTimeLoad] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    load(ONBOARDING_SCREEN).then(res => {
      if (res == null) {
        setIsFirstTimeLoad(true);
      } else {
        setIsFirstTimeLoad(true);
      }
    });
  }, []);
  useEffect(() => {
    const query = '';
    dispatch(categoriesRequest({query}));
  }, [dispatch]);
  if (isFirstTimeLoad === null) return null;
  return (
    <>
      <NavigationContainer {...props} ref={ref}>
        <>
          <StatusBar
            barStyle="light-content"
            backgroundColor={color.palette.pinkishGrey}
          />
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              presentation: 'modal',
            }}>
            <>
              {isFirstTimeLoad && (
                <Stack.Screen
                  name={Routes.OUTSIDE_STACK}
                  component={OutsideStack}
                />
              )}

              <Stack.Screen
                name={Routes.INSIDE_STACK}
                component={InsideStack}
              />
              <Stack.Screen
                name={Routes.INSIDE_MODAL_STACK}
                component={InsideModalStack}
                options={dialogOptions}
              />
            </>
          </Stack.Navigator>
          <Toast ref={toastRef => Toast.setRef(toastRef)} />
        </>
      </NavigationContainer>
    </>
  );
});
