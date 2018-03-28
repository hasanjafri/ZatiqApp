import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Button, SocialIcon } from 'react-native-elements';
import { Video } from 'expo';
import  Icon  from 'react-native-vector-icons';
import styles from '../styles/screens/LoginScreen.style';
import { NavigationActions } from 'react-navigation'

// ...

class LoginScreen extends React.Component {
    render() {
        const { navigate, dispatch } = this.props.navigation;
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
                        onPress={() => dispatch(NavigationActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({ routeName: 'Feeling' })
                            ]
                        }))}/>
                    <SocialIcon title="Sign in with Google"
                        button
                        type="google-plus-official"
                        style={styles.signInButtons}
                        onPress={() => navigate('Feeling')}/>
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