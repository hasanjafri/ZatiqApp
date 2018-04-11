import React from 'react';
import { View, Text, AsyncStorage, Dimensions } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import styles from '../../styles/screens/business/BuisnessProfileScreen.style';
import colors from '../../styles/colors.style';

import BusinessInfoPage from './pages/BusinessInfoPage';
import FeaturesPage from './pages/FeaturesPage';
import PicturesPage from './pages/PicturesPage';
import FoodItemsPage from './pages/FoodItemsPage';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('screen');

class BusinessProfileScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasSetInformation: 0,
            activeItem: 0,
            profile: {
                cuisines: []
            }
        }
    }

    componentWillMount() {
        //this.loadInitialState().done();
    }

    onCuisineChange = cuisines => {
        console.log(cuisines);
        this.setState({ profile: {...this.state.profile, cuisines } });
    };
    _renderPage = ({item, index}) => {
        const { page } = item;
        let renderPage;
        if (page === 1) {
            renderPage = <BusinessInfoPage />
        } else if (page === 2) {
            renderPage = <PicturesPage />
        } else if (page === 3) {
            renderPage = <FoodItemsPage />
        } else {
            renderPage = <FeaturesPage />
        }
        return (
            <View style={[styles.page, { width: viewportWidth }]}>
                { renderPage }
            </View>
        );
    }

    render() {
        if (this.state.hasSetInformation == '0') {
            return (
                <View style={styles.container}>
                    <Carousel ref={(c) => { this.slider = c; }}
                        data={[{ page: 1 }, { page: 2 }, { page: 3 }, { page: 4 }]}
                        renderItem={this._renderPage}
                        sliderWidth={viewportWidth}
                        itemWidth={viewportWidth}
                        onSnapToItem={index => this.setState({ activeItem: index }) } />
                    <Pagination dotsLength={4}
                        activeDotIndex={this.state.activeItem}
                        containerStyle={styles.paginationContainer}
                        dotColor={colors.blue}
                        dotStyle={styles.paginationDot}
                        inactiveDotColor={colors.black}
                        inactiveDotOpacity={0.4}
                        inactiveDotScale={0.6}
                        carouselRef={this.slider}
                        tappableDots={!!this.slider} />
                </View>
            );
        }
        return(
            <View style={styles.container}>
                <Text style={styles.text}>Set!</Text>
            </View>
        );
    }
}

export default BusinessProfileScreen;