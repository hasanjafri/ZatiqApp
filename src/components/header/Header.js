import React from 'react';
import { Icon } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import { View, Text, Button, Image, ImageBackground, StyleSheet, TouchableHighlight } from 'react-native';

const Header = props => {
    return (
        <View style={styles.headerContainer}>
            { props.showBack ?
                <TouchableHighlight underlayColor={'transparent'} style={styles.headerBackContainer} onPress={() => props.navigation.dispatch(NavigationActions.back())}>
                    <Icon name='clear' size={35} color={'#FFF'} />
                </TouchableHighlight> : null
            }
            { props.showDrawerOpen ?
                <TouchableHighlight underlayColor={'transparent'} style={styles.headerBackContainer} onPress={() => props.navigation.navigate('DrawerOpen')}>
                    <Icon name='menu' size={35} color={'#FFF'} />
                </TouchableHighlight> : null
            }
            <Image style={styles.headerLogo} source={require('../../assets/logos/logo.png')}/>
        </View>
    );
};

class ImageHeader extends React.Component {
    render() {
        return (
            <View style={{ backgroundColor: '#eee' }}>
                <Image style={StyleSheet.absoluteFill} source={require('../../assets/backgrounds/header.png')} />
                <Header {...this.props} style={styles.header}/>
            </View>
        );
    }
};

const styles = StyleSheet.create({
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

export default ImageHeader;