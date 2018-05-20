import React, { Component } from 'react';
import { Platform, View, ScrollView, Text, SafeAreaView, Dimensions } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { sliderWidth, itemWidth } from '../../styles/components/SliderEntry.style';
import SliderEntry from './SliderEntry';
import styles from '../../styles/components/Slider.style';
import colors from '../../styles/colors.style';

const { height: viewportHeight } = Dimensions.get('window');

class Slider extends Component {
    constructor (props) {
        super(props);
        this.state = {
            activeItem: 0
        };
        this._renderItem = this._renderItem.bind(this);
    }
    _renderItem ({item, index}, parallaxProps) {
        return (
            <SliderEntry data={item}
                showTagsOverlay={this.props.showTagsOverlay}
                navigateTo={this.props.navigateTo}
                type={this.props.type}
                even={(index + 1) % 2 === 0}
                parallax
                parallaxProps={parallaxProps} />
        );
    }
    _renderCarousel() {
        const { activeItem } = this.state;
        const { noPaginate, type } = this.props;
        const isFull = type === 'FullPicture';
        const containerCustomStyle = isFull ? { height: (40 * viewportHeight) / 100 } : styles.slider;
        const contentContainerCustomStyle = isFull ? { marginTop: 20 } : styles.sliderContentContainer;
        return (
            <React.Fragment>
                <Carousel ref={c => this.slider = c}
                    data={this.props.data}
                    renderItem={this._renderItem}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    hasParallaxImages
                    firstItem={this.state.activeItem}
                    inactiveSlideScale={0.94}
                    inactiveSlideOpacity={0.7}
                    containerCustomStyle={containerCustomStyle}
                    contentContainerCustomStyle={contentContainerCustomStyle}
                    onSnapToItem={index => this.setState({ activeItem: index }) } />
                {   noPaginate ? null :
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
                }
            </React.Fragment>
        );
    }
    render () {
        console.log('slider render');
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
