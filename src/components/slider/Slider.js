import React, { Component } from 'react';
import { Platform, View, ScrollView, Text, SafeAreaView, Dimensions } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { sliderWidth, itemWidth } from '../../styles/components/SliderEntry.style';
import SliderEntry from './SliderEntry';
import styles from '../../styles/components/Slider.style';
import colors from '../../styles/colors.style';

const { height: viewportHeight } = Dimensions.get('window');

class CarouselContainer extends Component {
    shouldComponentUpdate(nextProps) {
        return this.props.activeItem === nextProps.activeItem;
    }
    _renderItem = ({item, index}) => {
        return (
            <SliderEntry data={item}
                showTagsOverlay={this.props.showTagsOverlay}
                navigateTo={this.props.navigateTo}
                type={this.props.type} />
        );
    }
    render() {
        return (
            <Carousel ref={c => this.slider = c}
                data={this.props.data}
                renderItem={this._renderItem}
                sliderWidth={this.props.sliderWidth ? this.props.sliderWidth : sliderWidth}
                itemWidth={this.props.itemWidth ? this.props.itemWidth : itemWidth}
                inactiveSlideScale={0.9}
                inactiveSlideOpacity={1}
                containerCustomStyle={this.props.containerStyle ? this.props.containerStyle : styles.slider}
                contentContainerCustomStyle={styles.sliderContentContainer}
                onSnapToItem={this.props.updateActiveItem} />
        );
    }
}

class Slider extends Component {
    constructor (props) {
        super(props);
        this.state = {
            activeItem: 0
        };
    }
    updateActiveItem = index => {
        this.setState({ activeItem: index });
    }
    render () {
        const { activeItem } = this.state;
        const { noPaginate, type } = this.props;
        return (
            <ScrollView style={styles.scrollview} scrollEventThrottle={100} directionalLockEnabled >
                <React.Fragment>
                    <CarouselContainer {...this.props} activeItem={activeItem} updateActiveItem={this.updateActiveItem} />
                    {  !noPaginate ?
                        <Pagination dotsLength={this.props.data.length}
                            activeDotIndex={activeItem}
                            containerStyle={styles.paginationContainer}
                            dotColor={'rgba(255, 255, 255, 0.92)'}
                            dotStyle={styles.paginationDot}
                            inactiveDotColor={colors.black}
                            inactiveDotOpacity={0.4}
                            inactiveDotScale={0.6}
                            carouselRef={this.slider}
                            tappableDots={!!this.slider} /> : null
                    }
                </React.Fragment>
            </ScrollView>
        );
    }
}

export default Slider;
