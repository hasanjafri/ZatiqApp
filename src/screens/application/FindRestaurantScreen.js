import React from 'react';
import { View, Text, Platform, ScrollView, Image } from 'react-native';
import { SearchBar, ListItem } from 'react-native-elements';
import _ from 'lodash';
// Custom imports
import { findRestaurantByName } from '../../actions/UserAction';
import textStyles from '../../styles/text.style';
import styles from '../../styles/screens/application/FindRestaurantScreen.style';

class FindRestaurant extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSearching: false,
            restaurants: []
        }
        this.loaded = false;
        this.onChangeTextDelayed = _.throttle(this.onChangeText, 2000);
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
            renderedElement = (
                this.state.restaurants.map((restaurant, i) => {
                    return (
                        <ListItem key={i}
                            leftIcon={<View style={{ paddingRight: 10 }}><Image style={{width: 35, height: 35, borderRadius: 17.5}} source={{uri: 'data:image/png;base64,' + restaurant.image.base64}}/></View>}
                            onPress={() => this.props.navigation.navigate('Restaurant', {
                                restaurant_id: restaurant.restaurant_id,
                                restaurant_info: { ...restaurant }
                            })}
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

export default FindRestaurant;