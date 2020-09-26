import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Navegation from './src/navigations';

import Login from './src/tela/Login';
import Home from './src/tela/Home';

export default function App() {
  return (
    <Navegation />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
