import React from 'react';
import { connect } from 'react-redux';
import { changeDrawerItem } from '../../redux/actions/drawer.action';

import { View, Text, Platform, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { SearchBar, List, ListItem } from 'react-native-elements';
import GridView from 'react-native-super-grid';
import Loader from '../../components/Loader';

// Custom imports
import { foodGrid, foodGridSearchName } from '../../actions/UserAction';
import textStyles from '../../styles/text.style';

import _ from 'lodash';

class FindFood extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isSearching: false,
            foodItems: []
        };
        this.loaded = false;
        this.onChangeTextDelayed = _.throttle(this.onChangeText, 1000);
        this._renderFoodItem = this._renderFoodItem.bind(this);
    }
    async componentDidMount() {
        const result = await foodGrid();
        if (result.success) {
            this.setState({ isLoading: false, foodItems: result.data });
        } else {
            this.setState({ isLoading: false, foodItems: [] });
            alert(result.message);
        }
    }
    onChangeText = async (text) => {
        if (text !== '' && text.length >= 2) {
            this.setState({ isSearching: true });
            const result = await foodGridSearchName(text);
            this.loaded = true;
            if (result.success) {
                this.setState({ isSearching: false, foodItems: result.data });
            } else {
                this.setState({ isSearching: false, foodItems: [] });
            }
        } else {
            const result = await foodGrid();
            if (result.success) {
                this.setState({ isLoading: false, foodItems: result.data });
            } else {
                this.setState({ isLoading: false, foodItems: [] });
                alert(result.message);
            }
        }
    }
    _renderFoodItem(item) {
        const image = item.image.base64;
        return (
            <TouchableOpacity activeOpacity={0.5} onPress={() => {
                    this.props.changeDrawerItem('Home');
                    item.hasNavigate = true;
                    item.navigateTo = this.props.navigation.navigate;
                    this.props.navigation.navigate('Picture', {
                        type: 'Suggestion',
                        data: [item]
                    })
                }}>
                <View style={styles.item}>
                    <Image style={{ height: '100%', width: '100%', alignItems: 'center' }} resizeMode="contain" source={{uri: image}} />
                </View>
            </TouchableOpacity>
        )
    }
    render() {
        return (
            <React.Fragment>
                <ScrollView style={styles.view}>
                    <SearchBar lightTheme
                        platform={Platform.OS}  
                        showLoading={this.state.isSearching}
                        onChangeText={this.onChangeTextDelayed}
                        placeholder='Search Food'/>
                    { this.loaded && this.state.foodItems.length === 0 ?
                        <Text style={[textStyles.medium, { marginTop: 30, color: 'black', paddingHorizontal: 20  }]}>No food items found with that name.</Text> :
                        <GridView itemDimension={130}
                            items={this.state.foodItems}
                            renderItem={this._renderFoodItem}
                            style={{}}/>
                    }
                </ScrollView>
                <Loader show={this.state.isLoading} clear />
            </React.Fragment>
        );
    }
};

const styles = StyleSheet.create({
    view: {
        flex: 1,
        height: '100%',
        width: '100%'
    },
    item: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 150,
        backgroundColor: 'rgba(127, 140, 141, 0.3)'
    }
});

export default connect(null, { changeDrawerItem })(FindFood);