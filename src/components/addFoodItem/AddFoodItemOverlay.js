import React from 'react';
import { Text, View, ScrollView, TextInput, Dimensions } from 'react-native';
import { Overlay, Input, SearchBar, Icon, Button, ButtonGroup, Avatar } from 'react-native-elements';
import { ImagePicker } from 'expo';

import CustomMultiPicker from '../../components/Suggestion';
import categoryList from '../../data/categoryList';
import textStyles from '../../styles/text.style';
import colors from '../../styles/colors.style';
import styles from '../../styles/screens/business/Pages.style';

class AddFoodItemOverlay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            picture: null,
            name: '',
            foodType: 0,
            features: {}
        };
    }
    _renderFeature = feature => {
        const { text, value } = feature;
        const isActive = this.state.features[value];
        return (
            <View style={styles.feature}>
                { isActive ?
                    <Icon onPress={() => this.toggleFeature(value)} size={35} color={colors.blue} type='font-awesome' name='check-circle'/> :
                    <Icon onPress={() => this.toggleFeature(value)} size={35} color={colors.lightgrey} type='font-awesome' name='circle-thin'/>
                }
                <Text style={[textStyles.medium, { color: 'black', textAlign: 'left', marginLeft: 20, lineHeight: 40, height: 40 }]}>{text}</Text>
            </View>
        );
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
                aspectRatio: result.width / result.height,
                base64: result.base64
            }});
        }
    }
    render() {
        const width = Dimensions.get('window').width;
        const height = Dimensions.get('window').height;
        const image = this.state.picture ? `data:image/png;base64,${this.state.picture.base64}` : null;
        return (
            <Overlay isVisible={this.props.showOverlay}
                width={width - 20}
                height={height - 150}
                overlayStyle={styles.overlayContainer}>
                <ScrollView style={styles.wrapper}>
                    <View style={styles.header}>
                        <Text style={[textStyles.large, {color: 'black', fontWeight: 'bold', textAlign: 'left' }]}>Add A Food Item</Text>
                        <Icon size={30} containerStyle={{ position: 'absolute', top: 5, right: 5}} name='clear' onPress={this.props.onClose} />
                    </View>
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
                    <Text style={[textStyles.tiny, styles.headerText, { marginBottom: 10 }]}>Food Name</Text>
                    <Input onChangeText={text => this.setState({ name: text })}/>

                    <Text style={[textStyles.tiny, styles.headerText, { marginBottom: 10 }]}>Food Description</Text>
                    <Input />

                    <Text style={[textStyles.tiny, styles.headerText, { marginBottom: 10 }]}>Food Price</Text>
                    <Input />

                    <Text style={[textStyles.tiny, styles.headerText, { marginBottom: 10 }]}>Meal</Text>
                    <ButtonGroup
                        onPress={selectedIndex => this.setState({ foodType: selectedIndex })}
                        selectedIndex={this.state.foodType}
                        buttons={['Breakfast', 'Lunch', 'Dinner']}
                        containerStyle={{ height: 35 }} />
                    
                    <Text style={[textStyles.tiny, styles.headerText, { marginBottom: 10 }]}>Cuisines</Text>
                    <CustomMultiPicker
                        options={categoryList}
                        search
                        multiple
                        placeholder={'Enter cuisine...'}
                        placeholderTextColor={'#757575'}
                        returnValue={'label'}
                        callback={(res) => { this.setState({ cuisines: res }) }}
                        rowBackgroundColor={'#eee'}
                        rowHeight={40}
                        rowRadius={5}
                        iconColor={'#00a2dd'}
                        iconSize={30}
                        selectedIconName={'ios-checkmark-circle-outline'}
                        scrollViewHeight={140}
                        // selected={[1,2]}
                        />

                    <Text style={[textStyles.tiny, styles.headerText, { marginBottom: 10 }]}>Select All That Applies</Text>
                    { this._renderFeature({ text: 'Spicy', value: 'delivery'}) }
                    { this._renderFeature({ text: 'Halal', value: 'delivery'}) }
                    { this._renderFeature({ text: 'Dessert', value: 'takeout'}) }
                    { this._renderFeature({ text: 'Vegan Friendly', value: 'reservation'}) }
                    { this._renderFeature({ text: 'Beverage', value: 'patio'}) }
                    { this._renderFeature({ text: 'Contains Lactose', value: 'wheelChair'}) }
                    { this._renderFeature({ text: 'Contains Nuts', value: 'wheelChair'}) }
                    { this._renderFeature({ text: 'Contains Pork', value: 'wheelChair'}) }
                    { this._renderFeature({ text: 'Contains Seafood', value: 'wheelChair'}) }
                    <Button title='Save'
                        icon={<Icon type='font-awesome' name='plus' color='white' size={20} />}
                        titleStyle={[textStyles.medium, { height: 50 }]}
                        buttonStyle={styles.uploadButton}
                        onPress={() => this.props.saveItem(this.state)} />
                </ScrollView>
            </Overlay>
        );
    }
}

export default AddFoodItemOverlay;