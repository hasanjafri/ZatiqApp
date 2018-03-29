import React, { Component } from 'react';
import { Platform, View, ScrollView, Text, SafeAreaView } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { sliderWidth, itemWidth } from '../../styles/components/SliderEntry.style';
import SliderEntry from './SliderEntry';
import styles, { colors } from '../../styles/components/Slider.style';

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
                type={'Suggestion'}
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
                    data={ENTRIES1}
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
                <Pagination dotsLength={ENTRIES1.length}
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
