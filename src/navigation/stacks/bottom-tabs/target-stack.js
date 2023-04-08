import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Routes from "../../routes";
import { Target } from "../../../screens";

const Stack = createStackNavigator();

export function TargetStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Routes.TARGET_SCREEN} component={Target} />
    </Stack.Navigator>
  );
}
