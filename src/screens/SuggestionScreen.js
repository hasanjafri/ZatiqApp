import React from 'react';
import { Text, View, ImageBackground, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

const horizontalMargin = 20;
const slideWidth = 280;

const sliderWidth = 100;
const itemWidth = slideWidth + horizontalMargin * 2;
const itemHeight = 200;

const styles = StyleSheet.create({
    slide: {
        width: itemWidth,
        height: itemHeight,
        paddingHorizontal: horizontalMargin
    },
    slideInnerContainer: {
        width: slideWidth,
        flex: 1
    }
});

class SuggestionScreen extends React.Component {
    _renderItem ({item, index}) {
        return (
            <View style={styles.slide}>
                <View style={styles.slideInnerContainer} />
            </View>
        );
    }

    render () {
        return (
            <Carousel data={[]}
                renderItem={this._renderItem}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
            />
        );
    }
};

export default SuggestionScreen;