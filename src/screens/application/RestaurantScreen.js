import React from 'react';
import { ImageBackground, ScrollView, Image, View, Text, TouchableOpacity, Linking } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import moment from 'moment';
import GridView from 'react-native-super-grid';
import phoneFormatter from 'phone-formatter';

// Custom imports
import styles from '../../styles/screens/application/RestaurantScreen.style';
import textStyles from '../../styles/text.style';
import AddReviewButton from '../../components/addReview/AddReviewButton';
import AddReviewOverlay from '../../components/addReview/AddReviewOverlay';
import TagsOverlay from '../../components/TagsOverlay';
import Loader from '../../components/Loader';

import { restaurantPicturesByRestaurantId, menuPicturesByRestaurantId } from '../../actions/UserAction';

import appState from '../../appState';
const state = appState.getInstance();

const TAGS = [
    { text: 'Features', source: require('../../assets/icons/Breakfast.png') },
    { text: 'Menu', source: require('../../assets/icons/Brunch.png') },
    { text: 'Photos', source: require('../../assets/icons/Lunch.png') }
];

const momentDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
const displayDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

class RestaurantScreen extends React.Component {
    constructor(props) {
        super(props);
        const user = state.getUser();
        
        this.isBusiness = user && user.type === 'business';
        this.state = {
            showOverlay: false,
            showTagsOverlay: false,
            data: props.navigation.state.params
        };
        this.ITEMS = [
            { text: 'Features', type: 'features', source: require('../../assets/icons/Breakfast.png') },
            { text: 'Menu', type: 'menu', source: require('../../assets/icons/Lunch.png') },
            { text: 'Restaurant', type: 'restaurant', source: require('../../assets/icons/Brunch.png') }
        ];
    }
    isOpen(hours) {
        const now = moment();
        const currentDay = momentDays[now.day()];
        const startDate = moment(hours.start[currentDay], 'HH:mm');
        const endDate = moment(hours.end[currentDay], 'HH:mm');
        return now.isBetween(startDate, endDate);
    }
    renderHours(hours) {
        return (
            displayDays.map(day => {
                const currentDay = day.toLowerCase();
                const startDate = moment(hours.start[currentDay], 'HH:mm').format('h:mm A');
                const endDate = moment(hours.end[currentDay], 'HH:mm').format('h:mm A');
                return (
                    <Text key={day}
                        style={[textStyles.small, {lineHeight: 25}]}>
                        {startDate} - {endDate}
                    </Text>
                );
            })
        );
    }
    onCall = (number) => {
        Linking.openURL(`tel:+1${phoneFormatter.normalize(number)}`);
    }
    getTags(tags) {
        const tagList = [];
        Object.keys(tags).forEach((key) => {
            if (tags[key]) {
                tagList.push(categoryMap[key]);
            }
        });
        return tagList;
    }
    openTagsOverlay = type => {
        this.setState({ showTagsOverlay: true });
    }
    _renderMenuItem = item => {
        return (
            <TouchableOpacity onPress={() => this.onGridPress(item.type)}>
                <View style={styles.item}>
                    <Image style={{ height: 50, width: 50 }} source={item.source}></Image>
                    <Text style={{ color: 'white' }}>{item.text}</Text>
                </View>
            </TouchableOpacity>
        );
    }
    _renderSection = title => {
        return (
            <Text style={[textStyles.mediumBold, styles.sectionTitle]}>{title}</Text>
        );
    }
    render () {
        const { data: {
            restaurant_id,
            restaurant_info: { name, number, hours, address, image }
        }} = this.state;
        const isOpen = this.isOpen(hours);
        const businessImage = 'data:image/png;base64,' + image.base64;
        return (
            <ImageBackground style={styles.view} source={require('../../assets/backgrounds/background.png')}>
                <ScrollView style={styles.scrollViewContainer}>
                    {/* Restaurant Image */}
                    <View style={styles.imageContainer}>
                        <Image style={styles.restaurantImage} resizeMode={'cover'} source={{ uri: businessImage }} />
                    </View>
                    <View style={styles.centered}>
                        {/* Title & Address */}
                        <Text style={[textStyles.largeBold, { paddingTop: 10 }]}>{name}</Text>
                        <Text style={[textStyles.small, { fontFamily: 'nunito-italic'}]}>{address}</Text>
                        {/* Rating, Features, Menu, Photos & Call to Order */}
                        <GridView itemDimension={80}
                            items={this.ITEMS}
                            renderItem={(item) =>
                                <GridItem item={item}
                                    openTagsOverlay={this.openTagsOverlay}
                                    restaurant_id={restaurant_id}
                                    navigateTo={(route, data) => this.props.navigation.navigate(route, data)}/>
                            }
                            style={{paddingTop: 10, flex: 1}}/>
                        <TouchableOpacity activeOpacity={0.7} style={styles.buttonCall} onPress={() => this.onCall(number)}>
                            <Icon containerStyle={{ paddingLeft: 20, justifyContent: 'center' }} name={'call'} color={'white'} />
                            <Text style={[textStyles.small, styles.buttonText]}>Call To Order</Text>
                        </TouchableOpacity>
                        {/* Hours */}
                        { this._renderSection('Hours') }
                        <View style={[styles.widthsContainer, { marginBottom: !this.props.self && !this.isBusiness ? 0 : 30 }]}>
                            <View style={{ width: '50%', paddingRight: 5 }}>
                                <Text style={[textStyles.small, {lineHeight: 25}]}>Current</Text>
                                {displayDays.map(day => <Text key={day} style={[textStyles.small, {lineHeight: 25}]}>{day}</Text>)}
                            </View>
                            <View style={{ width: '50%', paddingLeft: 5 }}>
                                <View style={styles.centered}>
                                    <Text style={[styles.open, { backgroundColor: isOpen ? 'green' : 'red', fontFamily: 'nunito-italic' }]}>
                                        { isOpen ? 'Open now' : 'Closed' }
                                    </Text>
                                </View>
                                {this.renderHours(hours)}
                            </View>
                        </View>
                        {/* Leave a Review */}
                        { !this.props.self && !this.isBusiness ?
                            <React.Fragment>
                                { this._renderSection('Leave a Review') }
                                <AddReviewButton onPress={() => this.setState({ showOverlay: true })} />
                            </React.Fragment>
                            : null
                        }
                    </View>
                </ScrollView>
                <AddReviewOverlay showOverlay={this.state.showOverlay}
                    restaurant_id={restaurant_id}
                    onClose={() => this.setState({ showOverlay: false })}/>
                <TagsOverlay showOverlay={this.state.showTagsOverlay}
                    feature
                    data={this.state.data.restaurant_info}
                    onClose={() => this.setState({ showTagsOverlay: false })} />
            </ImageBackground>
        );
    }
};

class GridItem extends React.Component {
    state = {
        isLoading: false
    }
    onGridPress = async type => {
        if (type === 'features') {
            this.props.openTagsOverlay();
        } else {
            this.setState({ isLoading: true });
            let result;
            if (type === 'menu') {
                result = await menuPicturesByRestaurantId(this.props.restaurant_id);
            } else {
                result = await restaurantPicturesByRestaurantId(this.props.restaurant_id);
            }
            this.setState({ isLoading: false });
            if (result.success) {
                this.props.navigateTo('Picture', result.data.response);
            } else {
                alert(result.message);
            }
        }
    }
    render() {
        const { item } = this.props;
        return (
            <TouchableOpacity onPress={() => this.onGridPress(item.type)}>
                <View style={styles.item}>
                    <Image style={{ height: 50, width: 50 }} source={item.source}></Image>
                    <Text style={{ color: 'white', fontSize: 12, fontFamily: 'nunito' }}>{item.text}</Text>
                </View>
                <Loader light show={this.state.isLoading} />
            </TouchableOpacity>
        );
    }
}

export default RestaurantScreen;