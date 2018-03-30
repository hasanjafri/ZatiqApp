import React from 'react';
import { ImageBackground, ScrollView, Image, View, Text, TouchableOpacity } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import GridView from 'react-native-super-grid';
import StarRating from 'react-native-star-rating';

// Custom imports
import styles from '../styles/screens/RestaurantScreen.style';
import textStyles from '../styles/text.style';
import AddButton from '../components/add/AddButton';

const TAGS = [
    { text: 'Features', source: require('../assets/icons/Breakfast.png') },
    { text: 'Menu', source: require('../assets/icons/Brunch.png') },
    { text: 'Photos', source: require('../assets/icons/Lunch.png') }
];
const REVIEWS = [
    { text: 'This was the best food ever!jsdfasoidufoasudfoiasudfoiasudfoasufoasudofiasudogiabhfiuhiuiobhdfiogbhdfiobhfigbhfighbiuh', image: require('../assets/backgrounds/surprise-me.png'), name: 'Angelica C.', rating: 4 },
    { text: 'Disgusting', image: require('../assets/backgrounds/surprise-me.png'), name: 'Angelica C.asdfsdf', rating: 3 },
    { text: 'Ver long and random text, 1289347194h1i24hehdfoiguaosjodfgjodifjsdpofgsdpfgisdpfgsgisdpfigpsdfigpfipsdofigpfigpsdofigpsdofigosdpfigpsdofigsdpofgispdofigpsdfoigdfgfpodfpgispdfigpsdog', image: require('../assets/icons/Lunch.png'), name: 'Angelica C.asdfsdf', rating: 2 }
];

class RestaurantScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.ITEMS = [
            { text: 'Features', source: require('../assets/icons/Breakfast.png') },
            { text: 'Menu', source: require('../assets/icons/Brunch.png') },
            { text: 'Photos', source: require('../assets/icons/Lunch.png') }
        ];
    }
    onPress() {

    }
    _renderMenuItem = item => {
        const { navigate } = this.props.navigation;
        return (
            <TouchableOpacity onPress={() => navigate('Picture', { category: item.text })}>
                <View style={styles.item}>
                    <Image style={{ height: 50, width: 50 }} source={item.source}></Image>
                    <Text style={{ color: 'white' }}>{item.text}</Text>
                </View>
            </TouchableOpacity>
        );
    }
    _renderTags = tag => {
        return <Text style={[textStyles.whiteSmall, styles.tag]}>{tag.text}</Text>;
    }
    _renderSection = title => {
        return (
            <Text style={[textStyles.whiteBoldMedium, { paddingVertical: 10, marginTop: 20, borderTopWidth: 1, borderTopColor: 'white', width: '90%' }]}>{title}</Text>
        );
    }
    render () {
        const isOpen = false;
        return (
            <ImageBackground style={styles.view} source={require('../assets/backgrounds/background.png')}>
                <ScrollView style={styles.scrollViewContainer}>
                    {/* Restaurant Image */}
                    <View style={styles.imageContainer}>
                        <Image style={styles.restaurantImage} resizeMode={'cover'} source={require('../assets/backgrounds/surprise-me.png')} />
                    </View>
                    <View style={styles.centered}>
                        {/* Title & Address */}
                        <Text style={[textStyles.whiteLargeBold, { paddingTop: 10 }]}>Les 3 Brasseurs</Text>
                        <Text style={[textStyles.whiteSmall, { fontFamily: 'nunito-italic'}]}>123 Street, City</Text>
                        {/* Rating, Features, Menu, Photos & Call to Order */}
                        <StarRating disabled
                            maxStars={5}
                            starSize={25}
                            rating={3}
                            containerStyle={{ paddingVertical: 10, width: 150 }}
                            fullStarColor={'#f1c40f'} />
                        <GridView itemDimension={80}
                            items={this.ITEMS}
                            renderItem={this._renderMenuItem}
                            style={{paddingTop: 10, flex: 1}}/>
                        <TouchableOpacity activeOpacity={0.7} style={styles.buttonCall} onPress={this.onPress}>
                            <Icon containerStyle={{ paddingLeft: 20, justifyContent: 'center' }} name={'call'} color={'white'} />
                            <Text style={[textStyles.whiteSmall, styles.buttonText]}>Call To Order</Text>
                        </TouchableOpacity>
                        {/* Hours */}
                        { this._renderSection('Hours') }
                        <View style={styles.widthsContainer}>
                            <View style={{ width: '50%', paddingRight: 5 }}>
                                <Text style={[textStyles.whiteSmall, {lineHeight: 25}]}>Current</Text>
                                <Text style={[textStyles.whiteSmall, {lineHeight: 25}]}>Monday - Friday</Text>
                                <Text style={[textStyles.whiteSmall, {lineHeight: 25}]}>Staturday</Text>
                                <Text style={[textStyles.whiteSmall, {lineHeight: 25}]}>Sunday</Text>
                            </View>
                            <View style={{ width: '50%', paddingLeft: 5 }}>
                                <View style={styles.centered}>
                                    <Text style={[styles.open, { backgroundColor: isOpen ? 'green' : 'red' }]}>
                                        { isOpen ? 'Open now' : 'Closed' }
                                    </Text>
                                </View>
                                <Text style={[textStyles.whiteSmall, {lineHeight: 25}]}>9:00 am - 5:00 pm</Text>
                                <Text style={[textStyles.whiteSmall, {lineHeight: 25}]}>11:00 am - 8:00 pm</Text>
                                <View style={styles.centered}>
                                    <Text style={[styles.open, { backgroundColor: isOpen ? 'green' : 'red' }]}>
                                        { isOpen ? 'Open now' : 'Closed' }
                                    </Text>
                                </View>
                            </View>
                        </View>
                        {/* Cuisines */}
                        { this._renderSection('Cuisines') }
                        <GridView itemDimension={90}
                            items={TAGS}
                            spacing={5}
                            renderItem={this._renderTags}
                            style={{paddingTop: 10, flex: 1}} />
                        {/* Reviews */}
                        { this._renderSection('Reviews') }
                        <View style={styles.reviewsContainer}>
                            { REVIEWS.map((review, i) =>
                                <View key={i} style={styles.reviewRow}>
                                    <Image style={{ height: 100, width: '30%' }} resizeMode={'cover'} source={review.image} />

                                    <View style={{ width: '70%', paddingLeft: 10 }}>
                                        <Text style={styles.reviewTitle}>{review.name}</Text>
                                        <Text style={styles.reviewContent}>{review.text}</Text>
                                        <StarRating disabled
                                            maxStars={5}
                                            starSize={20}
                                            rating={review.rating}
                                            containerStyle={{ paddingVertical: 10, width: 150, paddingRight: 10 }}
                                            fullStarColor={'#f1c40f'} />
                                    </View>
                                </View>
                            )}
                        </View>
                        <AddButton onPress={() => this.setState({ })}/>
                    </View>
                </ScrollView>
            </ImageBackground>
        );
    }
};

export default RestaurantScreen;