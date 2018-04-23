import React from 'react';
import { ImageBackground } from 'react-native';
import styles from '../styles/screens/PictureScreen.style';
import Slider from '../components/slider/Slider';

class PictureScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.navigation.state.params
        }
        this.navigateTo = this.navigateTo.bind(this);
    }
    navigateTo(route) {
        this.props.navigation.navigate(route);
    }
    render () {
        return (
            <ImageBackground style={styles.view} source={require('../assets/backgrounds/background.png')}>
                <Slider type={'Picture'} navigateTo={this.navigateTo} data={this.state.data} />
            </ImageBackground>
        );
    }
};

export default PictureScreen;