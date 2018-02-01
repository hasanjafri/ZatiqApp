import React from 'react';
import { Text, View, ImageBackground, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Avatar } from 'react-native-elements';
import GridView from 'react-native-super-grid';

var styles = StyleSheet.create({
    item: {
        justifyContent: 'flex-end',
        borderRadius: 5,
        padding: 10,
        height: 150,
        backgroundColor: '#7f8c8d'
    },
    text: {
        color: "white",
        fontSize: 32
    }
});

var CATEGORIES = [ 'Breakfast', 'Brunch', 'Lunch', 'Indian', 'Greek', 'Chinese', 'Japanese', 'Korean', 'Sushi', 'Dessert', 'Burger', 'Pizza', 'Fast Food', 'Cheap Eats', 'Caribbean', 'Mexican', 'Spicy', 'Fine Food', 'Halal', 'Kosher', 'Healthy', 'Vegan', 'Vegetarian', 'Gluten Free', 'Italian', 'Middle Eastern', 'Quick Bite', 'Thai', 'Canadian', 'Vietnamese', 'Dinner', 'Snack' ];

function renderItem(item) {
    return (
        <TouchableOpacity>
            <View style={styles.item}>
                    <Text style={styles.text}>{item}</Text>
            </View>
        </TouchableOpacity>
    )
}

const FeelingScreen = ({navigation}) => (
  <ImageBackground style={{height: '100%', width: '100%'}} source={require('/Users/hasanjafri/Documents/ZatiqApp/background.png')}>
    <ImageBackground style={{height: '30%', width: '100%', justifyContent: 'center', alignItems: 'center'}} source={require('/Users/hasanjafri/Documents/ZatiqApp/header.png')}>
            <ImageBackground style={{height: '50%', width: '50%', marginBottom: 80, marginLeft: 88}} source={require('/Users/hasanjafri/Documents/ZatiqApp/logo.png')}/>
    </ImageBackground>
    <ScrollView style = {{marginTop: -120, flex: 1}}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>Hey Jace</Text>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 16, color: 'white'}}>HUNGRY? Let's find you something to eat</Text>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 16, color: 'white', fontWeight: 'bold'}}>{"\n"}What are you in the mood for?</Text>
        </View>
        <View style={{borderBottomColor: 'white', borderBottomWidth: 1, marginBottom: 11}}/>
        <TouchableOpacity style={{backgroundColor: '#70757c', height: 110, width: '90%', alignItems: 'center', justifyContent: 'center', marginLeft: 20, marginBottom: 10}}>
            <ImageBackground style={{height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center'}} source={require('/Users/hasanjafri/Documents/ZatiqApp/toppicks.png')}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                   <Text style={{fontSize: 22, fontWeight: 'bold', color: 'white'}}>OUR</Text>
                </View>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                   <Text style={{fontSize: 34, fontWeight: 'bold', color: 'yellow'}}>TOP</Text>
                </View>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                   <Text style={{fontSize: 22, fontWeight: 'bold', color: 'white'}}>PICKS</Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>
        <View style={{height: 110, width: '90%', marginLeft: 20, marginBottom: 10}}>
            <TouchableOpacity style={{height: '100%'}}>
                <ImageBackground style={{height: '100%', width: '70%', justifyContent: 'center'}} source={require('/Users/hasanjafri/Documents/ZatiqApp/surpriseme.png')}>
                    <Text style={{fontSize: 24, fontWeight: 'bold', color: 'white', alignSelf: 'center'}}>SURPRISE ME</Text>
                </ImageBackground>
            </TouchableOpacity>
        </View>
        <GridView itemDimension={130} items={CATEGORIES} renderItem={renderItem} style={{paddingTop: 5, flex: 1}}/>
    </ScrollView>
  </ImageBackground>
);

export default FeelingScreen;