import React from 'react';
import { connect } from 'react-redux';
import { Text, View, ImageBackground, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
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

import SignInOverlay from '../../components/SignInOverlay';
import PreferenceOverlay from '../../components/preference/PreferenceOverlay';

import { guestCuisines } from '../../libs/constants';

import appState from '../../appState';
const state = appState.getInstance();

class Category extends React.Component {
    state = {
        isLoading: false
    }
    onSearchCuisine = async (cuisine) => {
        this.setState({ isLoading:  true });
        await this.props.onSearchCuisine(cuisine);
        this.setState({ isLoading:  false });
    }
    render() {
        const { type } = this.props;
        let categoryItem;
        if (type === 'grid') {
            const { item } = this.props;
            categoryItem = (
                <TouchableOpacity activeOpacity={0.5} onPress={() => this.onSearchCuisine(item.text)}>
                    <View style={styles.item}>
                        <Image style={{ height: 60, alignItems: 'center' }} resizeMode="contain" source={item.source} />
                        <Text style={[textStyles.tiny, { marginTop: 10 }]}>{item.text.toUpperCase()}</Text>
                    </View>
                    <Loader light show={this.state.isLoading} />
                </TouchableOpacity>
            );
        } else if (type === 'main') {
            const { category } = this.props;
            categoryItem = (
                <TouchableOpacity style={styles.topPickView} onPress={() => this.onSearchCuisine(category)}>
                    <ImageBackground style={styles.topPickImage} source={require('../../assets/backgrounds/top-picks.png')}>
                        <View style={styles.topPickImageOverlay}>
                            <Text style={textStyles.largeBold}>ZATIQ'S</Text>
                            <Text style={textStyles.hugeBold}>LAUNCH DEALS</Text>
                            {/* <Text style={textStyles.large}>OF THE DAY</Text> */}
                        </View>
                        <Loader light show={this.state.isLoading} />
                    </ImageBackground>
                </TouchableOpacity>
            );
        } else {
            const { style, category, src } = this.props;
            categoryItem = (
                <TouchableOpacity style={style} onPress={() => this.onSearchCuisine(category)}>
                    <ImageBackground style={styles.imageContainer} source={src}>
                        <Text style={textStyles.largeBold}>{category.toUpperCase()}</Text>
                    </ImageBackground>
                    <Loader light show={this.state.isLoading} />
                </TouchableOpacity>
            );
        }
        return categoryItem;
    }
}

class WelcomeSection extends React.Component {
    render() {
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
                <Text style={textStyles.mediumBold}>Hey {name},</Text>
                <Text style={textStyles.small}>HUNGRY? Let's find you something to eat</Text>
                <Text style={[textStyles.smallBold, { paddingTop: 10, paddingBottom: 10 }]}>What are you in the mood for?</Text>
            </View>
        );
    }
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
    _renderCategoryItem = (item, i) => {
        const { navigate } = this.props.navigation;
        return <Category onSearchCuisine={this.onSearchCuisine} navigate={navigate} type={'grid'} item={item} />;
    }
    render() {
        return (
            <ImageBackground style={styles.view} source={require('../../assets/backgrounds/background.png')}>
                <WelcomeSection />
                <ScrollView style={styles.scrollViewContainer}>
                    <Category type={'main'}
                        onSearchCuisine={this.onSearchCuisine} 
                        category={'Promotions'} />
                    <View style={styles.equalWidthsContainer}>
                        <Category type={'special'}
                            onSearchCuisine={this.onSearchCuisine} 
                            category={'Surprise Me'}
                            style={[styles.equalWitdhView, { marginRight: 5 }]}
                            src={require('../../assets/backgrounds/6.jpg')} />
                        <View style={[styles.equalWitdhView, { marginLeft: 5 }]}>
                            <View style={styles.equalHeightContainer}>
                               <Category type={'special'}
                                    onSearchCuisine={this.onSearchCuisine} 
                                    category={'Top Picks'}
                                    style={[styles.equalHeightView, { paddingBottom: 5}]}
                                    src={require('../../assets/backgrounds/2.jpeg')} />
                               <Category type={'special'}
                                    onSearchCuisine={this.onSearchCuisine} 
                                    category={'Newest'}
                                    style={[styles.equalHeightView, { paddingTop: 5 }]}
                                    src={require('../../assets/backgrounds/2.jpeg')} />
                            </View>
                        </View>
                    </View>
                    <GridView itemDimension={130} items={categories} renderItem={this._renderCategoryItem} style={{paddingTop: 0, flex: 1}}/>
                </ScrollView>
                <PreferenceOverlay />
                <SignInOverlay />
            </ImageBackground>
        );
    }
};

export default connect(null, { showPreferenceOverlay, showSignInOverlay })(FeelingScreen);