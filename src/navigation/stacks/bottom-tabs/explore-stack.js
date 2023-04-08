import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Routes from "../../routes";
import { Explore } from "../../../screens";

const Stack = createStackNavigator();

export function ExploreStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Routes.EXPLORE_SCREEN}
        component={Explore}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
