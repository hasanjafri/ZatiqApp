import React from 'react';
import { ImageBackground } from 'react-native';
import styles from '../styles/screens/PictureScreen.style';
import Slider from '../components/slider/Slider';

const ENTRIES1 = [
    {
        illustration: 'https://i.imgur.com/UYiroysl.jpg',
    },
    {
        illustration: 'https://i.imgur.com/UPrs1EWl.jpg',
    },
    {
        illustration: 'https://i.imgur.com/MABUbpDl.jpg',
    },
    {
        illustration: 'https://i.imgur.com/KZsmUi2l.jpg',
    },
    {
        illustration: 'https://i.imgur.com/2nCt3Sbl.jpg',
    },
    {
        illustration: 'https://i.imgur.com/lceHsT6l.jpg',
    }
];

class PictureScreen extends React.Component {
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
                <Slider type={'Picture'} navigateTo={this.navigateTo} data={ENTRIES1} />
            </ImageBackground>
        );
    }
};

export default PictureScreen;