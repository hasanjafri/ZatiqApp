import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Linking, Dimensions, ImageBackground } from 'react-native';
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

const ImageGetter = props => {
    const { image: { base64, image_aspect_ratio }, isFull } = props;
    return (
        base64 ?
            <Image source={{ uri: base64 }}
                style={[isFull ? styles.fullImage : styles.image, { aspectRatio: Number(image_aspect_ratio) }]}
                resizeMode="cover" /> :
            <Image style={styles.imagePlaceholder} />
    );
}

class SuggestionEntry extends Component {
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
                <View style={styles.tagContainer}>{tagsDisplay}</View> :
                <TouchableOpacity style={styles.tagContainer} activeOpacity={1} onPress={() => this.props.showTagsOverlay(this.props.data)}>
                    {tagsDisplay}
                </TouchableOpacity>
        );
    }
    render() {
        const { data, type } = this.props;
        const {
            food_item_id,
            item_name,
            item_price,
            calories,
            tags,
            overview,
            restaurant_info: { name, number, hours },
            image
        } = data;
        const isOpen = this.isOpen(hours);
        return (
            <View style={styles.slideInnerContainer}>
                <View style={styles.imageContainer}>
                    <ImageGetter image={image} />
                </View>
                <View style={styles.contentContainer}>
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
                        <Text style={textStyles.subtitle} numberOfLines={3} >{overview}</Text>
                    }                        
                    { this.getTags(tags) }
                    { type === 'Suggestion' ?
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
                                    if (data.hasNavigate) {
                                        return data.navigateTo('Restaurant', data);
                                    }
                                    return this.props.navigateTo('Restaurant', data);
                                }}>
                                    <Text style={[textStyles.smallBold, styles.buttonText]}>RESTAURANT</Text>
                                </TouchableOpacity>
                            </View>
                        </React.Fragment> : null
                    }
                </View>
            </View>
        );
    }
}

class PromotionEntry extends Component {
    render() {
        return (
            <View style={styles.promotionContainer}>
                <ImageBackground style={styles.promotionBackgroundImage} source={require('../../assets/backgrounds/top-picks.png')}>
                    <Text numberOfLines={1} style={styles.promotionPrice}>$100.99</Text>
                    <View style={styles.promotionBottomContainer}>
                        <Text numberOfLines={1} style={styles.promotionTitle}>Zatiq Burger</Text>
                        <View style={styles.promotionLogoContainer}>
                            <Image style={styles.promotionLogo} resizeMode="cover" source={require('../../assets/backgrounds/top-picks.png')} />
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

class SliderEntry extends Component {
    static propTypes = {
        data: PropTypes.object.isRequired
    };
    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }
    render() {
        const { type } = this.props;
        if (type === 'Suggestion' || type === 'Food') {
            return (
                <SuggestionEntry {...this.props} />
            );
        }  else if (type === 'Promotion') {
            return (
                <PromotionEntry {...this.props} />
            );
        } else if (type === 'Picture') {
            return (
                <View style={styles.pictureContainer}>
                    <ImageGetter image={this.props.data.image} />
                </View>
            );
        } else if (type === 'FullPicture') {
            return (
                <View style={styles.fullImageContainer}>
                    <ImageGetter image={this.props.data.image} isFull/>
                </View>
            );
        }
    }
}

export default SliderEntry;