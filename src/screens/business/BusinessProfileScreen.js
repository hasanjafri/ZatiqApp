import React from 'react';
import { View, Text, AsyncStorage, Dimensions, Keyboard } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { NavigationActions } from 'react-navigation'

import Loader from '../../components/Loader';
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
        Keyboard.dismiss();
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
    updateNextActiveItem(nextActiveItem) {
        Keyboard.dismiss();
        this.slider.snapToNext();
        this.setState({ activeItem: nextActiveItem });
    }
    _renderPage = ({item, index}) => {
        const { page } = item;
        return (
            <PageRenderer page={page}
                registration={this.props.registration}
                selectNextActiveItem={nextActiveItem => this.updateNextActiveItem(nextActiveItem)}
                data={this.state.data}
                nextAction={() => {
                    this.props.navigation.dispatch(
                        NavigationActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({ routeName: 'BusinessUpload' }),
                            ],
                            key: null
                        })
                    )}
                } />
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
                <Loader show clear />
        );
    }
}

class PageRenderer extends React.Component {
    shouldComponentUpdate() {
        return false;
    }
    render() {
        const { page } = this.props;
        let renderPage;
        if (page === 1) {
            renderPage = <BusinessInfoPage registration={this.props.registration} data={this.props.data} nextAction={() => this.props.selectNextActiveItem(1)} />
        } else if (page === 2) {
            renderPage = <BusinessHoursPage registration={this.props.registration} data={this.props.data} nextAction={() => this.props.selectNextActiveItem(2)} />
        } else if (page === 3) {
            renderPage = <BusinessFeaturesPage registration={this.props.registration} data={this.props.data} nextAction={() => this.props.nextAction()} />
        } 
        return (
            <View style={[styles.page, { width: viewportWidth }]}>
                { renderPage }
            </View>
        );
    }
}

export default BusinessProfileScreen;