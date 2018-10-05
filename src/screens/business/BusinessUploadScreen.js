import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, Image } from 'react-native';
import { Icon, Button, ListItem } from 'react-native-elements';
import { ImagePicker, Permissions } from 'expo';

import { showFoodItemOverlay } from '../../redux/actions/general.action';
import Loader from '../../components/Loader';
import AddFoodItemOverlay from '../../components/addFoodItem/AddFoodItemOverlay';
import styles from '../../styles/screens/business/Pages.style';
import textStyles from '../../styles/text.style';
import colors from '../../styles/colors.style';

import BusinessAction from '../../actions/BusinessAction';
import appState from '../../appState';
const BusinessInstance = BusinessAction.getInstance();
const state = appState.getInstance();

class BusinessUploadScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: !props.registration,
            menuPictures: [],
            restaurantPictures: [],
            foodItems: []
        };
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
    
    render() {
        const { menuPictures, restaurantPictures, foodItems } = this.state;
        return (
            !this.state.isLoading ?
                <React.Fragment>
                    <ScrollView style={styles.listContainer}>
                        <FoodItemsContainer data={foodItems} navigation={this.props.navigation} />
                        <Pictures type={'menuPictures'} data={menuPictures} navigation={this.props.navigation} title="Upload restaurant menu pictures" />
                        <Pictures type={'restaurantPictures'} data={restaurantPictures} navigation={this.props.navigation} title="Upload restaurant interior pictures"/>
                    </ScrollView>
                    <AddFoodItemOverlay saveFoodItem={this.saveFoodItem} />
                </React.Fragment> :
                <Loader show clear />
        );
    }
}

class FoodItems extends Component {
    state = {
        foodItems: [],
        isLoading: false
    }
    componentWillMount() {
        this.setState({ foodItems: this.props.data });
    }
    deleteRow = async ({ type, index, item }) => {
        this.setState({ isLoading: true });
        
        const result = await BusinessInstance.deleteFoodItem({ food_item_id: item.food_item_id });

        if (result.success) {
            this.state.foodItems.splice(index, 1);
            this.setState({ foodItems: this.state.foodItems, isLoading: false });
        } else {
            this.setState({ isLoading: false });
            alert(result.message);
        }
    }
    componentWillReceiveProps(nextProps) {
        if (!this.props.savingFoodItem && nextProps.savingFoodItem) {
            const { type, form } = nextProps.savingFoodItem;
            if (type === 'create') {
                this.state.foodItems.push(form);
            } else {
                const index = this.state.foodItems.findIndex(item => item.food_item_id === form.food_item_id);
                this.state.foodItems.splice(index, 1, form);
            }
            if (this.props.registration) {
                this.props.navigation.setParams({ hasValue: true });
            }
            this.setState({ foodItems: this.state.foodItems });
        }
    }
    render() {
        const foodItems = this.state.foodItems.map((item, i) => {
            let image;
            if (item.image) {
                if (item.image.base64.includes('http')) {
                    image = item.image.base64;
                } else {
                    image = `data:image/png;base64,${item.image.base64}`;
                }
            }
            return (
                <ListItem key={i}
                    leftIcon={<View style={{ paddingRight: 10 }}><Image style={{width: 35, height: 35, borderRadius: 17.5}} source={{uri: image}}/></View>}
                    onPress={() => this.props.showFoodItemOverlay(item)}
                    rightIcon={<Icon name='clear' onPress={() => this.deleteRow({ type: 'foodItems', index: i, item })}/>}
                    subtitle={item.overview}
                    title={item.item_name} />
            );
        });
        return (
            <Fragment>
                <Text style={[textStyles.large, { color: colors.gray, textAlign: 'left', paddingTop: 20 }]}>Add food items</Text>
                { foodItems.length > 0 ? foodItems : null }
                <View style={styles.centered}>
                    <Button title='Add'
                        icon={<Icon type='font-awesome' name='plus' color='white' size={20} />}
                        titleStyle={[textStyles.medium, { height: 50 }]}
                        buttonStyle={styles.uploadButton}
                        loading={this.state.isLoading}
                        onPress={() => this.props.showFoodItemOverlay()}/>
                </View>
            </Fragment>
        );
    }
}
const mapStateToProps = (state) => ({
    savingFoodItem: state.generalReducer.savingFoodItem
});
const FoodItemsContainer = connect(mapStateToProps, { showFoodItemOverlay })(FoodItems);

class Pictures extends Component {
    state = {
        data: [],
        isLoading: false
    }
    componentWillMount() {
        this.setState({ data: this.props.data });
    }
    deleteRow = async ({ type, index, item }) => {
        result = await BusinessInstance.deletePicture({ type: this.props.type, imageId: item.image_id });
        if (result.success) {
            this.state.data.splice(index, 1);
            this.setState({ data: this.state.data, isLoading: false });
        } else {
            alert(result.message);
        }
    }
    uploadMenu = async (type) => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status === 'granted') {
            let result = await ImagePicker.launchImageLibraryAsync({
                // allowsEditing: true,
                aspect: [4, 3],
                base64: true,
                quality: 0.5
            });
    
            if (!result.cancelled) {
                this.setState({ isLoading: true });
                const newPictures = this.state.data;
                const image = {
                    image_aspect_ratio: (result.width / result.height).toString(),
                    base64: result.base64
                };
                const res = await BusinessInstance.uploadPicture({ type: this.props.type, image });
                if (res.success) {
                    newPictures.push({ image, image_id: res.data.image_id });
                    this.props.navigation.setParams({ hasValue: true });
                    this.setState({ data: newPictures, isLoading: false });
                } else {
                    alert(res.message);
                }
            }
        } else {
            throw new Error('Camera permission not granted');
        }
    }
    render() {
        const pictureItems = this.state.data ? this.state.data.map((item, i) => {
            let image;
            if (item.image) {
                if (item.image.base64.includes('http')) {
                    image = item.image.base64;
                } else {
                    image = `data:image/png;base64,${item.image.base64}`;
                }
            }
            return (
                <ListItem key={i}
                    leftIcon={<View style={{ paddingRight: 10 }}><Image style={{width: 35, height: 35, borderRadius: 17.5}} source={{uri: image}}/></View>}
                    rightIcon={<Icon name='clear' onPress={() => this.deleteRow({ type: 'restaurantPictures', index: i, item })}/>}
                    title={`${this.props.type === 'restaurantPictures' ? 'Picture' : 'Menu'} page ${i}`} />
            )
        }) : [];
        return (
            <Fragment>
                <Text numberOfLines={1} style={[textStyles.large, { color: colors.gray, textAlign: 'left' }]}>{this.props.title}</Text>
                { pictureItems.length > 0 ? pictureItems : null }
                <View style={styles.centered}>
                    <Button title='Add'
                        icon={<Icon type='font-awesome' name='plus' color='white' size={20} />}
                        titleStyle={[textStyles.medium, { height: 50 }]}
                        buttonStyle={styles.uploadButton}
                        loading={this.state.isLoading}
                        onPress={() => this.uploadMenu('restaurantPictures')}/>
                </View>
            </Fragment>
        );
    }
}

export default BusinessUploadScreen;
