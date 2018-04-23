import React from 'react';
import { View, Text, Platform, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { SearchBar, List, ListItem } from 'react-native-elements';
import GridView from 'react-native-super-grid';
import Loader from '../../components/Loader';

// Custom imports
import { foodGrid } from '../../actions/UserAction';
import textStyles from '../../styles/text.style';

class FindFood extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            foodItems: []
        };
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
    _renderFoodItem(item) {
        const image = `data:image/png;base64,${item.image.base64}`
        return (
            <TouchableOpacity activeOpacity={0.5} onPress={() => this.props.navigation.navigate('Restaurant', {
                restaurant_id: item.restaurant_id,
                restaurant_info: item.restaurant_info
            })}>
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
                    <GridView itemDimension={130}
                        items={this.state.foodItems}
                        renderItem={this._renderFoodItem}
                        style={{}}/>
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

export default FindFood;