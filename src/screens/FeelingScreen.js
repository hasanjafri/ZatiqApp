import React from 'react';
import { Text, View, ImageBackground, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Avatar } from 'react-native-elements';
import GridView from 'react-native-super-grid';
import styles from '../styles/screens/FeelingScreen';
import textStyles from '../styles/text';

const url = require('../assets/icons/Breakfast.png');

const CATEGORIES = [ 'Breakfast', 'Brunch', 'Lunch', 'Indian', 'Greek', 'Chinese', 'Japanese', 'Korean', 'Sushi', 'Dessert', 'Burger', 'Pizza', 'Fast Food', 'Cheap Eats', 'Caribbean', 'Mexican', 'Spicy', 'Fine Food', 'Halal', 'Kosher', 'Healthy', 'Vegan', 'Vegetarian', 'Gluten Free', 'Italian', 'Middle Eastern', 'Quick Bite', 'Thai', 'Canadian', 'Vietnamese', 'Dinner' ];

function renderItem(item, i) {
    return (
        <TouchableOpacity>
            <View style={styles.item}>
                <Image style={{height: 50, width: 50}} source={url}></Image>
                <Text style={styles.text}>{item}</Text>
            </View>
        </TouchableOpacity>
    )
}

const FeelingScreen = ({navigation}) => (
  <ImageBackground style={styles.view} source={require('../assets/backgrounds/background.png')}>
    <ImageBackground style={styles.header} source={require('../assets/backgrounds/header.png')}>
        <ImageBackground style={styles.headerLogo} source={require('../assets/logos/logo.png')}/>
    </ImageBackground>
    <ScrollView style={styles.scrollViewContainer}>
        <View style={styles.scrollView}>
            <Text style={textStyles.whiteBoldMedium}>Hey Jace</Text>
        </View>
        <View style={styles.scrollView}>
            <Text style={textStyles.whiteSmall}>HUNGRY? Let's find you something to eat</Text>
        </View>
        <View style={styles.scrollView}>
            <Text style={textStyles.whiteSmallBold}>{"\n"}What are you in the mood for?</Text>
        </View>
        <View style={styles.moodContainer}/>
        <TouchableOpacity style={styles.suggestions}>
            <ImageBackground style={styles.topPick} source={require('../assets/backgrounds/top-picks.png')}>
                <View style={styles.topPickView}>
                   <Text style={textStyles.whiteLargeBold}>OUR</Text>
                </View>
                <View style={styles.topPickView}>
                   <Text style={textStyles.yellowHugeBold}>TOP</Text>
                </View>
                <View style={styles.topPickView}>
                   <Text style={textStyles.whiteLargeBold}>PICKS</Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>
        <View style={styles.surpriseMeView}>
            <TouchableOpacity style={styles.surpiseMeContainer}>
                <ImageBackground style={styles.surpriseMeImageBackground} source={require('../assets/backgrounds/surprise-me.png')}>
                    <Text style={textStyles.whiteLargeBold}>SURPRISE ME</Text>
                </ImageBackground>
            </TouchableOpacity>
        </View>
        <GridView itemDimension={130} items={CATEGORIES} renderItem={renderItem} style={{paddingTop: 5, flex: 1}}/>
    </ScrollView>
  </ImageBackground>
);

export default FeelingScreen;