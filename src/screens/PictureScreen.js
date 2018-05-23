import React from 'react';
import { ImageBackground } from 'react-native';
import styles from '../styles/screens/PictureScreen.style';
import Slider from '../components/slider/Slider';
import TagsOverlay from '../components/TagsOverlay';

class PictureScreen extends React.Component {
    constructor(props) {
        super(props);
        const params = props.navigation.state.params;
        this.state = {
            data: params.data,
            type: params.type,
            currentData: null,
            showTagsOverlay: false
        }
        this.navigateTo = this.navigateTo.bind(this);
    }
    navigateTo(route) {
        this.props.navigation.navigate(route);
    }
    render () {
        const { type } = this.state;
        return (
            <React.Fragment>
                <ImageBackground style={styles.view} source={require('../assets/backgrounds/background.png')}>
                    { type === 'Food' || type === 'Suggestion' ?
                        <Slider noPaginate
                            showTagsOverlay={data => this.setState({ showTagsOverlay: true, currentData: data })}
                            type={type}
                            navigateTo={this.navigateTo}
                            data={this.state.data} /> :
                        <Slider noPaginate type={'Picture'} navigateTo={this.navigateTo} data={this.state.data} />
                    }
                </ImageBackground>
                <TagsOverlay showOverlay={this.state.showTagsOverlay}
                    data={this.state.currentData}
                    onClose={() => this.setState({ showTagsOverlay: false })} />
            </React.Fragment>
        );
    }
};

export default PictureScreen;