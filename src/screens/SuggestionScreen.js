import React from 'react';
import { Text, View, ImageBackground, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import styles from '../styles/screens/SuggestionScreen.style';
import Slider from '../components/slider/Slider';

class SuggestionScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render () {
        return (
            <ImageBackground style={styles.view} source={require('../assets/backgrounds/background.png')}>
                <Slider />
            </ImageBackground>
        );
    }
};

export default SuggestionScreen;