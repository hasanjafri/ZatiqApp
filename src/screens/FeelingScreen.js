import React from 'react';
import { Text, View, ImageBackground, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Avatar } from 'react-native-elements';
import GridView from 'react-native-super-grid';
import styles from '../styles/screens/FeelingScreen.style';
import textStyles from '../styles/text.style';
import categories from '../data/categories';

class FeelingScreen extends React.Component {
    constructor(props) {
        super(props);
    }
    _renderCategoryItem = (item, i) => {
        const { navigate } = this.props.navigation;
        return (
            <TouchableOpacity onPress={() => navigate('Suggestion', { category: item.text })}>
                <View style={styles.item}>
                    <Image style={{height: 50, width: 50}} source={item.source}></Image>
                    <Text style={styles.text}>{item.text}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    _renderTextWithBackground = (source, text) => {
        return (
            <ImageBackground style={styles.imageContainer} source={source}>
                <Text style={textStyles.whiteLargeBold}>{text}</Text>
            </ImageBackground>
        );
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <ImageBackground style={styles.view} source={require('../assets/backgrounds/background.png')}>
                <View style={styles.questionView}>
                    <Text style={textStyles.whiteBoldMedium}>Hey Jace,</Text>
                    <Text style={textStyles.whiteSmall}>HUNGRY? Let's find you something to eat</Text>
                    <Text style={[textStyles.whiteSmallBold, { paddingTop: 10, paddingBottom: 10 }]}>What are you in the mood for?</Text>
                </View>
                <ScrollView style={styles.scrollViewContainer}>
                    <TouchableOpacity style={styles.topPickView} onPress={() => navigate('Suggestion', { category: 'Top Pick' })}>
                        <ImageBackground style={styles.topPickImage} source={require('../assets/backgrounds/top-picks.png')}>
                            <View style={styles.topPickImageOverlay}>
                                <Text style={textStyles.whiteLargeBold}>OUR</Text>
                                <Text style={textStyles.yellowHugeBold}>TOP</Text>
                                <Text style={textStyles.whiteLargeBold}>PICKS</Text>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                    <View style={styles.equalWidthsContainer}>
                        <TouchableOpacity style={[styles.equalWitdhView, { paddingRight: 5 }]} onPress={() => navigate('Suggestion', { category: 'Surprise Me' })}>
                            {this._renderTextWithBackground(require('../assets/backgrounds/surprise-me.png'), 'SURPRISE ME')}
                        </TouchableOpacity>
                        <View style={[styles.equalWitdhView, { paddingLeft: 5 }]}>
                            <View style={styles.equalHeightContainer}>
                                <TouchableOpacity style={[styles.equalHeightView, { paddingBottom: 5 }]} onPress={() => navigate('Suggestion', { category: 'Popular' })}>
                                    {this._renderTextWithBackground(require('../assets/backgrounds/surprise-me.png'), 'POPULAR')}
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.equalHeightView, { paddingTop: 5 }]} onPress={() => navigate('Suggestion', { category: 'Newest' })}>
                                    {this._renderTextWithBackground(require('../assets/backgrounds/surprise-me.png'), 'NEWEST')}
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <GridView itemDimension={130} items={categories} renderItem={this._renderCategoryItem} style={{paddingTop: 0, flex: 1}}/>
                </ScrollView>
            </ImageBackground>
        );
    }
};

export default FeelingScreen;