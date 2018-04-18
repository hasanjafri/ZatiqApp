import React from 'react';
import { Text, View, ImageBackground, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Avatar } from 'react-native-elements';
import GridView from 'react-native-super-grid';

// Custom imports
import AddReviewButton from '../../components/addReview/AddReviewButton';
import styles from '../../styles/screens/application/FeelingScreen.style';
import textStyles from '../../styles/text.style';
import categories from '../../data/categories';
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
        this.props.navigation.setParams({ togglePreferenceModal: this.togglePreferenceModalModal });
    }
    togglePreferenceModalModal = () => {
        this.setState({ showPreferenceOverlay: !this.state.showPreferenceOverlay });
    }
    _renderCategoryItem = (item, i) => {
        const { navigate } = this.props.navigation;
        return (
            <TouchableOpacity activeOpacity={0.5} onPress={() => navigate('Suggestion', { category: item.text })}>
                <View style={styles.item}>
                    <Image style={{ height: 60, alignItems: 'center' }} resizeMode="contain" source={item.source}></Image>
                    <Text style={[textStyles.tiny, { marginTop: 10 }]}>{item.text.toUpperCase()}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    _renderTextWithBackground = (source, text) => {
        return (
            <ImageBackground style={styles.imageContainer} source={source}>
                <Text style={textStyles.large}>{text}</Text>
            </ImageBackground>
        );
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <ImageBackground style={styles.view} source={require('../../assets/backgrounds/background.png')}>
                <View style={styles.questionView}>
                    <Text style={textStyles.mediumBold}>Hey {this.user ? this.user.data.name : 'friend'},</Text>
                    <Text style={textStyles.small}>HUNGRY? Let's find you something to eat</Text>
                    <Text style={[textStyles.smallBold, { paddingTop: 10, paddingBottom: 10 }]}>What are you in the mood for?</Text>
                </View>
                <ScrollView style={styles.scrollViewContainer}>
                    <TouchableOpacity style={styles.topPickView} onPress={() => navigate('Suggestion', { category: 'Top Pick' })}>
                        <ImageBackground style={styles.topPickImage} source={require('../../assets/backgrounds/top-picks.png')}>
                            <View style={styles.topPickImageOverlay}>
                                <Text style={textStyles.large}>OUR</Text>
                                <Text style={textStyles.hugeBold}>TOP</Text>
                                <Text style={textStyles.large}>PICKS</Text>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                    <View style={styles.equalWidthsContainer}>
                        <TouchableOpacity style={[styles.equalWitdhView, { paddingRight: 5 }]} onPress={() => navigate('Suggestion', { category: 'Surprise Me' })}>
                            {this._renderTextWithBackground(require('../../assets/backgrounds/surprise-me.png'), 'SURPRISE ME')}
                        </TouchableOpacity>
                        <View style={[styles.equalWitdhView, { paddingLeft: 5 }]}>
                            <View style={styles.equalHeightContainer}>
                                <TouchableOpacity style={[styles.equalHeightView, { paddingBottom: 5 }]} onPress={() => navigate('Suggestion', { category: 'Popular' })}>
                                    {this._renderTextWithBackground(require('../../assets/backgrounds/surprise-me.png'), 'POPULAR')}
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.equalHeightView, { paddingTop: 5 }]} onPress={() => navigate('Suggestion', { category: 'Newest' })}>
                                    {this._renderTextWithBackground(require('../../assets/backgrounds/surprise-me.png'), 'NEWEST')}
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <GridView itemDimension={130} items={categories} renderItem={this._renderCategoryItem} style={{paddingTop: 0, flex: 1}}/>
                </ScrollView>
                <AddReviewButton fixed hide={this.state.showPreferenceOverlay}/>
                <PreferenceOverlay showOverlay={this.state.showPreferenceOverlay} onClose={() => this.setState({ showPreferenceOverlay: false })} />
            </ImageBackground>
        );
    }
};

export default FeelingScreen;