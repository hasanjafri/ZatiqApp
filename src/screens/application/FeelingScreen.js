import React from 'react';
import { Text, View, ImageBackground, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Avatar } from 'react-native-elements';
import GridView from 'react-native-super-grid';

// Custom imports
import {searchCuisine} from '../../actions/UserAction';
import AddReviewButton from '../../components/addReview/AddReviewButton';
import styles from '../../styles/screens/application/FeelingScreen.style';
import textStyles from '../../styles/text.style';
import categories from '../../data/categories';
import Loader from '../../components/Loader';
import PreferenceOverlay from '../../components/preference/PreferenceOverlay';

import appState from '../../appState';

class FeelingScreen extends React.Component {
    constructor(props) {
        super(props);
        const state = appState.getInstance();
        this.user = state.getUser();
        this.state = {
            showPreferenceOverlay: false
        }
    }
    componentDidMount() {
        this.props.navigation.setParams({ togglePreferenceModal: this.togglePreferenceModal });
    }
    togglePreferenceModal = () => {
        this.setState({ showPreferenceOverlay: !this.state.showPreferenceOverlay });
    }
    _renderCategoryItem = (item, i) => {
        const { navigate } = this.props.navigation;
        return <Category navigate={navigate} type={'grid'} item={item} />;
    }
    render() {
        const { navigate } = this.props.navigation;
        let name = 'friend';
        if (this.user) {
            const { type } = this.user;
            if (type === 'user' && this.user.data) {
                name =  this.user.data.user_name;
            } else if (type === 'business' && this.user.data) {
                name = this.user.data.name;
            }
        }
        return (
            <ImageBackground style={styles.view} source={require('../../assets/backgrounds/background.png')}>
                <View style={styles.questionView}>
                    <Text style={textStyles.mediumBold}>Hey {name},</Text>
                    <Text style={textStyles.small}>HUNGRY? Let's find you something to eat</Text>
                    <Text style={[textStyles.smallBold, { paddingTop: 10, paddingBottom: 10 }]}>What are you in the mood for?</Text>
                </View>
                <ScrollView style={styles.scrollViewContainer}>
                    <Category type={'main'}
                        navigate={navigate}
                        category={'Promotions'} />
                    <View style={styles.equalWidthsContainer}>
                        <Category type={'special'}
                            navigate={navigate}
                            category={'Surprise Me'}
                            style={[styles.equalWitdhView, { paddingRight: 5 }]}
                            src={require('../../assets/backgrounds/6.jpg')} />
                        <View style={[styles.equalWitdhView, { paddingLeft: 5 }]}>
                            <View style={styles.equalHeightContainer}>
                               <Category type={'special'}
                                    navigate={navigate}
                                    category={'Top Picks'}
                                    style={[styles.equalHeightView, { paddingBottom: 5}]}
                                    src={require('../../assets/backgrounds/2.jpeg')} />
                               <Category type={'special'}
                                    navigate={navigate}
                                    category={'Newest'}
                                    style={[styles.equalHeightView, { paddingTop: 5 }]}
                                    src={require('../../assets/backgrounds/2.jpeg')} />
                            </View>
                        </View>
                    </View>
                    <GridView itemDimension={130} items={categories} renderItem={this._renderCategoryItem} style={{paddingTop: 0, flex: 1}}/>
                </ScrollView>
                <PreferenceOverlay showOverlay={this.state.showPreferenceOverlay} onClose={() => this.setState({ showPreferenceOverlay: false })} />
            </ImageBackground>
        );
    }
};

class Category extends React.Component {
    state = {
        isLoading: false
    }
    onSearchCuisine = async (cuisine) => {
        this.setState({ isLoading:  true });
        const result = await searchCuisine(cuisine);
        this.setState({ isLoading:  false });
        if (result.success) {
            const { navigate } = this.props;
            navigate('Suggestion', { category: cuisine, data: result.data });
        } else {
            alert(result.message);
        }
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
                            <Text style={textStyles.hugeBold}>PROMOTIONS</Text>
                            <Text style={textStyles.large}>OF THE DAY</Text>
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
                        <Text style={textStyles.large}>{category.toUpperCase()}</Text>
                    </ImageBackground>
                    <Loader light show={this.state.isLoading} />
                </TouchableOpacity>
            );
        }
        return categoryItem;
    }
}
export default FeelingScreen;