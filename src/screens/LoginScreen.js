import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Button, SocialIcon } from 'react-native-elements';
import { Video, Permissions } from 'expo';
import { NavigationActions } from 'react-navigation'
import  Icon  from 'react-native-vector-icons';

// Actions
import { onSignIn } from '../../src/actions/UserAction';

// Custom imports
import styles from '../styles/screens/LoginScreen.style';

import appState from '../appState';
class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
    }
    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status === 'granted') {
            const state = appState.getInstance();
            await state.setAllowedCamera();
        } else {
            throw new Error('Camera permission not granted');
        }
    }
    onSignIn = async (type) => {
        const result = await onSignIn(type);
        if (result.success) {
            const { navigate } = this.props.navigation;
            navigate('SwitchIn');
        } else {
            alert(result.message);
        }
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.view}>
                <Video source={require('../assets/backgrounds/Zatiq.mp4')}
                    rate={1.0}
                    isMuted
                    resizeMode="cover"
                    shouldPlay
                    isLooping
                    style={styles.backgroundVideo}/>
                <View style={styles.mainContainer}>
                    <Image source={require('../assets/logos/logo-transparent.gif')}
                        style={styles.logo}/>
                    <SocialIcon title="Sign in with Facebook"
                        button
                        type="facebook"
                        style={styles.signInButtons}
                        onPress={() => this.onSignIn('facebook')}/>
                    <SocialIcon title="Sign in with Google"
                        button
                        type="google-plus-official"
                        style={styles.signInButtons}
                        onPress={() => this.onSignIn('google')}/>
                    <SocialIcon title="Are you a business? Click Here"
                        button
                        light
                        style={styles.signInButtons}
                        onPress={() => navigate('BusinessLogin')}/>
                </View>
            </View>
        );
    }
};

export default LoginScreen;