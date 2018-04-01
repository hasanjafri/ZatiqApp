import React from 'react';
import { Icon } from 'react-native-elements';
import { NavigationActions  } from 'react-navigation';
import { TouchableHighlight, Image, StyleSheet } from 'react-native';

const ImageHeader = () => <Image source={require('../../assets/backgrounds/header.png')} />;
const HeaderLogo = () => <Image style={{
    height: '100%',
    width: '100%',
    resizeMode: 'contain'
}} source={require('../../assets/logos/logo.png')}/>

const MenuLogo = props => (
    <TouchableHighlight underlayColor={'transparent'} style={{
        paddingHorizontal: 10
    }} onPress={() => props.navigation.navigate('DrawerOpen')}>
        <Icon name='menu' size={35} color={'white'} />
    </TouchableHighlight>
);

export { ImageHeader, HeaderLogo, MenuLogo };