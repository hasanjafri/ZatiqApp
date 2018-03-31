import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import StarRating from 'react-native-star-rating';
import { ParallaxImage } from 'react-native-snap-carousel';
import { Badge, Icon } from 'react-native-elements';
import styles from '../../styles/components/SliderEntry.style';
import textStyles from '../../styles/text.style';

export default class SliderEntry extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    static propTypes = {
        data: PropTypes.object.isRequired,
        even: PropTypes.bool,
        parallax: PropTypes.bool,
        parallaxProps: PropTypes.object
    };

    get image () {
        const { data: { illustration }, parallax, parallaxProps, even, type } = this.props;
        if (!illustration) {
            // return <Image source={require('../../assets/backgrounds/placeholder.png')} style={styles.imagePlaceholder} />
            return <Image style={styles.imagePlaceholder} />
        }
        return parallax ? (
            <ParallaxImage source={{ uri: illustration }}
                containerStyle={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
                style={styles.image}
                parallaxFactor={0.35}
                showSpinner
                spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
                {...parallaxProps} />
        ) : (
            <Image source={{ uri: illustration }} style={styles.image} />
        );
    }
    
    _renderSuggestionEntry() {
        const { data: {
            title,
            subtitle,
            rating,
            restaurantName,
            isOpen
        }, even } = this.props;
        return (
            <View style={styles.slideInnerContainer}>
                <View style={styles.shadow} />
                <View style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}>
                    { this.image }
                    <View style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]} />
                </View>
                <View style={[styles.contentContainer, even ? styles.contentContainerEven : {}]}>
                    <Text style={[textStyles.title, { fontSize: 16 }]} numberOfLines={2} >{ title }</Text>
                    <Text style={[textStyles.title, { marginTop: 6 }]} numberOfLines={2} >{ restaurantName }</Text>
                    <Text style={textStyles.subtitle} numberOfLines={2} >{ subtitle }</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <StarRating disabled
                            maxStars={5}
                            starSize={25}
                            rating={rating}
                            containerStyle={{ paddingVertical: 10, width: 150 }}
                            fullStarColor={'#f1c40f'} />
                        <Text style={[styles.open, { backgroundColor: isOpen ? 'green' : 'red' }]}>
                            { isOpen ? 'Open now' : 'Closed' }
                        </Text>
                    </View>
                    <View style={styles.buttonBar}>
                        <TouchableOpacity activeOpacity={0.7} style={styles.buttonCall} onPress={this.onPress}>
                            <Icon containerStyle={{ paddingLeft: 20, justifyContent: 'center' }} name={'call'} color={'white'} />
                            <Text style={[textStyles.small, styles.buttonText]}>Call To Order</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.7} style={styles.buttonView} onPress={() => this.props.navigateTo('Restaurant')}>
                            <Icon containerStyle={{ paddingLeft: 20, justifyContent: 'center' }} name={'import-contacts'} color={'white'} />
                            <Text style={[textStyles.small, styles.buttonText]}>View Restaurant</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
    _renderImageEntry() {
        return (
            <View style={styles.slideInnerContainer}>
                <View style={styles.shadow} />
                <View style={styles.imageContainer}>
                    { this.image }
                    <View style={styles.radiusMask} />
                </View>
            </View>
        );
    }
    render () {
        return this.props.type === 'Suggestion' ? this._renderSuggestionEntry() : this._renderImageEntry()
    }
}