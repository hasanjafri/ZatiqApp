import React from 'react';
import { Icon } from 'react-native-elements';
import { NavigationActions  } from 'react-navigation';
import { TouchableHighlight, Image, StyleSheet, Text } from 'react-native';

const ImageHeader = () => <Image resizeMode={'contain'} source={require('../../assets/backgrounds/header.png')} />;
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

const SkipButton = props => (
    <TouchableHighlight underlayColor={'transparent'} style={{ paddingRight: 20 }} onPress={() => props.navigation.navigate(props.screen)}>
        <Text style={{fontSize: 16, color: 'white', fontFamily: 'nunito', fontWeight: 'bold' }}>Skip</Text>
    </TouchableHighlight>
);

export { ImageHeader, HeaderLogo, MenuLogo, SkipButton, SettingsButton };