import React from 'react';
import { View, Text, AsyncStorage, Dimensions, ActivityIndicator } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import styles from '../../styles/screens/business/BusinessProfileScreen.style';
import colors from '../../styles/colors.style';

import BusinessInfoPage from './pages/BusinessInfoPage';
import BusinessHoursPage from './pages/BusinessHoursPage';
import BusinessFeaturesPage from './pages/BusinessFeaturesPage';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('screen');

import BusinessAction from '../../actions/BusinessAction';
const BusinessInstance = BusinessAction.getInstance();

class BusinessProfileScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: 0,
            data: null,
            isLoading: !props.registration
        }
    }

    async componentDidMount() {
        if (!this.props.registration) {
            const result = await BusinessInstance.getProfile();
            if (result.success) {
                BusinessInstance.clearRegisterForm();
                this.setState({ data: result.data, isLoading: false });
            } else {
                alert(result.message);
                this.setState({ isLoading: false });
            }
        }
    }
    _renderPage = ({item, index}) => {
        const { page } = item;
        let renderPage;
        if (page === 1) {
            renderPage = <BusinessInfoPage registration={this.props.registration} data={this.state.data}/>
        } else if (page === 2) {
            renderPage = <BusinessHoursPage registration={this.props.registration} data={this.state.data}/>
        } else if (page === 3) {
            renderPage = <BusinessFeaturesPage registration={this.props.registration} data={this.state.data} nextAction={() => this.props.navigation.navigate('BusinessUpload')} />
        } 
        return (
            <View style={[styles.page, { width: viewportWidth }]}>
                { renderPage }
            </View>
        );
    }

    render() {
        return (
            this.props.registration || !this.state.isLoading ?
                <View style={styles.container}>
                    <Carousel ref={(c) => { this.slider = c; }}
                        data={[{ page: 1 }, { page: 2 }, { page: 3 }]}
                        renderItem={this._renderPage}
                        sliderWidth={viewportWidth}
                        itemWidth={viewportWidth}
                        onSnapToItem={index => this.setState({ activeItem: index }) } />
                    <Pagination dotsLength={3}
                        activeDotIndex={this.state.activeItem}
                        containerStyle={styles.paginationContainer}
                        dotColor={colors.blue}
                        dotStyle={styles.paginationDot}
                        inactiveDotColor={colors.black}
                        inactiveDotOpacity={0.4}
                        inactiveDotScale={0.6}
                        carouselRef={this.slider}
                        tappableDots={!!this.slider} />
                </View> :
                <View style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    opacity: 0.2,
                    backgroundColor: 'black',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <ActivityIndicator size='large' />
                </View>
        );
    }
}

export default BusinessProfileScreen;