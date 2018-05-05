import React from 'react';
import { ImageBackground } from 'react-native';
import styles from '../styles/screens/PictureScreen.style';
import Slider from '../components/slider/Slider';

class PictureScreen extends React.Component {
    constructor(props) {
        super(props);
        const params = props.navigation.state.params;
        this.state = {
            data: params.data,
            type: params.type
        }
        this.navigateTo = this.navigateTo.bind(this);
    }
    navigateTo(route) {
        this.props.navigation.navigate(route);
    }
    render () {
        const { type } = this.state;
        return (
            <ImageBackground style={styles.view} source={require('../assets/backgrounds/background.png')}>
                { type === 'Picture' ?
                    <Slider noPaginate type={'Picture'} navigateTo={this.navigateTo} data={this.state.data} /> :
                    <Slider noPaginate type={'Food'} navigateTo={this.navigateTo} data={this.state.data} />
                }
            </ImageBackground>
        );
    }
};

export default PictureScreen;