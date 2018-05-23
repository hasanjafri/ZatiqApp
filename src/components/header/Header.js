import React from 'react';
import { connect } from 'react-redux';
import { changeDrawerItem } from '../../redux/actions/drawer.action';

import { Icon } from 'react-native-elements';
import { NavigationActions  } from 'react-navigation';
import { TouchableHighlight, Image, StyleSheet, Text, View } from 'react-native';

const ImageHeader = () => (
    <Image style={{ width: '100%' , height: '100%'}} source={require('../../assets/backgrounds/header.png')} />
);
const HeaderLogo = () => <Image style={{
    height: '100%',
    width: '100%',
    resizeMode: 'contain'
}} source={require('../../assets/logos/logo.png')}/>

const MenuLogo = props => (
    <TouchableHighlight underlayColor={'transparent'} style={{ paddingHorizontal: 10 }} onPress={() => props.navigation.navigate('DrawerOpen')}>
        <Icon name='menu' size={35} color={'white'} />
    </TouchableHighlight>
);

const SettingsButton = props => (
    <TouchableHighlight underlayColor={'transparent'} style={{ paddingHorizontal: 10 }} onPress={() => props.onPress()}>
        <Icon name='settings' size={35} color={'white'} />
    </TouchableHighlight>
);

const SkipButtonComponent = props => (
    <TouchableHighlight underlayColor={'transparent'} style={{ paddingRight: 20 }} onPress={() => {
            props.changeDrawerItem('My Restaurant');
            props.navigation.navigate('BusinessRestaurant');
        }
    }>
        <Text style={{fontSize: 16, color: 'white', fontFamily: 'nunito', fontWeight: 'bold' }}>{props.hasValue ? 'Next' : 'Skip'}</Text>
    </TouchableHighlight>
);
const SkipButton = connect(null, { changeDrawerItem })(SkipButtonComponent);

export { ImageHeader, HeaderLogo, MenuLogo, SkipButton, SettingsButton };