import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Button, SocialIcon } from 'react-native-elements';
import { Video } from 'expo';
import { NavigationActions } from 'react-navigation'
import  Icon  from 'react-native-vector-icons';

// Actions
import { onSignIn } from '../../src/actions/auth';

// Custom imports
import styles from '../styles/screens/LoginScreen.style';

class FindRestaurant extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.view}>
                <Video source={require('../assets/backgrounds/Zatiq.mp4')}
                    rate={1.0}
                    isMuted
                    resizeMode="cover"
                    shouldPlay
                    isLooping
                    style={styles.backgroundVideo}/>
            </View>
        );
    }
};

export default FindRestaurant;