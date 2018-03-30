import React, { Component } from 'react';
import { Platform, View, ScrollView, Text, SafeAreaView } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { sliderWidth, itemWidth } from '../../styles/components/SliderEntry.style';
import SliderEntry from './SliderEntry';
import styles from '../../styles/components/Slider.style';
import colors from '../../styles/colors.style';

const INITIAL_ACTIVE_ITEM = 1;

class Slider extends Component {
    constructor (props) {
        super(props);
        this.state = {
            activeItem: INITIAL_ACTIVE_ITEM
        };
        this._renderItemWithParallax = this._renderItemWithParallax.bind(this);
    }
    _renderItemWithParallax ({item, index}, parallaxProps) {
        return (
            <SliderEntry data={item}
                navigateTo={this.props.navigateTo}
                type={this.props.type}
                even={(index + 1) % 2 === 0}
                parallax
                parallaxProps={parallaxProps} />
        );
    }
    _renderCarousel() {
        const { activeItem } = this.state;
        return (
            <View style={styles.mainContainer}>
                <Carousel ref={c => this.slider = c}
                    data={this.props.data}
                    renderItem={this._renderItemWithParallax}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    hasParallaxImages
                    firstItem={INITIAL_ACTIVE_ITEM}
                    inactiveSlideScale={0.94}
                    inactiveSlideOpacity={0.7}
                    containerCustomStyle={styles.slider}
                    contentContainerCustomStyle={styles.sliderContentContainer}
                    onSnapToItem={index => this.setState({ activeItem: index }) } />
                <Pagination dotsLength={this.props.data.length}
                    activeDotIndex={this.state.activeItem}
                    containerStyle={styles.paginationContainer}
                    dotColor={'rgba(255, 255, 255, 0.92)'}
                    dotStyle={styles.paginationDot}
                    inactiveDotColor={colors.black}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                    carouselRef={this.slider}
                    tappableDots={!!this.slider} />
            </View>
        );
    }
    render () {
        return (
            <ScrollView style={styles.scrollview}
                scrollEventThrottle={200}
                directionalLockEnabled >
                { this._renderCarousel() }
            </ScrollView>
        );
    }
}

export default Slider;
