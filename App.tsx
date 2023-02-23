import Constants from 'expo-constants';
import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "styled-components/native";
import RootNavigation from "./routes/RootNavigation";
import theme from "./theme";
// or any pure javascript modules available in npm


export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <StatusBar backgroundColor="transparent" translucent />
        <RootNavigation />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}