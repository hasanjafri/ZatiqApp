import React from 'react';
import { View, Text, KeyboardAvoidingView, ScrollView, Image } from 'react-native';
import { Icon, Button, ListItem } from 'react-native-elements';
import { ImagePicker } from 'expo';

import Loader from '../../components/Loader';
import AddFoodItemOverlay from '../../components/addFoodItem/AddFoodItemOverlay';
import styles from '../../styles/screens/business/Pages.style';
import textStyles from '../../styles/text.style';
import colors from '../../styles/colors.style';

import BusinessAction from '../../actions/BusinessAction';
import appState from '../../appState';
const BusinessInstance = BusinessAction.getInstance();
const state = appState.getInstance();

class BusinessUploadScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: !props.registration,
            menuPictures: [],
            restaurantPictures: [],
            foodItems: [],
            selectedFoodItem: null,
            showAddFoodOverlay: false
        };
        this.showAddFoodOverlay = this.showAddFoodOverlay.bind(this);
    }

    async componentDidMount() {
        if (!this.props.registration) {
            const result = await BusinessInstance.getUploadList();
            if (result.success) {
                this.setState({
                    menuPictures: result.data.menuPictures,
                    restaurantPictures: result.data.restaurantPictures,
                    foodItems: result.data.foodItems,
                    isLoading: false
                })
            } else {
                this.setState({ isLoading: false });
                alert(result.message);
            }
        }
    }

    showAddFoodOverlay() {
        this.setState({ showAddFoodOverlay: true });
    }

    uploadMenu = async (type) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            base64: true,
            quality: 0.5
        });

        if (!result.cancelled) {
            this.setState({ isLoading: true });
            const newImages = this.state[type];
            const image = {
                image_aspect_ratio: (result.width / result.height).toString(),
                base64: result.base64
            };
            const res = await BusinessInstance.uploadPicture({ type, image });
            if (res.success) {
                newImages.push({ image, image_id: res.data.image_id });
                this.setState({ [type]: newImages, isLoading: false });
            } else {
                this.setState({ isLoading: false });
                alert(res.message);
            }
        }
    }
    saveFoodItem = ({ form, type }) => {
        if (type === 'create') {
            this.state.foodItems.push(form);
        } else {
            const index = this.state.foodItems.findIndex(item => item.food_item_id === form.food_item_id);
            this.state.foodItems.splice(index, 1, form);
        }
        
        this.setState({
            showAddFoodOverlay: false,
            selectedFoodItem: null,
            foodItems: this.state.foodItems
        });
    }
    showFoodItem = (item) => {
        this.setState({
            selectedFoodItem: item,
            showAddFoodOverlay: true
        });
    }
    deleteRow = async ({ type, index, item }) => {
        this.setState({ isLoading: true });
        
        let result;
        if (type === 'menuPictures') {
            result = await BusinessInstance.deletePicture({ type, imageId: item.image_id });
        } else if (type === 'restaurantPictures') {
            result = await BusinessInstance.deletePicture({ type, imageId: item.image_id });
        } else {
            result = await BusinessInstance.deleteFoodItem({ food_item_id: item.food_item_id });
        }

        if (result.success) {
            this.state[type].splice(index, 1);
            this.setState({ [type]: this.state[type], isLoading: false });
        } else {
            this.setState({ isLoading: false });
            
            alert(result.message);
        }

    }
    render() {
        const { menuPictures, restaurantPictures } = this.state;
        const menuItems = menuPictures.map((item, i) => {
            const image = 'data:image/png;base64,' + item.image.base64;
            return (
                <ListItem key={i}
                    leftIcon={<View style={{ paddingRight: 10 }}><Image style={{width: 35, height: 35, borderRadius: 17.5}} source={{uri: image}}/></View>}
                    rightIcon={<Icon name='clear' onPress={() => this.deleteRow({ type: 'menuPictures', index: i, item })}/>}
                    title={`Menu picture page ${i}`} />
            )
        });
        const pictureItems = restaurantPictures.map((item, i) => {
            const image = 'data:image/png;base64,' + item.image.base64;
            return (
                <ListItem key={i}
                    leftIcon={<View style={{ paddingRight: 10 }}><Image style={{width: 35, height: 35, borderRadius: 17.5}} source={{uri: image}}/></View>}
                    rightIcon={<Icon name='clear' onPress={() => this.deleteRow({ type: 'restaurantPictures', index: i, item })}/>}
                    title={`Picture page ${i}`} />
            )
        });
        const foodItems = this.state.foodItems.map((item, i) => {
            const image = 'data:image/png;base64,' + item.image.base64;
            return (
                <ListItem key={i}
                    leftIcon={<View style={{ paddingRight: 10 }}><Image style={{width: 35, height: 35, borderRadius: 17.5}} source={{uri: image}}/></View>}
                    onPress={() => this.showFoodItem(item)}
                    rightIcon={<Icon name='clear' onPress={() => this.deleteRow({ type: 'foodItems', index: i, item })}/>}
                    subtitle={item.overview}
                    title={item.item_name} />
            );
        });
        return (
            this.props.registration || !this.state.isLoading ?
                <React.Fragment>
                    <ScrollView style={styles.listContainer}>
                        <Text style={[textStyles.large, { color: colors.gray, textAlign: 'left', paddingTop: 20 }]}>Upload Menu Pictures</Text>
                        { menuItems.length > 0 ? 
                            menuItems : null }
                        <View style={styles.centered}>
                            <Button title='Add'
                                icon={<Icon type='font-awesome' name='plus' color='white' size={20} />}
                                titleStyle={[textStyles.medium, { height: 50 }]}
                                buttonStyle={styles.uploadButton}
                                onPress={() => this.uploadMenu('menuPictures')}/>
                        </View>

                        <Text style={[textStyles.large, { color: colors.gray, textAlign: 'left' }]}>Upload Restaurant Interior Pictures</Text>
                        { pictureItems.length > 0 ?
                            pictureItems : null }
                        <View style={styles.centered}>
                            <Button title='Add'
                                icon={<Icon type='font-awesome' name='plus' color='white' size={20} />}
                                titleStyle={[textStyles.medium, { height: 50 }]}
                                buttonStyle={styles.uploadButton}
                                onPress={() => this.uploadMenu('restaurantPictures')}/>
                        </View>
                        

                        <Text style={[textStyles.large, { color: colors.gray, textAlign: 'left' }]}>Add Food Items</Text>
                        { foodItems.length > 0 ? 
                            foodItems : null }
                        <View style={styles.centered}>
                            <Button title='Add'
                                icon={<Icon type='font-awesome' name='plus' color='white' size={20} />}
                                titleStyle={[textStyles.medium, { height: 50 }]}
                                buttonStyle={styles.uploadButton}
                                onPress={() => this.showAddFoodOverlay()}/>
                        </View>
                    </ScrollView>
                    { this.state.showAddFoodOverlay ? 
                        <AddFoodItemOverlay showOverlay
                            saveFoodItem={this.saveFoodItem}
                            selectedFoodItem={this.state.selectedFoodItem}
                            onClose={() => this.setState({ showAddFoodOverlay: false, selectedFoodItem: null })}/> : null
                    }
                </React.Fragment> :
                <Loader show />
        );
    }
}

export default BusinessUploadScreen;