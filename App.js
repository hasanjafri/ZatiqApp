import React from 'react';
import { View, Text, Button, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';

import FeelingScreen from './src/screens/FeelingScreen';
import LoginScreen from './src/screens/LoginScreen';
import BusinessSignUpScreen from './src/screens/BusinessSignUpScreen';
import BusinessLoginScreen from './src/screens/BusinessLoginScreen';
import BusinessProfileScreen from './src/screens/BusinessProfileScreen';

const Application = StackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      header: false
    },
  },
  Feeling: {
    screen: FeelingScreen,
    navigationOptions: {
      header: false
    }
  },
  BusinessSignUp: {
      screen: BusinessSignUpScreen,
      navigationOptions: {
      header: false
    }
  },
  BusinessLogin: {
      screen: BusinessLoginScreen,
      navigationOptions: {
          header: false
      }
  },
  BusinessProfile: {
      screen: BusinessProfileScreen,
      navigationOptions: {
          header: false
      }
  }
});

export default class App extends React.Component {

    componentDidMount() {
        this.clearLoginData().done();
    }

    clearLoginData = async () => {
        var value = AsyncStorage.removeItem('businessName');
    }

    render() {
        return (
            <Application/>
        );
    }
}