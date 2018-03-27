import React from 'react';
import { View, Text, Button, AsyncStorage, Image, ImageBackground, StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation';

import FeelingScreen from './src/screens/FeelingScreen';
import LoginScreen from './src/screens/LoginScreen';
import BusinessSignUpScreen from './src/screens/BusinessSignUpScreen';
import BusinessLoginScreen from './src/screens/BusinessLoginScreen';
import BusinessProfileScreen from './src/screens/BusinessProfileScreen';

const Header = props => {
    return (
        <View style={styles.headerContainer}>
            <Image style={styles.headerLogo} source={require('./src/assets/logos/logo.png')}/>
        </View>
    )
}

const ImageHeader = props => (
    <View style={{ backgroundColor: '#eee' }}>
        <Image style={StyleSheet.absoluteFill} source={require('./src/assets/backgrounds/header.png')} />
        <Header {...props} style={styles.header}/>
    </View>
);

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
            headerTitleStyle: { color: '#fff' },
            header: (props) => <ImageHeader {...props} />,
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

const styles = StyleSheet.create({
    // Header
    header: {
        backgroundColor: 'transparent',
        width: '100%'
    },
    headerContainer: {
        height: 70,
        marginTop: 20
    },
    headerLogo: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain'
    }
});