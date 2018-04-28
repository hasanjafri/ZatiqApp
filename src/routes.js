import React from 'react';
import { View } from 'react-native';
import { StackNavigator, DrawerNavigator, TabNavigator, SwitchNavigator } from 'react-navigation';
import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition';

// Custom imports
import FeelingScreen from './screens/application/FeelingScreen';
import SuggestionScreen from './screens/application/SuggestionScreen';
import RestaurantScreen from './screens/application/RestaurantScreen';
import PictureScreen from './screens/PictureScreen';
import FindRestaurantScreen from './screens/application/FindRestaurantScreen';
import FindFoodScreen from './screens/application/FindFoodScreen';
import LoginScreen from './screens/LoginScreen';
import ReviewsScreen from './screens/ReviewsScreen';
import BusinessLoginScreen from './screens/business/BusinessLoginScreen';
import BusinessSignUpScreen from './screens/business/BusinessSignUpScreen';
import BusinessProfileScreen from './screens/business/BusinessProfileScreen';
import BusinessUploadScreen from './screens/business/BusinessUploadScreen';

import BusinessRestaurantScreen from './screens/business/BusinessRestaurantScreen';

import appState from './appState';
const state = appState.getInstance();

import { ImageHeader, HeaderLogo, MenuLogo, SkipButton, SettingsButton } from './components/header/Header';
import Drawer from './components/drawer/Drawer';

const backHeader = {
    headerBackground: <ImageHeader />,
    headerTintColor: 'white'
}

const mainApplication = StackNavigator({
    Feeling: {
        screen: FeelingScreen,
        navigationOptions: ({ navigation }) => {
            const { params = {} } = navigation.state;
            const user = state.getUser();
            let headerRight = (<View></View>);
            if (user && user.type === 'user') {
                headerRight =  <SettingsButton navigation={navigation} onPress={params.togglePreferenceModal} />;
            }
            return {
                headerBackground: <ImageHeader />,
                headerTitle: <HeaderLogo />,
                headerLeft: <MenuLogo navigation={navigation} />,
                headerRight
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
    transitionConfig: getSlideFromRightTransition,
    headerMode: 'float'
});

const ApplicationIn = DrawerNavigator({
    Application: {
        screen: mainApplication
    },
    FindRestaurant: {
        screen: StackNavigator({
            screen: FindRestaurantScreen,
        }, {
            navigationOptions: ({ navigation }) => {
                return {
                    headerBackground: <ImageHeader />,
                    headerTitle: <HeaderLogo />,
                    headerLeft: <MenuLogo navigation={navigation} />,
                    headerRight: (<View></View>)
                }
            }
        })
    },
    FindFood: {
        screen: StackNavigator({
            screen: FindFoodScreen,
        }, {
            navigationOptions: ({ navigation }) => {
                return {
                    headerBackground: <ImageHeader />,
                    headerTitle: <HeaderLogo />,
                    headerLeft: <MenuLogo navigation={navigation} />,
                    headerRight: (<View></View>)
                }
            }
        })
    },
    BusinessUpload: {
        screen: StackNavigator({
            screen: BusinessUploadScreen,
        }, {
            navigationOptions: ({ navigation }) => {
                return {
                    headerBackground: <ImageHeader />,
                    headerTitle: <HeaderLogo />,
                    headerLeft: <MenuLogo navigation={navigation} />,
                    headerRight: (<View></View>)
                }
            }
        })
    },
    BusinessProfile: {
        screen: StackNavigator({
            screen: BusinessProfileScreen,
        }, {
            navigationOptions: ({ navigation }) => {
                return {
                    headerBackground: <ImageHeader />,
                    headerTitle: <HeaderLogo />,
                    headerLeft: <MenuLogo navigation={navigation} />,
                    headerRight: (<View></View>)
                }
            }
        })
    },
    Reviews: {
        screen: StackNavigator({
            screen: ReviewsScreen,
        }, {
            navigationOptions: ({ navigation }) => {
                return {
                    headerBackground: <ImageHeader />,
                    headerTitle: <HeaderLogo />,
                    headerLeft: <MenuLogo navigation={navigation} />,
                    headerRight: (<View></View>)
                }
            }
        })
    },
    BusinessRestaurant: {
        screen: StackNavigator({
            screen: BusinessRestaurantScreen,
        }, {
            navigationOptions: ({ navigation }) => {
                return {
                    headerBackground: <ImageHeader />,
                    headerTitle: <HeaderLogo />,
                    headerLeft: <MenuLogo navigation={navigation} />,
                    headerRight: (<View></View>)
                }
            }
        })
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
        screen: props => <BusinessProfileScreen {...props} registration />,
        navigationOptions: {
            ...backHeader
        }
    },
    BusinessUpload: {
        screen: props => <BusinessUploadScreen {...props} registration />,  
        navigationOptions: ({ navigation }) => {
            let hasValue;
            if (navigation && navigation.state && navigation.state.params) {
                hasValue = navigation.state.params.hasValue;
            }
            return {
                headerBackground: <ImageHeader />,
                headerTintColor: 'white',
                headerLeft: (<View></View>),
                headerRight: <SkipButton navigation={navigation} hasValue={hasValue} screen={'SwitchIn'}/>
            }
        }
    }
}, {
    transitionConfig: getSlideFromRightTransition
});

const createRootNavigator = (hasUser = false) => {
    return SwitchNavigator({
        SwitchIn: { screen: ApplicationIn },
        SwitchOut: { screen: ApplicationOut }
    }, { initialRouteName: hasUser ? 'SwitchIn' : 'SwitchOut' });
};

export default createRootNavigator;