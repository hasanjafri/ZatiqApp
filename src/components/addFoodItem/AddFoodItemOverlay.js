import React from 'react';
import { Text, View, ScrollView, TextInput, Dimensions } from 'react-native';
import { Overlay, Input, SearchBar, Icon, Button, ButtonGroup, Avatar, List, ListItem } from 'react-native-elements';
import { ImagePicker } from 'expo';

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
            image: null,
            item_name: '',
            overview: '',
            item_price: '',
            meal: [0, 1]
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
        this.tagsState = {
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
        this.meatState = {
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
        this.seafoodState = {
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
        this.tags = [
            { value: 'is_beverage', text: 'Beverage' },
            { value: 'burger', text: 'Burger' },
            { value: 'canadian', text: 'Canadian' },
            { value: 'caribbean', text: 'Caribbean' },
            { value: 'cheap', text: 'Cheap' },
            { value: 'chinese', text: 'Chinese' },
            { value: 'dessert', text: 'Dessert' },
            { value: 'fast_food', text: 'Fast Food' },
            { value: 'fine_food', text: 'Fine Food' },
            { value: 'gluten_free', text: 'Gluten Free' },
            { value: 'greek', text: 'Greek' },
            { value: 'halal', text: 'Halal' },
            { value: 'has_nuts', text: 'Has Nuts' },
            { value: 'healthy', text: 'Healthy' },
            { value: 'indian', text: 'Indian' },
            { value: 'italian', text: 'Italian' },
            { value: 'japanese', text: 'Japanese' },
            { value: 'korean', text: 'Korean' },
            { value: 'kosher', text: 'Kosher' },
            { value: 'lactose_free', text: 'Lactose Free' },
            { value: 'mexican', text: 'Mexican' },
            { value: 'middle_eastern', text: 'Middle Eastern' },
            { value: 'pizza', text: 'Pizza' },
            { value: 'snack', text: 'Snack' },
            { value: 'spicy', text: 'Spicy' },
            { value: 'sushi', text: 'Sushi' },
            { value: 'thai', text: 'Thai' },
            { value: 'vegan', text: 'Vegan' },
            { value: 'vegetarian', text: 'Vegetarian' },
            { value: 'vietnamese', text: 'Vietnamese' }
        ];

        this.meat = [
            { value: 'bacon', text: 'Bacon' },
            { value: 'bear', text: 'Bear' },
            { value: 'beef', text: 'Beef' },
            { value: 'buffalo', text: 'Buffalo' },
            { value: 'calf', text: 'Calf' },
            { value: 'caribou', text: 'Caribou' },
            { value: 'chicken', text: 'Chicken' },
            { value: 'duck', text: 'Duck' },
            { value: 'goat', text: 'Goat' },
            { value: 'goose', text: 'Goose' },
            { value: 'ham', text: 'Ham' },
            { value: 'hen', text: 'Hen' },
            { value: 'horse', text: 'Horse' },
            { value: 'kangaroo', text: 'Kangaroo' },
            { value: 'lamb', text: 'Lamb' },
            { value: 'moose', text: 'Moose' },
            { value: 'mutton', text: 'Mutton' },
            { value: 'opossum', text: 'Opossum' },
            { value: 'ostrich', text: 'Ostrich' },
            { value: 'pork', text: 'Pork' },
            { value: 'quail', text: 'Quail' },
            { value: 'rabbit', text: 'Rabbit' },
            { value: 'snake', text: 'Snake' },
            { value: 'squirrel', text: 'Squirrel' },
            { value: 'turkey', text: 'Turkey' },
            { value: 'turtle', text: 'Turtle' },
            { value: 'veal', text: 'Veal' }
        ];

        this.seafood = [
            { value: 'alaska_pollack', text: 'Alaska Pollack' },
            { value: 'catfish', text: 'Catfish' },
            { value: 'clam', text: 'Clam' },
            { value: 'cod', text: 'Cod' },
            { value: 'crab', text: 'Crab' },
            { value: 'eel', text: 'Eel' },
            { value: 'lobster', text: 'Lobster' },
            { value: 'pangasius', text: 'Pangasius' },
            { value: 'pike', text: 'Pike' },
            { value: 'salmon', text: 'Salmon' },
            { value: 'shark', text: 'Shark' },
            { value: 'shrimp', text: 'Shrimp' },
            { value: 'tilapia', text: 'Tilapia' },
            { value: 'trout', text: 'Trout' },
            { value: 'tuna', text: 'Tuna' }
        ];
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedFoodItem) {
            const { image, item_name, overview, item_price, meal_type, tags, seafood, meat, food_item_id } = nextProps.selectedFoodItem;
            console.log('receive', food_item_id);
            this.tagsState = tags;
            this.seafoodState = seafood;
            this.meatState = meat;
            const meal = [];
            if (meal_type.breakfast) {
                meal.push(0);
            }
            if (meal_type.lunch) {
                meal.push(1);
            }
            if (meal_type.dinner) {
                meal.push(2);
            }
            this.setState({
                image,
                item_name,
                overview,
                item_price,
                food_item_id,
                meal
            });
        }
    }
    uploadPicture = async (type) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
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
    toggleItem = (type, value, status) => {
        const stateName = `${type}State`;
        this[stateName][value] = status;
    }
    saveFoodItem = async () => {
        // Validation
        let message;
        if (!this.state.item_name) {
            message = 'Please enter a name.';
        } else if (!this.state.item_price) {
            message = 'Please enter a price.';
        } else if (!this.state.image || !this.state.image.base64) {
            message = 'Please add an image.';
        }
        if (message) {
            return alert(message);
        } else {
            const { image, item_name, overview, item_price, meal, food_item_id  } = this.state;
            const meal_type = {
                breakfast: Boolean(meal.indexOf(0)),
                lunch: Boolean(meal.indexOf(1)),
                dinner: Boolean(meal.indexOf(2))
            };
            const form = {
                image,
                item_name,
                overview,
                item_price,
                meal_type,
                tags: this.tagsState,
                meat: this.meatState,
                seafood: this.seafoodState,
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
                form.food_item_id = result.data.food_item_id;
                this.props.saveFoodItem({ form, type });
            } else {
                alert(result.message);
            }
        }
    }
    render() {
        const width = Dimensions.get('window').width;
        const height = Dimensions.get('window').height;
        const image = this.state.image ? `data:image/png;base64,${this.state.image.base64}` : null;
        const tagItems = this.tags.map((tag, i) => {
            const { text, value } = tag;
            const isActive = this.tagsState[value];
            return (
                <FoodItem key={i} text={text} value={value} stateName={'tags'} isChecked={isActive} toggleItem={this.toggleItem} />
            );
        });
        const meatItems = this.meat.map((meat, i) => {
            const { text, value } = meat;
            const isActive = this.meatState[value];
            return (
                <FoodItem key={i} text={text} value={value} stateName={'meat'} isChecked={isActive} toggleItem={this.toggleItem} />
            );
        });
        const seafoodItems = this.seafood.map((seafood, i) => {
            const { text, value } = seafood;
            const isActive = this.seafoodState[value];
            return (
                <FoodItem key={i} text={text} value={value} stateName={'seafood'} isChecked={isActive} toggleItem={this.toggleItem} />
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
                    <Input value={this.state.item_name} onChangeText={text => this.setState({ item_name: text })}/>

                    <Text style={[textStyles.tiny, styles.headerText]}>Food Description</Text>
                    <View style={styles.textAreaContainer}>
                        <TextInput value={this.state.overview} style={styles.textArea} multiline numberOfLines={4} onChangeText={text => this.setState({ overview: text })} />
                    </View>

                    <Text style={[textStyles.tiny, styles.headerText]}>Food Price</Text>
                    <Input value={this.state.item_price} keyboardType={'numeric'} onChangeText={text => this.setState({ item_price: text })} />
                    <Text style={[textStyles.tiny, styles.headerText, { marginTop: 30 }]}>Meal</Text>
                    <ButtonGroup
                        selectMultiple
                        onPress={selectedIndexes => this.setState({ meal: selectedIndexes })}
                        selectedIndexes={this.state.meal}
                        buttons={['Breakfast', 'Lunch', 'Dinner']}
                        containerStyle={{ height: 35 }} />
                    <Text style={[textStyles.tiny, styles.headerText, { marginTop: 30 }]}>Select All That Applies</Text>
                    <Text style={[textStyles.tiny, styles.headerText]}>Tags</Text>
                    <List>{ tagItems }</List>
                    <Text style={[textStyles.tiny, styles.headerText, { marginTop: 30 }]}>Meat Type</Text>
                    <List>{ meatItems }</List>
                    <Text style={[textStyles.tiny, styles.headerText, { marginTop: 30 }]}>Seafood Type</Text>
                    <List>{ seafoodItems }</List>
                    <Button title='Save'
                        loading={this.state.isLoading}
                        titleStyle={[textStyles.medium, { height: 50 }]}
                        buttonStyle={[styles.uploadButton, { marginTop: 40 }]}
                        loading={this.state.isLoading}
                        onPress={() => this.saveFoodItem()} />
                </ScrollView>
            </Overlay>
        );
    }
}

class FoodItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: props.isChecked
        };
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