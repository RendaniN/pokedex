import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppRoutes } from "./AppRoutes";


export default function RootNavigation() {
  return (
    <NavigationContainer >
      <AppRoutes />
    </NavigationContainer>
  );
}
