import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import  Start  from '../pages/Start';
import  Main  from '../pages/Main'
import Wizard from '../pages/Wizard';
import { About } from '../pages/About';

const Stack = createStackNavigator();

export function AppRoutes() {
  return (
    <Stack.Navigator screenOptions={{headerShown: true}} initialRouteName='Start'>
      <Stack.Screen options={{headerShown: false}} name="Start" component={Start} />
      <Stack.Screen options={{headerShown: false}} name="Main" component={Main} />
      <Stack.Screen options={{headerShown: false}} name="Wizard" component={Wizard} />
      <Stack.Screen name="About" component={About} />
    </Stack.Navigator>
  );
}