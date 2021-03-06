import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Linking, Dimensions, ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';
import phoneFormatter from 'phone-formatter';

import Loader from '../../components/Loader';

import colors from '../../styles/colors.style';
import styles from '../../styles/components/SliderEntry.style';
import textStyles from '../../styles/text.style';
import { isOpen } from '../../libs/helper';

import BusinessAction from '../../actions/BusinessAction';
const BusinessInstance = BusinessAction.getInstance();

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
        const isRestaurantOpen = isOpen(hours);
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
                                <Text style={[styles.rightPart, styles.open, { backgroundColor: isRestaurantOpen ? 'green' : 'red', fontFamily: 'nunito-italic' }]}>
                                    { isRestaurantOpen ? 'Open now' : 'Closed' }
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
    state = {
        isLoading: false
    };
    openFoodItem = async () => {
        this.setState({ isLoading:  true });
        const result = await BusinessInstance.getFoodItem(this.props.data.food_item_id);
        this.setState({ isLoading:  false }, () => {
            if (result.success) {
                const food_item = result.data[0];
                food_item.hasNavigate = true;
                food_item.navigateTo = this.props.navigateTo;
                this.props.navigateTo('Picture', {
                    type: 'Suggestion',
                    data: [food_item]
                });
            } else {
                alert(result.message);
            }
        });
    }
    render() {
        return (
            <TouchableOpacity activeOpacity={0.5} style={styles.promotionContainer} onPress={this.openFoodItem}>
                <ImageBackground style={styles.promotionBackgroundImage} source={{ uri: this.props.data.image }}>
                    <Text numberOfLines={1} style={styles.promotionPrice}>${this.props.data.item_price}</Text>
                    <View style={styles.promotionBottomContainer}>
                        <Text numberOfLines={1} style={styles.promotionTitle}>{this.props.data.item_name}</Text>
                        <View style={styles.promotionLogoContainer}>
                            <Image style={[styles.promotionLogo, { aspectRatio: Number(this.props.data.restaurant_image_aspect_ratio) }]} resizeMode="cover" source={{ uri: this.props.data.restaurant_image }} />
                        </View>
                    </View>
                    <Loader light show={this.state.isLoading} />
                </ImageBackground>
            </TouchableOpacity>
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