import React from 'react';
import { connect } from 'react-redux';
import { Text, View, ImageBackground, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Avatar } from 'react-native-elements';
import GridView from 'react-native-super-grid';

import { showPreferenceOverlay, showSignInOverlay } from '../../redux/actions/general.action';

// Custom imports
import { searchCuisine } from '../../actions/UserAction';
import AddReviewButton from '../../components/addReview/AddReviewButton';
import styles from '../../styles/screens/application/FeelingScreen.style';
import textStyles from '../../styles/text.style';
import categories from '../../data/categories';
import Loader from '../../components/Loader';
import Slider from '../../components/slider/Slider';

import SignInOverlay from '../../components/SignInOverlay';
import PreferenceOverlay from '../../components/preference/PreferenceOverlay';

import { guestCuisines } from '../../libs/constants';

import appState from '../../appState';
const state = appState.getInstance();

class Promotions extends React.Component {4
    navigateTo = (route, item) => {
        this.props.navigation.navigate(route, item);
    }
    render() {
        return (
            <Slider type="Promotion"
                containerStyle={{}}
                navigateTo={this.navigateTo}
                itemWidth={250}
                data={[{ test: 1 }, { test: 1 }, { test: 1 }]}
                noPaginate />
        );
    }
}

class FoodCategory extends React.Component {
    state = {
        isLoading: false
    }
    onSearchCuisine = async (cuisine) => {
        this.setState({ isLoading:  true });
        await this.props.onSearchCuisine(cuisine);
        this.setState({ isLoading:  false });
    }
    render() {
        const { type, item } = this.props;
        return (
            <TouchableOpacity activeOpacity={0.5} onPress={() => this.onSearchCuisine(item.text)}>
                <View style={styles.item}>
                    <Image style={{ height: 60, alignItems: 'center' }} resizeMode="contain" source={item.source} />
                    <Text style={[textStyles.tiny, { marginTop: 10 }]}>{item.text.toUpperCase()}</Text>
                </View>
                <Loader light show={this.state.isLoading} />
            </TouchableOpacity>
        );
    }
}

class FilterCategory extends React.Component {
    state = {
        isLoading: false
    }
    onSearchCuisine = async () => {
        this.setState({ isLoading:  true });
        await this.props.onSearchCuisine();
        this.setState({ isLoading:  false });
    }
    render() {
        return (
            <TouchableOpacity onPress={this.onSearchCuisine} activeOpacity={0.5} style={[styles.buttonTextContainer, this.props.last ? { marginTop: 10 } : {} ]}>
                <Text numberOfLines={1} style={styles.buttonText}>{this.props.name}</Text>
                <Loader light show={this.state.isLoading} />
            </TouchableOpacity>
        );
    }
}

const WelcomeSection = props => {
    const user = appState.getInstance().getUser();
    let name = 'guest';
    if (user) {
        const { type } = user;
        if (type === 'user' && user.data) {
            name =  user.data.user_name;
        } else if (type === 'business' && user.data) {
            name = user.data.name;
        }
    }
    return (
        <View style={styles.questionView}>
            <Text numberOfLines={1} style={textStyles.small}>Hey {name}! Let's find you something to eat</Text>
            <Text numberOfLines={1} style={textStyles.small}>What are you in the mood for?</Text>
        </View>
    );
}

class FeelingScreen extends React.Component {
    async componentDidMount() {
        this.props.navigation.setParams({ togglePreferenceModal: this.togglePreferenceModal });
        const hasSeenPreferences = await state.hasSeenPreferences();
        const user = await state.getUser();
        if (!hasSeenPreferences && user.type === 'user' && user.data) {
            this.togglePreferenceModal();
            await appState.getInstance().seenPreferences();
        }
    }
    onSearchCuisine = async (cuisine) => {
        const handleSearchCusine = async () => {
            const result = await searchCuisine(cuisine);
            if (result.success) {
                navigate('Suggestion', { category: cuisine, data: result.data });
            } else {
                alert(result.message);
            }
        }
        const { navigate } = this.props.navigation;
        const user = appState.getInstance().getUser();
        if (!user.data && guestCuisines.indexOf(cuisine) === -1) {
            this.props.showSignInOverlay(() => handleSearchCusine());
        } else {
            await handleSearchCusine();
        }
        return { success: true };
    }
    togglePreferenceModal = () => {
        this.props.showPreferenceOverlay();
    }
    render() {
        return (
            <ImageBackground style={styles.view} source={require('../../assets/backgrounds/background.png')}>
                <ScrollView style={styles.scrollViewContainer}>
                    <Text numberOfLine={1} style={styles.topPicksLabel}>Top Picks</Text>
                    <Promotions />
                    <View style={styles.filterCategoryContainer}>
                        <FilterCategory name="SURPRISE ME" onSearchCuisine={() => this.onSearchCuisine('Surprise Me')} />
                        <FilterCategory name="TRENDING" onSearchCuisine={() => this.onSearchCuisine('Top Picks')} last />
                    </View>
                    <WelcomeSection />
                    <GridView itemDimension={130}
                        items={categories}
                        renderItem={(item, i) => (
                            <FoodCategory onSearchCuisine={this.onSearchCuisine}
                                navigate={this.props.navigation.navigate}
                                item={item} />
                        )}
                        style={{paddingTop: 0, flex: 1}} />
                </ScrollView>
                <PreferenceOverlay />
                <SignInOverlay />
            </ImageBackground>
        );
    }
};

export default connect(null, { showPreferenceOverlay, showSignInOverlay })(FeelingScreen);