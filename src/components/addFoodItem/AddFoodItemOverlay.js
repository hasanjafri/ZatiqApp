import React from 'react';
import { Text, View, ScrollView, TextInput, Dimensions } from 'react-native';
import { Overlay, Input, SearchBar, Icon, Button, ButtonGroup, Avatar, List, ListItem } from 'react-native-elements';
import { ImagePicker } from 'expo';

import CustomMultiPicker from '../../components/Suggestion';
import categoryList from '../../data/categoryList';
import textStyles from '../../styles/text.style';
import colors from '../../styles/colors.style';
import styles from '../../styles/screens/business/Pages.style';

import BusinessAction from '../../actions/BusinessAction';
const BusinessInstance = BusinessAction.getInstance();

class AddFoodItemOverlay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            picture: null,
            name: '',
            description: '',
            price: '',
            meal: 'breakfast',
            features: {
                spicy: false,
                halal: false,
                vegan: false,
                lactose: false,
                nuts: false,
                pork: false,
                seafood: false
            }
        };
        this.mapIndexToMeal = {
            0: 'breakfast',
            1: 'lunch',
            2: 'dinner'
        };
        this.mapMealToIndex = {
            breakfast: 0,
            lunch: 1,
            dinner: 2
        };
        this.features = [
            { text: 'Spicy', value: 'spicy'},
            { text: 'Halal', value: 'halal'},
            { text: 'Vegan Friendly', value: 'vegan'},
            { text: 'Contains Lactose', value: 'lactose'},
            { text: 'Contains Nuts', value: 'nuts'},
            { text: 'Contains Pork', value: 'pork'},
            { text: 'Contains Seafood', value: 'seafood'}
        ];
    }
    uploadPicture = async (type) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            base64: true,
            quality: 0.5
        });

        if (!result.cancelled) {
            this.setState({ picture: {
                ratio: result.width / result.height,
                base64: result.base64
            }});
        }
    }
    toggleFeature = value => {
        const { features } = this.state;
        const newFeatures = { ...features };
        newFeatures[value] = !features[value];
        this.setState({ features: newFeatures });
    }
    saveItem = () => {
        this.setState({ isLoading: true });
        this.setState({ isLoading: false });
        this.props.saveItem(this.state);
    }
    render() {
        const width = Dimensions.get('window').width;
        const height = Dimensions.get('window').height;
        const image = this.state.picture ? `data:image/png;base64,${this.state.picture.base64}` : null;
        return (
            <Overlay isVisible={this.props.showOverlay}
                width={width - 20}
                height={height - 100}
                containerStyle={{ padding: 0 }}
                overlayStyle={styles.overlayContainer}>
                <View style={styles.header}>
                    <Text style={[textStyles.large, {color: 'black', fontWeight: 'normal', textAlign: 'left' }]}>Add Food Item</Text>
                    <Icon size={30} containerStyle={{ position: 'absolute', right: 0 }} name='clear' onPress={this.props.onClose} />
                </View>
                <ScrollView style={styles.wrapper}>
                    <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 20 }}>
                        { image ?
                            <Avatar xlarge rounded
                                source={{ uri: image }}
                                onPress={() => this.uploadPicture()}
                                activeOpacity={0.7} /> :
                            <Avatar xlarge rounded
                                icon={{ name: 'restaurant' }}
                                onPress={() => this.uploadPicture()}
                                activeOpacity={0.7} />
                        }
                    </View>
                    <Text style={[textStyles.tiny, styles.headerText]}>Food Name</Text>
                    <Input onChangeText={text => this.setState({ name: text })}/>

                    <Text style={[textStyles.tiny, styles.headerText]}>Food Description</Text>
                    <Input multiline numberOfLines={4} onChangeText={text => this.setState({ description: text })} />

                    <Text style={[textStyles.tiny, styles.headerText]}>Food Price</Text>
                    <Input keyboardType={'numeric'} onChangeText={text => this.setState({ price: text })} />

                    <Text style={[textStyles.tiny, styles.headerText, { marginTop: 30, marginBottom: 10 }]}>Cuisine Types</Text>
                    <CustomMultiPicker
                        options={categoryList}
                        search
                        multiple
                        placeholder={'Enter cuisine...'}
                        placeholderTextColor={'#757575'}
                        returnValue={'label'}
                        callback={cuisines => { this.setState({ cuisines }) }}
                         // selected={[1,2]}
                        rowBackgroundColor={'#eee'}
                        rowHeight={40}
                        rowRadius={5}
                        iconColor={'#00a2dd'}
                        iconSize={30}
                        selectedIconName={'ios-checkmark-circle-outline'}
                        scrollViewHeight={140} />

                    <Text style={[textStyles.tiny, styles.headerText, { marginTop: 30 }]}>Meal</Text>
                    <ButtonGroup
                        onPress={selectedIndex => this.setState({ meal: this.mapIndexToMeal[selectedIndex] })}
                        selectedIndex={this.mapMealToIndex[this.state.meal]}
                        buttons={['Breakfast', 'Lunch', 'Dinner']}
                        containerStyle={{ height: 35 }} />

                    <Text style={[textStyles.tiny, styles.headerText, { marginTop: 30 }]}>Select All That Applies</Text>
                    <List>
                        { this.features.map((feature, i) => {
                            const { text, value } = feature;
                            const isActive = this.state.features[value];
                            return (
                                <ListItem key={i}
                                    rightIcon={
                                        isActive ?
                                        <Icon containerStyle={{ marginRight: 5 }} color={colors.blue} type='font-awesome' name='check-circle' /> :
                                        <Icon containerStyle={{ marginRight: 5 }} color={colors.gray} type='font-awesome' name='circle-thin' />
                                    }
                                    titleStyle={{ fontFamily: 'nunito' }}
                                    onPress={() => this.toggleFeature(value)}
                                    title={text}
                                />
                            );
                        })}
                    </List>
                    <Button title='Save'
                        loading={this.state.isLoading}
                        titleStyle={[textStyles.medium, { height: 50 }]}
                        buttonStyle={[styles.uploadButton, { marginTop: 40 }]}
                        loading={this.state.isLoading}
                        onPress={() => this.saveItem()} />
                </ScrollView>
            </Overlay>
        );
    }
}

export default AddFoodItemOverlay;