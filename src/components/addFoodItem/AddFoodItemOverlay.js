import React from 'react';
import { Text, View, ScrollView, Dimensions } from 'react-native';
import { Overlay, Input, SearchBar, Icon, Button, ButtonGroup, Avatar, ListItem } from 'react-native-elements';
import { ImagePicker } from 'expo';

import lists from './foodItems';
import textStyles from '../../styles/text.style';
import colors from '../../styles/colors.style';
import styles from '../../styles/screens/business/Pages.style';

import BusinessAction from '../../actions/BusinessAction';
const BusinessInstance = BusinessAction.getInstance();

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class AddFoodItemOverlay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            image: null
        };

        this.resetForm();
        this.setOverviewRef = this.setOverviewRef.bind(this);
        this.setNameRef = this.setNameRef.bind(this);
        this.setPriceRef = this.setPriceRef.bind(this);
    }
    resetForm() {
        this.item_name = '';
        this.overview = '';
        this.item_price = '';
        this.meal_type = [0];
        this.tags = {
            is_beverage: false,
            burger: false,
            canadian : false,
            caribbean : false,
            cheap : false,
            chinese : false,
            dessert : false,
            fast_food : false,
            fine_food : false,
            gluten_free : false,
            greek : false,
            halal : false,
            has_nuts : false,
            healthy : false,
            indian : false,
            italian : false,
            japanese : false,
            korean : false,
            kosher : false,
            lactose_free : false,
            mexican : false,
            middle_eastern : false,
            pizza : false,
            snack : false,
            spicy : false,
            sushi : false,
            thai : false,
            vegan : false,
            vegetarian : false,
            vietnamese : false
        };
        this.meat = {
            bacon: false,
            bear: false,
            beef: false,
            buffalo: false,
            calf: false,
            caribou: false,
            chicken: false,
            duck: false,
            goat: false,
            goose: false,
            ham: false,
            hen: false,
            horse: false,
            kangaroo: false,
            lamb: false,
            moose: false,
            mutton: false,
            opossum: false,
            ostrich: false,
            pork: false,
            quail: false,
            rabbit: false,
            snake: false,
            squirrel: false,
            turkey: false,
            turtle: false,
            veal: false
        };
        this.seafood = {
            alaska_pollack: false,
            catfish: false,
            clam: false,
            cod: false,
            crab: false,
            eel: false,
            lobster: false,
            pangasius: false,
            pike: false,
            salmon: false,
            shark: false,
            shrimp: false,
            tilapia: false,
            trout: false,
            tuna: false
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedFoodItem) {
            const { image, item_name, overview, item_price, meal_type, tags, seafood, meat, food_item_id } = nextProps.selectedFoodItem;
            this.tags = tags;
            this.seafood = seafood;
            this.meat = meat;
            this.item_name = item_name;
            this.overview = overview;
            this.item_price = item_price;
            const meal_indexes = [];
            if (meal_type.breakfast) {
                meal_indexes.push(0);
            }
            if (meal_type.brunch) {
                meal_indexes.push(1);
            }
            if (meal_type.lunch) {
                meal_indexes.push(2);
            }
            if (meal_type.dinner) {
                meal_indexes.push(3);
            }
            this.meal_type = meal_indexes;
            this.setState({ image, food_item_id });
        } else {
            this.resetForm();
            this.setState({ image: null, food_item_id: null });
        }
    }
    uploadPicture = async (type) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            // allowsEditing: true,
            aspect: [4, 3],
            base64: true,
            quality: 0.5
        });

        if (!result.cancelled) {
            this.setState({ image: {
                image_aspect_ratio: (result.width / result.height).toString(),
                base64: result.base64
            }});
        }
    }
    onSubmitEditing = type => {
        if (type === 'item_name') {
            if (this.overview_input) {
                this.overview_input.focus();
            }
        } else if (type === 'overview') {
            if (this.item_price_input) {
                this.item_price_input.focus();
            }
        }
    }
    toggleItem = (type, value, status) => {
        this[type][value] = status;
    }
    saveFoodItem = async () => {
        // Validation
        let message;
        if (!this.item_name) {
            message = 'Please enter a name.';
        } else if (!this.item_price) {
            message = 'Please enter a price.';
        } else if (!this.state.image || !this.state.image.base64) {
            message = 'Please add an image.';
        }
        if (message) {
            return alert(message);
        } else {
            const { image, food_item_id  } = this.state;
            const meal_indexes = {
                breakfast: Boolean(this.meal_type.indexOf(0)),
                brunch: Boolean(this.meal_type.indexOf(1)),
                lunch: Boolean(this.meal_type.indexOf(2)),
                dinner: Boolean(this.meal_type.indexOf(3))
            };
            const form = {
                image,
                item_name: this.item_name,
                overview: this.overview,
                item_price: this.item_price,
                meal_type: meal_indexes,
                tags: this.tags,
                meat: this.meat,
                seafood: this.seafood,
            };
            let type = 'create';
            if (food_item_id) {
                type = 'edit';
                form.food_item_id = food_item_id;
            }
            this.setState({ isLoading: true });
            const result = await BusinessInstance.saveFoodItem({ form, type });
            this.setState({ isLoading: false });
            if (result.success) {
                form.food_item_id = type === 'edit' ? result.data.food_item_id : result.data.response.food_item_id;
                this.props.saveFoodItem({ form, type });
            } else {
                alert(result.message);
            }
        }
    }
    setOverviewRef(input) {
        this.overview_input = input;
    }
    setNameRef(input) {
        this.item_name_input = input;
    }
    setPriceRef(input) {
        this.item_price_input = input;
    }
    render() {
        if (!this.props.showOverlay) {
            return null;
        }
        const image = this.state.image ? `data:image/png;base64,${this.state.image.base64}` : null;
        const tagItems = lists.tags.map((tag, i) => {
            const { text, value } = tag;
            const isActive = this.tags[value];
            return (
                <FoodItem key={i}
                    text={text}
                    value={value}
                    stateName={'tags'}
                    isChecked={isActive}
                    toggleItem={this.toggleItem} />
            );
        });
        const meatItems = lists.meat.map((meat, i) => {
            const { text, value } = meat;
            const isActive = this.meat[value];
            return (
                <FoodItem key={i}
                    text={text}
                    value={value}
                    stateName={'meat'}
                    isChecked={isActive}
                    toggleItem={this.toggleItem} />
            );
        });
        const seafoodItems = lists.seafood.map((seafood, i) => {
            const { text, value } = seafood;
            const isActive = this.seafood[value];
            return (
                <FoodItem key={i}
                    text={text}
                    value={value}
                    stateName={'seafood'}
                    isChecked={isActive}
                    toggleItem={this.toggleItem} />
            );
        });
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
                    <InputHandler type='item_name'
                        setRef={this.setNameRef}
                        value={this.item_name}
                        onSubmitEditing={(type) => this.onSubmitEditing(type)}
                        changeText={text => this.item_name = text} />

                    <Text style={[textStyles.tiny, styles.headerText]}>Food Description</Text>
                    <InputHandler type='overview'
                        setRef={this.setOverviewRef}
                        value={this.overview}
                        onSubmitEditing={(type) => this.onSubmitEditing(type)}
                        changeText={text => this.overview = text} />

                    <Text style={[textStyles.tiny, styles.headerText]}>Food Price</Text>
                    <InputHandler type='item_price'
                        setRef={this.setPriceRef}
                        value={this.item_price}
                        onSubmitEditing={(type) => this.onSubmitEditing(type)}
                        changeText={text => this.item_price = text} />
              
                    <Text style={[textStyles.tiny, styles.headerText, { marginTop: 30 }]}>Meal</Text>
                    <ButtonGroupHandler onPress={selectedIndexes => this.meal_type = selectedIndexes} meal_type={this.meal_type} />

                    <Text style={[textStyles.tiny, styles.headerText, { marginTop: 30 }]}>Select All That Applies</Text>
                    <Text style={[textStyles.tiny, styles.headerText]}>Tags</Text>
                    { tagItems }
                    <Text style={[textStyles.tiny, styles.headerText, { marginTop: 30 }]}>Meat Type</Text>
                    { meatItems }
                    <Text style={[textStyles.tiny, styles.headerText, { marginTop: 30 }]}>Seafood Type</Text>
                    { seafoodItems }
                    <View style={styles.centered}>
                        <Button title='Save'
                        loading={this.state.isLoading}
                        titleStyle={[textStyles.medium, { height: 50 }]}
                        buttonStyle={[styles.uploadButton, { marginTop: 40 }]}
                        loading={this.state.isLoading}
                        onPress={() => this.saveFoodItem()} />
                    </View>
                </ScrollView>
            </Overlay>
        );
    }
}

class ButtonGroupHandler extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            meal_type: props.meal_type
        };
    }
    onPress(selectedIndexes) {
        this.setState({ meal_type: selectedIndexes });
        this.props.onPress(selectedIndexes);
    }
    render() {
        return (
            <ButtonGroup selectMultiple
                onPress={selectedIndexes => this.onPress(selectedIndexes)}
                selectedIndexes={this.state.meal_type}
                buttons={['Breakfast', 'Brunch', 'Lunch', 'Dinner']}
                containerStyle={{ height: 35 }} />
        );
    }
}

class InputHandler extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: props.value
        }
    }
    changeText(text) {
        this.setState({ input: text });
        this.props.changeText(text);
    }
    onSubmitEditing() {
        this.props.onSubmitEditing(this.props.type);
    }
    render() {
        const { type, setRef } = this.props;
        return (
            <Input ref={setRef} value={this.state.input}
                style={styles.input}
                keyboardType={type === 'item_price' ? 'numeric' : 'default'}
                onSubmitEditing={() => this.onSubmitEditing()}
                returnKeyLabel={'Next'}
                returnKeyType={'next'}
                blurOnSubmit={type === 'item_price'}
                onChangeText={text => this.changeText(text)} />
        )
    }
}
class FoodItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: props.isChecked
        };
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            checked: nextProps.isChecked
        })
    }
    toggleItem() {
        this.setState({ checked: !this.state.checked });
        this.props.toggleItem(this.props.stateName, this.props.value, !this.state.checked);
    }
    render() {
        return (
            <ListItem rightIcon={
                    this.state.checked ?
                    <Icon containerStyle={{ marginRight: 5 }} color={colors.blue} type='font-awesome' name='check-circle' /> :
                    <Icon containerStyle={{ marginRight: 5 }} color={colors.gray} type='font-awesome' name='circle-thin' />
                }
                titleStyle={{ fontFamily: 'nunito' }}
                onPress={() => this.toggleItem()}
                title={this.props.text}
            />
        )
    }
}

export default AddFoodItemOverlay;