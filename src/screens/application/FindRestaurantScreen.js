import React from 'react';
import { View, Text, Platform, ScrollView, Image } from 'react-native';
import { SearchBar, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { changeDrawerItem } from '../../redux/actions/drawer.action';

import _ from 'lodash';
// Custom imports
import { findRestaurantByName, closestRestaurants } from '../../actions/UserAction';
import textStyles from '../../styles/text.style';
import styles from '../../styles/screens/application/FindRestaurantScreen.style';
import appState from '../../appState';

class FindRestaurant extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSearching: true,
            restaurants: []
        }
        this.loaded = false;
        this.onChangeTextDelayed = _.throttle(this.onChangeText, 1000);
    }
    async componentDidMount() {
        const result = await closestRestaurants();
        this.loaded = true;
        if (result.success) {
            this.setState({ isSearching: false, restaurants: result.data });
        } else {
            this.setState({ isSearching: false, restaurants: [] });
            alert(result.message);
        }
        if (result.success) {
            this.setState({ isSearching: false, restaurants: result.data });
        } else {
            this.setState({ isSearching: false, restaurants: [] });
            alert(result.message);
        }
    }
    onChangeText = async (text) => {
        if (text !== '' && text.length >= 2) {
            this.setState({ isSearching: true });
            const result = await findRestaurantByName(text);
            this.loaded = true;
            if (result.success) {
                this.setState({ isSearching: false, restaurants: result.data });
            } else {
                this.setState({ isSearching: false, restaurants: [] });
            }
        }
    }
    render() {
        let renderedElement;
        if (!this.loaded) {
            renderedElement = <Text style={[textStyles.medium, { marginTop: 30, color: 'black', paddingHorizontal: 20 }]}>Please start by typing for a restaurant's name.</Text>
        } else if (!this.state.restaurants || this.state.restaurants.length === 0) {
            renderedElement = <Text style={[textStyles.medium, { marginTop: 30, color: 'black', paddingHorizontal: 20  }]}>No restaurants found with that name.</Text>
        } else {
            const state = appState.getInstance();
            renderedElement = (
                this.state.restaurants.map((restaurant, i) => {
                    return (
                        <ListItem key={i}
                            leftIcon={<View style={{ paddingRight: 10 }}><Image style={{width: 35, height: 35, borderRadius: 17.5}} source={{uri: restaurant.image.base64}}/></View>}
                            onPress={() => {
                                this.props.changeDrawerItem('Home');
                                this.props.navigation.navigate('Restaurant', {
                                    restaurant_id: restaurant.restaurant_id,
                                    restaurant_info: { ...restaurant }
                                });
                            }}
                            subtitle={restaurant.address}
                            title={restaurant.name} />
                    );
                })
            );
        }
        return (
            <React.Fragment>
                <SearchBar lightTheme
                    platform={Platform.OS}  
                    showLoading={this.state.isSearching}
                    onChangeText={this.onChangeTextDelayed}
                    placeholder='Search Restaurant'/>
                <ScrollView style={[styles.view]}>
                    {renderedElement}
                </ScrollView>
            </React.Fragment>
        );
    }
};

export default connect(null, { changeDrawerItem })(FindRestaurant);;