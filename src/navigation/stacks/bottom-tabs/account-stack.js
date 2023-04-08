import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Routes from "../../routes";
import { Settings } from "../../../screens";

const Stack = createStackNavigator();

export function AccountStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Routes.SETTING_SCREEN} component={Settings} />
    </Stack.Navigator>
  );
}
