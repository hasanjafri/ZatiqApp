import React from 'react';
import { ImageBackground } from 'react-native';
import styles from '../../styles/screens/application/SuggestionScreen.style';
import Slider from '../../components/slider/Slider';
import TagsOverlay from '../../components/TagsOverlay';

class SuggestionScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.navigation.state.params.data.food_items,
            showTagsOverlay: false,
            currentData: null
        }
        this.navigateTo = this.navigateTo.bind(this);
    }
    navigateTo(route, item) {
        this.props.navigation.navigate(route, item);
    }
    render () {
        return (
            <ImageBackground style={styles.view} source={require('../../assets/backgrounds/background.png')}>
                <Slider type={'Suggestion'} navigateTo={this.navigateTo} data={this.state.data} showTagsOverlay={data => this.setState({ showTagsOverlay: true, currentData: data })}/>
                <TagsOverlay showOverlay={this.state.showTagsOverlay}
                    data={this.state.currentData}
                    onClose={() => this.setState({ showTagsOverlay: false })} />
            </ImageBackground>
        );
    }
};

export default SuggestionScreen;