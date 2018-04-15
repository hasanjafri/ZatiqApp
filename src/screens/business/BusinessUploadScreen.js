import React from 'react';
import { View, Text, KeyboardAvoidingView, ScrollView, Image } from 'react-native';
import { Icon, Button, List, ListItem } from 'react-native-elements';
import { ImagePicker } from 'expo';

import AddFoodItemOverlay from '../../components/addFoodItem/AddFoodItemOverlay';
import styles from '../../styles/screens/business/Pages.style';
import textStyles from '../../styles/text.style';
import colors from '../../styles/colors.style';

import BusinessAction from '../../actions/BusinessAction';
const BusinessInstance = BusinessAction.getInstance();

class BusinessUploadScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuPictures: [],
            pictures: [],
            foodItems: [],
            showAddFoodOverlay: false
        };
        this.showAddFoodOverlay = this.showAddFoodOverlay.bind(this);
    }

    async componentDidMount() {
        const all = await BusinessInstance.getUploadList();
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
            const newPictures = type === 'menuPictures' ? this.state.menuPictures : this.state.pictures;
            const picture = {
                ratio: (result.width / result.height).toString(),
                base64: result.base64
            };
            const res = await BusinessInstance.uploadPicture({ type, picture });
            if (res.success) {
                console.log(res);
                picture.imageId = res.data.image_id;
                newPictures.push(picture);
                if (type === 'menuPictures') {
                    this.setState({ menuPictures: newPictures });
                } else {
                    this.setState({ pictures: newPictures });
                }
            } else {
                alert(res.message);
            }
        }
    }
    saveFoodItem = item => {
        this.state.foodItems.push(item);
        this.setState({
            showAddFoodOverlay: false,
            foodItems: this.state.foodItems
        });
    }
    deleteRow = async (type, index, picture) => {
        if (type === 'menuPictures') {
            const result = await BusinessInstance.deletePicture({ type, imageId: picture.imageId });
            if (result.success) {
                this.state.menuPictures.splice(index, 1)
                this.setState({ menuPictures: this.state.menuPictures });
            } else {
                alert(result.message);
            }
        } else if (type === 'restaurantPictures') {
            const result = await BusinessInstance.deletePicture({ type, imageId: picture.imageId });
            if (result.success) {
                this.state.pictures.splice(index, 1);
                this.setState({ pictures: this.state.pictures });
            } else {
                alert(result.message);
            }
        } else {
            this.state.foodItems.splice(index, 1);
            this.setState({ foodItems: this.state.foodItems });
        }
    }
    render() {
        const { menuPictures, pictures } = this.state;
        const menuItems = menuPictures.map((item, i) => {
            const image = 'data:image/png;base64,' + item.base64;
            return (
                <ListItem key={i}
                    leftIcon={<View style={{ paddingRight: 10 }}><Image style={{width: 35, height: 35, borderRadius: 17.5}} source={{uri: image}}/></View>}
                    rightIcon={<Icon name='clear' onPress={() => this.deleteRow('menuPictures', i, item)}/>}
                    title={`Menu picture page ${i}`} />
            )
        });
        const pictureItems = pictures.map((item, i) => {
            const image = 'data:image/png;base64,' + item.base64;
            return (
                <ListItem key={i}
                    leftIcon={<View style={{ paddingRight: 10 }}><Image style={{width: 35, height: 35, borderRadius: 17.5}} source={{uri: image}}/></View>}
                    rightIcon={<Icon name='clear' onPress={() => this.deleteRow('restaurantPictures', i, item)}/>}
                    title={`Picture page ${i}`} />
            )
        });
        const foodItems = this.state.foodItems.map((item, i) => {
            const image = 'data:image/png;base64,' + item.picture.base64;
            return (
                <ListItem key={i}
                    leftIcon={<View style={{ paddingRight: 10 }}><Image style={{width: 35, height: 35, borderRadius: 17.5}} source={{uri: image}}/></View>}
                    subtitle={item.description}
                    title={item.name} />
            );
        });
        return (
            <React.Fragment>
                <ScrollView style={styles.listContainer}>
                    <Text style={[textStyles.large, { color: colors.gray, textAlign: 'left', paddingTop: 20 }]}>Upload Menu Pictures</Text>
                    { menuItems.length > 0 ? 
                        <List>{menuItems}</List> : null }
                    <Button title='Add'
                        icon={<Icon type='font-awesome' name='plus' color='white' size={20} />}
                        titleStyle={[textStyles.medium, { height: 50 }]}
                        buttonStyle={styles.uploadButton}
                        onPress={() => this.uploadMenu('menuPictures')}/>

                    <Text style={[textStyles.large, { color: colors.gray, textAlign: 'left' }]}>Upload Restaurant Interior Pictures</Text>
                    { pictureItems.length > 0 ?
                        <List>{pictureItems}</List> : null }
                    <Button title='Add'
                        icon={<Icon type='font-awesome' name='plus' color='white' size={20} />}
                        titleStyle={[textStyles.medium, { height: 50 }]}
                        buttonStyle={styles.uploadButton}
                        onPress={() => this.uploadMenu('restaurantPictures')}/>

                    <Text style={[textStyles.large, { color: colors.gray, textAlign: 'left' }]}>Add Food Items</Text>
                    { foodItems.length > 0 ? 
                        <List>{foodItems}</List> : null }
                    
                    <Button title='Add'
                        icon={<Icon type='font-awesome' name='plus' color='white' size={20} />}
                        titleStyle={[textStyles.medium, { height: 50 }]}
                        buttonStyle={styles.uploadButton}
                        onPress={() => this.showAddFoodOverlay()}/>
                </ScrollView>
                <AddFoodItemOverlay showOverlay={this.state.showAddFoodOverlay}
                    saveItem={this.saveFoodItem}
                    onClose={() => this.setState({ showAddFoodOverlay: false })}/>
            </React.Fragment>
        );
    }
}

export default BusinessUploadScreen;