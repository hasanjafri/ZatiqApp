import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import PropTypes from 'prop-types';
import StarRating from 'react-native-star-rating';
import moment from 'moment';
import { ParallaxImage } from 'react-native-snap-carousel';
import { Badge, Icon } from 'react-native-elements';
import phoneFormatter from 'phone-formatter';

import colors from '../../styles/colors.style';
import styles from '../../styles/components/SliderEntry.style';
import textStyles from '../../styles/text.style';

const momentDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

function capitalizeWords(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

export default class SliderEntry extends Component {
    static propTypes = {
        data: PropTypes.object.isRequired,
        even: PropTypes.bool,
        parallax: PropTypes.bool,
        parallaxProps: PropTypes.object,
    };
    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }
    get image () {
        const { data: {  image: { base64, image_aspect_ratio } }, parallax, parallaxProps, even, type } = this.props;
        if (!base64) {
            return <Image style={styles.imagePlaceholder} />
        }
        const displayImage = 'data:image/png;base64,' + base64;
        return parallax ? (
            <ParallaxImage source={{ uri: displayImage }}
                containerStyle={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
                style={styles.image}
                parallaxFactor={0.05}
                showSpinner
                spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
                {...parallaxProps} />
        ) : (
            <Image source={{ uri: displayImage }} style={styles.image} />
        );
    }
    onCall(number) {
        Linking.openURL(`tel:+1${phoneFormatter.normalize(number)}`);
    }
    isOpen(hours) {
        const now = moment();
        const currentDay = momentDays[now.day()];
        const startDate = moment(hours.start[currentDay], 'HH:mm');
        const endDate = moment(hours.end[currentDay], 'HH:mm');
        return now.isBetween(startDate, endDate);
    }
    getTags(tags) {
        const tagList = [];
        Object.keys(tags).forEach((key) => {
            if (tags[key]) {
                const formattedKey = key.replace('_', ' ');
                tagList.push(capitalizeWords(formattedKey));
            }
        });
        const tagsDisplay = tagList.map((tag, i) => <Text style={[textStyles.miniItalic, styles.tag]} key={i}>{tag}</Text>);
        tagsDisplay.push(
            <TouchableOpacity activeOpacity={1} key={-1} onPress={() => this.props.showTagsOverlay(this.props.data)}>
                <Text key={-1} style={[textStyles.miniItalic, styles.tag, { color: 'black', backgroundColor: 'white', fontFamily: 'nunito-bold' }]}>View All</Text>
            </TouchableOpacity>
        )
        return tagsDisplay;
    }
    _renderSuggestionEntry() {
        const { data: {
            food_item_id,
            item_name,
            item_price,
            tags,
            overview,
            restaurant_info: { name, number, hours }
        }, even } = this.props;
        const isOpen = this.isOpen(hours);
        return (
            <React.Fragment>
                <View style={styles.slideInnerContainer}>
                    <View style={styles.shadow} />
                    <View style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}>
                        { this.image }
                        <View style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]} />
                    </View>
                    <View style={[styles.contentContainer, even ? styles.contentContainerEven : {}]}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.leftPart}>
                                <Text style={[textStyles.title, { fontSize: 16 }]} numberOfLines={2} >{ item_name }</Text>
                            </View>
                            <Text style={[textStyles.subitle, { color: colors.gray, textAlign: 'center', right: 0, position: 'absolute' }]} >${ item_price }</Text>
                        </View>
                        <Text style={textStyles.subtitle} numberOfLines={2} >{ overview }</Text>
                        <View style={styles.tagContainer}>{this.getTags(tags)}</View>
                        
                        <View style={{ flexDirection: 'row' }}>
                            <View style={[styles.leftPart, { paddingVertical: 10 }]}>
                                <Text style={[textStyles.title,  { fontSize: 16 }]} numberOfLines={2} >{ name }</Text>
                            </View>
                            <Text style={[styles.open, { backgroundColor: isOpen ? 'green' : 'red', fontFamily: 'nunito-italic' }]}>
                                { isOpen ? 'Open now' : 'Closed' }
                            </Text>
                        </View>
                        <View style={styles.buttonBar}>
                            <TouchableOpacity activeOpacity={0.7} style={styles.buttonCall} onPress={() => this.onCall(number)}>
                                <Icon containerStyle={{ paddingLeft: 20, justifyContent: 'center' }} name={'call'} color={'white'} />
                                <Text style={[textStyles.small, styles.buttonText]}>Call To Order</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.7} style={styles.buttonView} onPress={() => this.props.navigateTo('Restaurant', this.props.data)}>
                                <Icon containerStyle={{ paddingLeft: 20, justifyContent: 'center' }} name={'import-contacts'} color={'white'} />
                                <Text style={[textStyles.small, styles.buttonText]}>View Restaurant</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </React.Fragment>
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