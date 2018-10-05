import React from 'react';
import { connect } from 'react-redux';
import { ImageBackground, ScrollView, Image, View, Text, TouchableOpacity, Linking } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import moment from 'moment';
import GridView from 'react-native-super-grid';
import phoneFormatter from 'phone-formatter';
import Slider from '../../components/slider/Slider';

import {showSignInOverlay} from '../../redux/actions/general.action';

// Custom imports
import styles from '../../styles/screens/application/RestaurantScreen.style';
import textStyles from '../../styles/text.style';
import AddReviewButton from '../../components/addReview/AddReviewButton';
import AddReviewOverlay from '../../components/addReview/AddReviewOverlay';
import TagsOverlay from '../../components/TagsOverlay';
import Loader from '../../components/Loader';
import { isOpen } from '../../libs/helper';

import { foodItemsByRestaurantId } from '../../actions/UserAction';

import { restaurantPicturesByRestaurantId, menuPicturesByRestaurantId } from '../../actions/UserAction';

import appState from '../../appState';
import SignInOverlay from '../../components/SignInOverlay';
const state = appState.getInstance();

const displayDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

class RestaurantScreen extends React.Component {
    constructor(props) {
        super(props);
        const user = state.getUser();
        
        this.isBusiness = user && user.type === 'business';
        const data = props.navigation.state.params;
        this.state = {
            showOverlay: false,
            showTagsOverlay: false,
            data,
            restaurantPictures: data ? [{image: data.restaurant_info.image}] : [] 
        };
        this.ITEMS = [
            { text: 'Features', type: 'Features', source: require('../../assets/backgrounds/Features-min.png') },
            { text: 'Menu', type: 'Menu', source: require('../../assets/backgrounds/menu-min.png') },
            { text: 'Food', type: 'Food', source: require('../../assets/backgrounds/Pictures-min.png') }
        ];
    }
    async componentDidMount() {
        const { data: { restaurant_id }} = this.state;
        let result;
        try {
            result = await restaurantPicturesByRestaurantId(restaurant_id);
        } catch(err) {
            console.log(err);
        }
        if (result.success) {
            this.setState({ restaurantPictures: this.state.restaurantPictures.concat(result.data.response)})
        } else {
            alert(result.message);
        }
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
    onAddReview = () => {
        const user = state.getUser();
        if (!user.data) {
            this.props.showSignInOverlay(() => this.setState({ showOverlay: true }));
        } else {
            this.setState({ showOverlay: true });
        }
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
    _renderDayHour({day, hours}) {
        const currentDay = day.toLowerCase();
        const startHour = hours.start[currentDay];
        const endHour = hours.end[currentDay];
        if (startHour === 'closed' || endHour === 'closed') {
            return (
                <View style={[styles.centered, { flex: 1, flexDirection:'row', paddingHorizontal: 10 }]}>
                    <Text style={[styles.open, { backgroundColor: 'red', fontFamily: 'nunito-italic', flexWrap: 'wrap' }]}>
                        Closed
                    </Text>
                </View>
            );
        } else {
            const startDate = moment(startHour, 'HH:mm').format('h:mm A');
            const endDate = moment(endHour, 'HH:mm').format('h:mm A');
            return (
                <View style={[styles.centered, { flex: 1, flexDirection:'row', paddingHorizontal: 10 }]}>
                    <Text style={[textStyles.small, { lineHeight: 25, flexWrap: 'wrap' }]}>
                        {startDate} - {endDate}
                    </Text>
                </View>
            );
        }
    }
    render () {
        const { data: {
            restaurant_id,
            restaurant_info: { name, number, hours, address }
        }} = this.state;
        const isRestaurantOpen = isOpen(hours);
        return (
            <ImageBackground style={styles.view} source={require('../../assets/backgrounds/background.png')}>
                <ScrollView style={styles.scrollViewContainer}>
                    {/* Restaurant Image */}
                    <Slider data={this.state.restaurantPictures} noPaginate type="FullPicture" />

                    <View style={styles.centered}>
                        {/* Title & Address */}
                        <View style={{flexDirection:'row', paddingHorizontal: 10}}>
                            <Text style={[textStyles.largeBold, { paddingTop: 10, flexWrap: 'wrap' }]}>{name}</Text>
                        </View>
                        
                        <View style={{flexDirection:'row', paddingHorizontal: 10}}>
                            <Text style={[textStyles.small, { fontFamily: 'nunito-italic', flexWrap: 'wrap'}]}>{address}</Text>
                        </View>
                        
                        {/* Features, Menu, Photos & Contact Restaurant */}
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
                            <Text style={[textStyles.small, styles.buttonText]}>Contact Restaurant</Text>
                        </TouchableOpacity>
                        {/* Hours */}
                        { this._renderSection('Hours') }
                        <View style={{ marginBottom: !this.props.self && !this.isBusiness ? 0 : 30 }}>
                            <View style={styles.widthsContainer}>
                                <View style={{ width: '35%' }}>
                                    <Text style={[textStyles.small, {lineHeight: 25}]}>Current</Text>
                                </View>
                                <View style={[styles.centered, { flex: 1, flexDirection:'row', paddingHorizontal: 10 }]}>
                                    <Text style={[styles.open, { backgroundColor: isRestaurantOpen ? 'green' : 'red', fontFamily: 'nunito-italic', flexWrap: 'wrap' }]}>
                                        { isRestaurantOpen ? 'Open now' : 'Closed' }
                                    </Text>
                                </View>
                            </View>
                            { displayDays.map((day, i) =>
                                <View key={i} style={styles.widthsContainer}>
                                    <View style={{ width: '35%' }}>
                                        <Text style={[textStyles.small, {lineHeight: 25}]}>{day}</Text>
                                    </View>
                                    {this._renderDayHour({day, hours})}
                                </View>
                            )}
                        </View>
                        
                        {/* Leave a Review */}
                        { !this.props.self && !this.isBusiness ?
                            <React.Fragment>
                                { this._renderSection('Leave a Review') }
                                <AddReviewButton onPress={() => this.onAddReview()} />
                            </React.Fragment>
                            : null
                        }
                    </View>
                </ScrollView>
                <SignInOverlay />
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
        if (type === 'Features') {
            this.props.openTagsOverlay();
        } else {
            this.setState({ isLoading: true });
            let result, data;
            const { restaurant_id } = this.props;
            if (type === 'Menu') {
                result = await menuPicturesByRestaurantId(restaurant_id);
                data = result.data.response;
            } else {
                result = await foodItemsByRestaurantId(restaurant_id);
                data = result.data.food_items;
            }
            this.setState({ isLoading: false });
            if (result.success) {
                this.props.navigateTo('Picture', { data, type });
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

export default connect(null, { showSignInOverlay })(RestaurantScreen);