import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { OnBoarding } from "../../screens";
import Routes from "../routes";

const Stack = createStackNavigator();

export function OutsideStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={Routes.ONBOARDING_SCREEN} component={OnBoarding} />
    </Stack.Navigator>
  );
}
