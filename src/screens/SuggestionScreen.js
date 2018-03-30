import React from 'react';
import { ImageBackground } from 'react-native';
import styles from '../styles/screens/SuggestionScreen.style';
import Slider from '../components/slider/Slider';

const ENTRIES1 = [
    {
        title: 'Beautiful and dramatic Antelope Canyon',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
        illustration: 'https://i.imgur.com/UYiroysl.jpg',
        rating: 3,
        restaurantName: 'Silk Roots Fusion Restaurant2',
        isOpen: true
    },
    {
        title: 'Earlier this morning, NYC',
        subtitle: 'Lorem ipsum dolor sit amet',
        illustration: 'https://i.imgur.com/UPrs1EWl.jpg',
        rating: 4,
        restaurantName: 'Silk Roots Fusion Restaurant',
        isOpen: true
    },
    {
        title: 'White Pocket Sunset',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
        illustration: 'https://i.imgur.com/MABUbpDl.jpg',
        rating: 3,
        restaurantName: 'Silk Rootssdfant',
        isOpen: true
    },
    {
        title: 'Acrocorinth, Greece',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
        illustration: 'https://i.imgur.com/KZsmUi2l.jpg',
        rating: 5,
        restaurantName: 'Silksdgnt',
        isOpen: false
    },
    {
        title: 'The lone tree, majestic landscape of New Zealand',
        subtitle: 'Lorem ipsum dolor sit amet',
        illustration: 'https://i.imgur.com/2nCt3Sbl.jpg',
        rating: 1,
        restaurantName: 'Mac Donald',
        isOpen: true
    },
    {
        title: 'Middle Earth, Germany',
        subtitle: 'Lorem ipsum dolor sit amet',
        illustration: 'https://i.imgur.com/lceHsT6l.jpg',
        rating: 2,
        restaurantName: 'Silksdf',
        isOpen: false
    }
];

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
                <Slider type={'Suggestion'} navigateTo={this.navigateTo} data={ENTRIES1} />
            </ImageBackground>
        );
    }
};

export default SuggestionScreen;