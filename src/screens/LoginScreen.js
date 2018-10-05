import React from 'react';
import { View, Text, Image, TouchableHighlight, Linking } from 'react-native';
import { SocialIcon } from 'react-native-elements';
import { Video } from 'expo';

// Actions
import { onSignIn, onSignInAsGuest } from '../../src/actions/UserAction';

// Custom imports
import styles from '../styles/screens/LoginScreen.style';

class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
    }
    openTermsAndConditions() {
        Linking.openURL('http://zatiq.com/wp-content/uploads/2018/04/TERMS-AND-CONDITIONS.pdf');
    }
    onSignIn = async (type) => {
        const result = await onSignIn(type);
        if (result.success) {
            const { navigate } = this.props.navigation;
            navigate('SwitchIn');
        } else {
            if (result.message) {
                alert(result.message);
            }
        }
    }
    onSignInAsGuest = async () => {
        await onSignInAsGuest(); 
        this.props.navigation.navigate('SwitchIn');
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
                    <TouchableHighlight underlayColor="transparent" onPress={() => this.onSignInAsGuest()}>
                        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', marginTop: 10, marginBottom: 30, fontSize: 16 }}>Login As Guest</Text>
                    </TouchableHighlight>
                    <SocialIcon title="Are you a business? Click Here"
                        button
                        light
                        style={styles.signInButtons}
                        onPress={() => navigate('BusinessLogin')}/>
                    <TouchableHighlight underlayColor="transparent" onPress={() => this.openTermsAndConditions()}>
                        <Text style={{ color: 'white', marginTop: 10, fontWeight: 'bold', textAlign: 'center' }} >Terms and Conditions</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
};

export default LoginScreen;