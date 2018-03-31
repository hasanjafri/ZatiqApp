import React from 'react';
import { StackNavigator, DrawerNavigator, TabNavigator, SwitchNavigator } from 'react-navigation';

// Custom imports
import FeelingScreen from './screens/FeelingScreen';
import SuggestionScreen from './screens/SuggestionScreen';
import RestaurantScreen from './screens/RestaurantScreen';
import PictureScreen from './screens/PictureScreen';
import FindRestaurantScreen from './screens/FindRestaurantScreen';
import LoginScreen from './screens/LoginScreen';
import BusinessSignUpScreen from './screens/BusinessSignUpScreen';
import BusinessLoginScreen from './screens/BusinessLoginScreen';
import BusinessProfileScreen from './screens/BusinessProfileScreen';

import ImageHeader from './components/header/Header';
import Drawer from './components/drawer/Drawer';

const mainApplication = StackNavigator({
    Feeling: {
        screen: FeelingScreen,
        navigationOptions: {
            header: (props) => <ImageHeader showDrawerOpen {...props} />
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
        navigationOptions: {
            header: (props) => <ImageHeader showDrawerOpen {...props} />
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

const createRootNavigator = (hasUser = false) => {
    return SwitchNavigator({
        SwitchIn: { screen: ApplicationIn },
        SwitchOut: { screen: ApplicationOut }
    }, { initialRouteName: hasUser ? 'SwitchIn' : 'SwitchOut' });
};

export default createRootNavigator;