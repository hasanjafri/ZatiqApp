import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Linking, Dimensions } from 'react-native';
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
const { height: viewportHeight } = Dimensions.get('window');

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
        const { data: {  image: { base64, image_aspect_ratio } }, parallaxProps, even, type } = this.props;
        if (!base64) {
            return <Image style={styles.imagePlaceholder} />
        }
        const displayImage = base64;
        const isFull = type === 'FullPicture';
        return (
            isFull ?
                <Image source={{ uri: displayImage }} style={{
                    width: '100%',
                    height: (40 * viewportHeight) / 100,
                    resizeMode: 'cover' }} /> :
                <ParallaxImage source={{ uri: displayImage }}
                    containerStyle={styles.imageContainer}
                    style={styles.image}
                    parallaxFactor={0.05}
                    showSpinner
                    spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
                    {...parallaxProps} />
        );
    }
    onCall(number) {
        Linking.openURL(`tel:+1${phoneFormatter.normalize(number)}`);
    }
    isOpen(hours) {
        const now = moment();
        const currentDay = momentDays[now.day()];
        const startHour = hours.start[currentDay];
        const endHour = hours.end[currentDay];
        if (startHour === 'closed' || endHour === 'closed') {
            return false;
        } else {
            const startDate = moment(startHour, 'HH:mm');
            const endDate = moment(endHour, 'HH:mm');
            return now.isBetween(startDate, endDate);
        }
    }
    getTags(tags) {
        const tagList = [];
        Object.keys(tags).forEach((key) => {
            if (tags[key]) {
                const formattedKey = key.replace('_', ' ');
                tagList.push(capitalizeWords(formattedKey));
            }
        });
        const minimizedView = tagList.length <= 4;
        const filteredTag = minimizedView ? tagList : tagList.slice(0, 4);
        const tagsDisplay = filteredTag.map((tag, i) => <Text style={[textStyles.miniItalic, styles.tag]} key={i}>{tag}</Text>);
        if (!minimizedView) {
            tagsDisplay.push(
                <Text style={[textStyles.miniItalic, styles.tag]} key={-1}>...</Text>
            );
        }
        return (
            minimizedView ? 
            <View style={styles.tagContainer}>{tagsDisplay}</View>:
            <TouchableOpacity style={styles.tagContainer} activeOpacity={1} onPress={() => this.props.showTagsOverlay(this.props.data)}>
                {tagsDisplay}
            </TouchableOpacity>
        );
    }
    _renderSuggestionEntry(type) {
        const { data: {
            food_item_id,
            item_name,
            item_price,
            calories,
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
                            <View style={styles.rightPart}>
                                <Text style={[textStyles.subtitle, { color: colors.gray, textAlign: 'center' }]} >${ item_price }</Text>
                            </View>
                        </View>

                        { calories ?    
                            <View style={{ flexDirection: 'row' }}>
                                <View style={styles.leftPart}>
                                    <Text style={textStyles.subtitle} numberOfLines={3} >{ overview }</Text>
                                </View>
                                <View style={styles.rightPart}>
                                    <Text style={[textStyles.subtitle, { color: colors.gray, textAlign: 'center' }]} >{ calories } Calories</Text>
                                </View>
                            </View> :
                            <Text style={textStyles.subtitle} numberOfLines={3} >{ overview }</Text>
                        }                        
                        {this.getTags(tags)}
                        {
                            type === 'Suggestion' ?
                                <React.Fragment>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <View style={[styles.leftPart, { paddingVertical: 10 }]}>
                                            <Text style={[textStyles.title,  { fontSize: 16 }]} numberOfLines={2} >{ name }</Text>
                                        </View>
                                        <Text style={[styles.rightPart, styles.open, { backgroundColor: isOpen ? 'green' : 'red', fontFamily: 'nunito-italic' }]}>
                                            { isOpen ? 'Open now' : 'Closed' }
                                        </Text>
                                    </View>
                                    <View style={styles.buttonBar}>
                                        <TouchableOpacity activeOpacity={0.7} style={styles.buttonCall} onPress={() => this.onCall(number)}>
                                            <Text style={[textStyles.smallBold, styles.buttonText]}>CONTACT</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity activeOpacity={0.7} style={styles.buttonView} onPress={() => {
                                            if (this.props.data.hasNavigate) {
                                                return this.props.data.navigateTo('Restaurant', this.props.data);
                                            }
                                            return this.props.navigateTo('Restaurant', this.props.data);
                                        }}>
                                            <Text style={[textStyles.smallBold, styles.buttonText]}>RESTAURANT</Text>
                                        </TouchableOpacity>
                                    </View>
                                </React.Fragment> : null
                        }
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
        const { type } = this.props;
        if (type === 'Suggestion' || type === 'Food') {
            return this._renderSuggestionEntry(type);
        } else if (type === 'Picture' || type === 'FullPicture') {
            return this._renderImageEntry();
        }
    }
}