import React from 'react';
import { ImageBackground, ScrollView, Image, View, Text, TouchableOpacity } from 'react-native';
import { Icon, Button, Divider } from 'react-native-elements';
import GridView from 'react-native-super-grid';
import styles from '../styles/screens/RestaurantScreen.style';
import textStyles from '../styles/text.style';
import StarRating from 'react-native-star-rating';

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
        this.TAGS = [
            { text: 'Features', source: require('../assets/icons/Breakfast.png') },
            { text: 'Menu', source: require('../assets/icons/Brunch.png') },
            { text: 'Photos', source: require('../assets/icons/Lunch.png') }
        ]
    }
    onPress() {

    }
    _renderMenuItem = (item, i) => {
        const { navigate } = this.props.navigation;
        return (
            <TouchableOpacity onPress={() => navigate('Suggestion', { category: item.text })}>
                <View style={styles.item}>
                    <Image style={{height: 50, width: 50}} source={item.source}></Image>
                    <Text style={{ color: 'white' }}>{item.text}</Text>
                </View>
            </TouchableOpacity>
        );
    }
    _renderTags = (tag, i) => {
        return (
            <Text style={styles.tag}>
                {tag.text}
            </Text>
        );
    }
    render () {
        const isOpen = false;
        return (
            <ImageBackground style={styles.view} source={require('../assets/backgrounds/background.png')}>
                <ScrollView style={styles.scrollViewContainer}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.restaurantImage}
                            resizeMode={'cover'}
                            source={require('../assets/backgrounds/surprise-me.png')} />
                    </View>
                    <Text style={[textStyles.whiteLargeBold, { paddingTop: 10 }]}>
                        Les 3 Brasseurs
                    </Text>
                    <Text style={[textStyles.whiteSmall, { fontStyle: 'italic'}]}>
                        123 Street, City
                    </Text>
                    <View style={styles.centered}>
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
                            <Text style={styles.buttonText}>Call To Order</Text>
                        </TouchableOpacity>
                    </View>
                    <Divider style={{ backgroundColor: 'white', marginTop: 20 }} />
                    <Text style={[textStyles.whiteBoldMedium, { paddingVertical: 10 }]}>
                        Hours
                    </Text>
                    <View style={styles.widthsContainer}>
                        <View style={{ width: '50%', paddingRight: 5 }}>
                            <Text style={[textStyles.whiteSmallBold, {lineHeight: 25}]}>Current</Text>
                            <Text style={[textStyles.whiteSmallBold, {lineHeight: 25}]}>Monday - Friday</Text>
                            <Text style={[textStyles.whiteSmallBold, {lineHeight: 25}]}>Staturday</Text>
                            <Text style={[textStyles.whiteSmallBold, {lineHeight: 25}]}>Sunday</Text>
                        </View>
                        <View style={{ width: '50%', paddingLeft: 5 }}>
                            <View style={styles.centered}>
                                <Text style={[styles.open, { backgroundColor: isOpen ? 'green' : 'red' }]}>
                                    { isOpen ? 'Open now' : 'Closed' }
                                </Text>
                            </View>
                            <Text style={[textStyles.whiteSmallBold, {lineHeight: 25}]}>9:00 am - 5:00 pm</Text>
                            <Text style={[textStyles.whiteSmallBold, {lineHeight: 25}]}>11:00 am - 8:00 pm</Text>
                            <View style={styles.centered}>
                                <Text style={[styles.open, { backgroundColor: isOpen ? 'green' : 'red' }]}>
                                    { isOpen ? 'Open now' : 'Closed' }
                                </Text>
                            </View>
                        </View>
                    </View>
                    <Divider style={{ backgroundColor: 'white', marginTop: 20 }} />
                    <Text style={[textStyles.whiteBoldMedium, { paddingVertical: 10 }]}>
                        Cuisines
                    </Text>
                    <View style={styles.centered}>
                        <GridView itemDimension={90}
                            items={this.TAGS}
                            spacing={5}
                            renderItem={this._renderTags}
                            style={{paddingTop: 10, flex: 1}}/>
                    </View>
                    <Divider style={{ backgroundColor: 'white', marginTop: 20 }} />
                    <Text style={[textStyles.whiteBoldMedium, { paddingVertical: 10 }]}>
                        Reviews
                    </Text>
                </ScrollView>
            </ImageBackground>
        );
    }
};

export default RestaurantScreen;