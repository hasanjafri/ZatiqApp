import React from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';

import FeelingScreen from './src/screens/FeelingScreen';
import LoginScreen from './src/screens/LoginScreen';

const App = StackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      headerTitle: 'Welcome to Zatiq',
    },
  },
  Feeling: {
    screen: FeelingScreen,
    navigationOptions: {
    },
  },
});

export default App;