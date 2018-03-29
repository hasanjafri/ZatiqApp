import React from 'react';
import { ImageBackground } from 'react-native';
import styles from '../styles/screens/SuggestionScreen.style';
import Slider from '../components/slider/Slider';

class SuggestionScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.navigateTo = this.navigateTo.bind(this);
    }
    navigateTo(route) {
        this.props.navigation.navigate(route);
    }
    render () {
        return (
            <ImageBackground style={styles.view} source={require('../assets/backgrounds/background.png')}>
                <Slider navigateTo={this.navigateTo} />
            </ImageBackground>
        );
    }
};

export default SuggestionScreen;