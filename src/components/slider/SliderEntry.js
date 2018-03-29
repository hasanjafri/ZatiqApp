import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import StarRating from 'react-native-star-rating';
import { ParallaxImage } from 'react-native-snap-carousel';
import { Rating, Badge, Icon } from 'react-native-elements';
import styles from '../../styles/components/SliderEntry.style';

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
        const { data: { illustration }, parallax, parallaxProps, even } = this.props;

        return parallax ? (
            <ParallaxImage source={{ uri: illustration }}
                containerStyle={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
                style={styles.image}
                parallaxFactor={0.35}
                showSpinner
                spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
                {...parallaxProps} />
        ) : (
            <Image source={{ uri: illustration }}
              style={styles.image} />
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
            <TouchableOpacity activeOpacity={1}
                style={styles.slideInnerContainer}
                onPress={() => { alert(`You've clicked '${title}'`); }} >
                <View style={styles.shadow} />
                <View style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}>
                    { this.image }
                    <View style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]} />
                </View>
                <View style={[styles.contentContainer, even ? styles.contentContainerEven : {}]}>
                    <Text style={[styles.title, even ? styles.titleEven : {}]}
                        numberOfLines={2} >
                        { title.toUpperCase() }
                    </Text>
                    <Text style={[styles.subtitle, even ? styles.subtitleEven : {}]}
                        numberOfLines={2} >
                        { subtitle }
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                        <StarRating disabled
                            maxStars={5}
                            starSize={25}
                            rating={rating}
                            containerStyle={{ paddingVertical: 10, width: 150 }}
                            fullStarColor={'#f1c40f'} />
                        <Text style={[styles.open, { backgroundColor: isOpen ? 'green' : 'red' }]}>
                            { isOpen ? 'OPEN NOW' : 'CLOSED' }
                        </Text>
                    </View>
                    <Text style={[styles.title, even ? styles.titleEven : {}, { fontSize: 16 }]}
                        numberOfLines={2} >
                        { restaurantName.toUpperCase() }
                    </Text>
                    <View style={styles.buttonBar}>
                        <TouchableOpacity style={styles.buttonCall} onPress={this.onPress}>
                            <Icon containerStyle={{ paddingLeft: 20, justifyContent: 'center' }} name={'call'} color={'white'} />
                            <Text style={styles.buttonText}>Call To Order</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonView} onPress={() => this.props.navigateTo('Feeling')}>
                            <Icon containerStyle={{ paddingLeft: 20, justifyContent: 'center' }} name={'import-contacts'} color={'white'} />
                            <Text style={styles.buttonText}>View Restaurant</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
    render () {
        const entry = this.props.type === 'Suggestion' ? this._renderSuggestionEntry() : null
        return entry;
    }
}