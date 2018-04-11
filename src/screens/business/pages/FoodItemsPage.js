import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { Icon, Button, List, ListItem } from 'react-native-elements';

import AddFoodItemOverlay from '../../../components/addFoodItem/AddFoodItemOverlay';
import colors from '../../../styles/colors.style';
import styles from '../../../styles/screens/business/Pages.style';
import textStyles from '../../../styles/text.style';

class FoodItemsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            foodItems: [],
            showAddFoodOverlay: false
        };
        this.showAddFoodOverlay = this.showAddFoodOverlay.bind(this);
    }
    showAddFoodOverlay() {
        this.setState({ showAddFoodOverlay: true });
    }
    deleteRow = (type, index) => {
        this.state.foodItems.splice(index, 1);
        this.setState({ foodItems: this.state.foodItems });
    }
    saveItem = item => {
        this.state.foodItems.push(item);
        this.setState({
            showAddFoodOverlay: false,
            foodItems: this.state.foodItems
        });
    }
    render() {
        const foodItems = this.state.foodItems.map((item, i) => {
            const image = 'data:image/png;base64,' + item.picture.base64;
            return (
                <ListItem key={i}
                    leftIcon={<View style={{ paddingRight: 10 }}><Image style={{width: 35, height: 35, borderRadius: 17.5}} source={{uri: image}}/></View>}
                    title={item.name} />
            );
        });
        return (
            <React.Fragment>
                <ScrollView style={styles.listContainer}>
                    <Text style={[textStyles.large, { color: colors.gray, textAlign: 'left', paddingTop: 20 }]}>Upload Menu</Text>
                    { foodItems.length > 0 ? 
                        <List>{foodItems}</List> : null }
                    
                    <Button title='Upload'
                        icon={<Icon type='font-awesome' name='plus' color='white' size={20} />}
                        titleStyle={[textStyles.medium, { height: 50 }]}
                        buttonStyle={styles.uploadButton}
                        onPress={() => this.showAddFoodOverlay()}/>
                </ScrollView>
                <AddFoodItemOverlay showOverlay={this.state.showAddFoodOverlay}
                    saveItem={this.saveItem}
                    onClose={() => this.setState({ showAddFoodOverlay: false })}/>
            </React.Fragment>
        );
    }
}

export default FoodItemsPage;