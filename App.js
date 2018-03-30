import React from 'react';
import { View, Text, Button, AsyncStorage, Image, ImageBackground, StyleSheet, TouchableHighlight } from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
import { Icon } from 'react-native-elements';

import FeelingScreen from './src/screens/FeelingScreen';
import SuggestionScreen from './src/screens/SuggestionScreen';
import RestaurantScreen from './src/screens/RestaurantScreen';
import PictureScreen from './src/screens/PictureScreen';
import LoginScreen from './src/screens/LoginScreen';
import BusinessSignUpScreen from './src/screens/BusinessSignUpScreen';
import BusinessLoginScreen from './src/screens/BusinessLoginScreen';
import BusinessProfileScreen from './src/screens/BusinessProfileScreen';

const Header = props => {
    return (
        <View style={styles.headerContainer}>
            { props.showBack ?
                <TouchableHighlight underlayColor={'transparent'} style={styles.headerBackContainer} onPress={() => props.navigation.dispatch(NavigationActions.back())}>
                    <Icon name='clear' color={'#FFF'} />
                </TouchableHighlight> : null
            }
            <Image style={styles.headerLogo} source={require('./src/assets/logos/logo.png')}/>
        </View>
    );
};

const ImageHeader = props => {
    return (
        <View style={{ backgroundColor: '#eee' }}>
            <Image style={StyleSheet.absoluteFill} source={require('./src/assets/backgrounds/header.png')} />
            <Header {...props} style={styles.header}/>
        </View>
    );
};

const Application = StackNavigator({
    Login: {
        screen: LoginScreen,
        navigationOptions: {
            header: false
        }
    },
    Feeling: {
        screen: FeelingScreen,
        navigationOptions: {
            header: (props) => <ImageHeader {...props} />
        }
    },
    Suggestion: {
        screen: SuggestionScreen,
        navigationOptions: {
            header: (props) => <ImageHeader showBack {...props} />
        }
    },
    Restaurant: {
        screen: RestaurantScreen,
        navigationOptions: {
            header: (props) => <ImageHeader showBack {...props} />
        }
    },
    Picture: {
        screen: PictureScreen,
        navigationOptions: {
            header: (props) => <ImageHeader showBack {...props} />
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
            <Application />
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
        width: '100%',
        marginTop: 20,
        flexDirection: 'row'
    },
    headerBackContainer: {
        zIndex: 2,
        justifyContent: 'center',
        paddingHorizontal: 10
    },
    headerLogo: {
        position: 'absolute',
        width: '100%',
        height: 70,
        resizeMode: 'contain'
    }
});