import React from 'react';
import { View } from 'react-native';
import { StackNavigator, DrawerNavigator, TabNavigator, SwitchNavigator } from 'react-navigation';

// Custom imports
import FeelingScreen from './screens/application/FeelingScreen';
import SuggestionScreen from './screens/application/SuggestionScreen';
import RestaurantScreen from './screens/application/RestaurantScreen';
import PictureScreen from './screens/PictureScreen';
import FindRestaurantScreen from './screens/application/FindRestaurantScreen';
import LoginScreen from './screens/LoginScreen';
import BusinessLoginScreen from './screens/business/BusinessLoginScreen';
import BusinessSignUpScreen from './screens/business/BusinessSignUpScreen';
import BusinessProfileScreen from './screens/business/BusinessProfileScreen';

import { ImageHeader, HeaderLogo, MenuLogo } from './components/header/Header';
import Drawer from './components/drawer/Drawer';

const backHeader = {
    headerBackground: <ImageHeader />,
    headerTintColor: 'white'
}
const mainApplication = StackNavigator({
    Feeling: {
        screen: FeelingScreen,
        navigationOptions: ({ navigation }) => {
            return {
                headerBackground: <ImageHeader />,
                headerTitle: <HeaderLogo />,
                headerLeft: <MenuLogo navigation={navigation} />,
                headerRight: (<View></View>)
            }
        }
    },
    Suggestion: {
        screen: SuggestionScreen,
        navigationOptions: {
            ...backHeader
        }
    },
    Restaurant: {
        screen: RestaurantScreen,
        navigationOptions: {
            ...backHeader
        }
    },
    Picture: {
        screen: PictureScreen,
        navigationOptions: {
            ...backHeader
        }
    }
}, {
    headerMode: 'float'
});

const ApplicationIn = DrawerNavigator({
    Application: {
        screen: mainApplication
    },
    FindRestaurant: {
        screen: FindRestaurantScreen,
        navigationOptions: ({ navigation }) => {
            return {
                headerBackground: <ImageHeader />,
                headerTitle: <HeaderLogo />,
                headerLeft: <MenuLogo navigation={navigation} />,
                headerRight: (<View></View>)
            }
        }
    }
}, {
    contentComponent: (props) => <Drawer {...props} />,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle'
});

const ApplicationOut = StackNavigator({
    Login: {
        screen: LoginScreen,
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
    BusinessSignUp: {
        screen: BusinessSignUpScreen,
        navigationOptions: {
            header: false
        }
    },
    BusinessProfile: {
        screen: BusinessProfileScreen,
        navigationOptions: {
            ...backHeader
        }
    }
});

const createRootNavigator = (hasUser = false) => {
    return SwitchNavigator({
        SwitchIn: { screen: ApplicationIn },
        SwitchOut: { screen: ApplicationOut }
    }, { initialRouteName: hasUser ? 'SwitchIn' : 'SwitchOut' });
};

export default createRootNavigator;