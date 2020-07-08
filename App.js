import React, {Component} from 'react';
import 'react-native-gesture-handler';
import {Platform, StyleSheet, Text, View} from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import EMOMScreen from './src/screens/EMOMScreen';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  createAppContainer,
} from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="EMOM">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EMOM"
          component={EMOMScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  welcome: {
    fontSize: 48,
    textAlign: 'center',
    margin: 10,
    fontFamily: 'Ubuntu-Bold',
  },
  instructions: {
    textAlign: 'center',
    color: '#033333',
    marginBottom: 5,
  },
});
