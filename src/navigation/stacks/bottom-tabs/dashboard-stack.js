import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Routes from "../../routes";
import { Home } from "../../../screens";
import DetailsScreen from "../../../screens/Home/DetailsScreen";

const Stack = createStackNavigator();

export function DashboardStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Routes.DASHBOARD_SCREEN}
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.CARD_DETAILS_SCREEN}
        component={DetailsScreen}
        options={{
          headerBackTitle: "",
          headerTitle: "",
          headerTransparent: true,
          headerTintColor: "black",
        }}
      />
    </Stack.Navigator>
  );
}
