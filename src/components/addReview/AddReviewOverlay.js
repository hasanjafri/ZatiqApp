import React from 'react';
import { Text, View, ScrollView, Dimensions, Image } from 'react-native';
import { Overlay, Input, SearchBar, Icon, Button, Avatar, ListItem } from 'react-native-elements';
import StarRating from 'react-native-star-rating';
import { ImagePicker, Permissions } from 'expo';

import Loader from '../../components/Loader';
import { foodItemsByRestaurantId, submitReview } from '../../actions/UserAction';

import textStyles from '../../styles/text.style';
import styles from '../../styles/screens/business/Pages.style';
import colors from '../../styles/colors.style';

class AddReviewOverlay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: 3,
            image: null,
            text: '',
            step: 0,
            isLoading: true,
            food_item_id: null,
            foodItems: [],
            submittingReview: false
        };
    }
    async componentWillReceiveProps(nextProps) {
        if (!this.props.showOverlay && nextProps.showOverlay) {
            this.setState({
                rating: 3,
                image: null,
                step: 0,
                text: '',
                isLoading: true,
                food_item_id: null,
                foodItems: []
            })
            const result = await foodItemsByRestaurantId(this.props.restaurant_id);
            if (result.success) {
                this.setState({ isLoading: false, foodItems: result.data.food_items });
            } else {
                alert(result.message);
                this.setState({ isLoading: false });
            }
        }
    }
    uploadPicture = async (type) => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status === 'granted') {
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
        } else {
            throw new Error('Camera permission not granted');
        }
    }
    async submitReview() {
        this.setState({ submittingReview: true });
        const { food_item_id, text, rating, image } = this.state;
        const result = await submitReview({
            image,
            restaurant_id: this.props.restaurant_id,
            food_item_id,
            text,
            rating
        });
        this.setState({ submittingReview: false });
        if (result.success) {
            alert('Success! We left a review. Thank you.')
            this.props.onClose();
        } else {
            alert(result.message);
        }
    }
    _renderReview() {
        let image;
        if (this.state.image) {
            if (this.state.image.base64.includes('https://')) {
                image = this.state.image.base64;
            } else {
                image = `data:image/png;base64,${this.state.image.base64}`;
            }
        }
        return (
            <ScrollView style={styles.wrapper}>
                <Text style={[textStyles.tiny, styles.headerText]}>Picture (Optional)</Text>
                <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 20 }}>
                    { image ?
                        <Avatar size="xlarge"
                            rounded
                            source={{ uri: image }}
                            onPress={() => this.uploadPicture()}
                            activeOpacity={0.7} /> :
                        <Avatar size="xlarge"
                            rounded
                            icon={{ name: 'restaurant' }}
                            onPress={() => this.uploadPicture()}
                            activeOpacity={0.7} />
                    }
                </View>

                <Text style={[textStyles.tiny, styles.headerText]}>Review</Text>
                <Input style={styles.input}
                    onChangeText={text => this.setState({ text })}
                    returnKeyLabel={'Next'}
                    returnKeyType={'next'} />
                
                <Text style={[textStyles.tiny, styles.headerText]}>Rating</Text>
                <View style={styles.centered}>
                    <StarRating maxStars={5}
                        starSize={35}
                        rating={this.state.rating}
                        selectedStar={(star) => this.setState({ rating: star })}
                        containerStyle={{ width: 150, justifyContent: 'center', alignItems: 'center' }}
                        buttonStyle={{ padding: 10 }}
                        fullStarColor={'#f1c40f'} />
                    <View style={styles.centered}>
                        <Button title='Submit'
                            loading={this.state.submittingReview}
                            titleStyle={[textStyles.medium, { height: 50 }]}
                            buttonStyle={[styles.uploadButton, { marginTop: 40 }]}
                            onPress={() => this.submitReview()} />
                    </View>
                </View>
            </ScrollView>
        );
    }
    goNextStep(food_item_id) {
        this.setState({ step: 1, food_item_id });
    }
    _renderFoodItems() {
        let renderedList;
        if (!this.state.foodItems || this.state.foodItems.length === 0) {
            return (
                <ScrollView style={styles.wrapper}>
                    <Text style={[textStyles.medium, { marginTop: 30, color: 'black' }]}>This restaurant doesn't have any food items.</Text>
                </ScrollView>
            );
        }
        return (
            <ScrollView style={styles.wrapper}>
                { this.state.foodItems.map((item, i) => {
                    return (
                        <ListItem key={i}
                            leftIcon={<View style={{ paddingRight: 10 }}><Image style={{width: 35, height: 35, borderRadius: 17.5}} source={{uri: item.image.base64}}/></View>}
                            onPress={() => this.goNextStep(item.food_item_id)}
                            subtitle={item.overview}
                            title={item.item_name} />
                    );
                })}
            </ScrollView>
        );
    }
    render() {
        if (!this.props.showOverlay) {
            return null;
        }
        const width = Dimensions.get('window').width;
        const height = Dimensions.get('window').height;
        let renderedElement;
        if (this.state.isLoading) {
            renderedElement = <Loader show clear />
        } else if (this.state.step === 0) {
            renderedElement = this._renderFoodItems();
        } else {
            renderedElement = this._renderReview();
        }

        return (
            <Overlay isVisible={this.props.showOverlay}
                width={width - 20}
                height={height - 100}
                containerStyle={{ padding: 0 }}
                overlayStyle={styles.overlayContainer}>
                <View style={styles.header}>
                    <Text style={[textStyles.medium, {color: 'black', fontWeight: 'normal', textAlign: 'left' }]}>{ this.state.step === 0 ? 'Select the food item you\'d like to review': 'Leave a review'}</Text>
                    <Icon size={30} containerStyle={{ position: 'absolute', right: 0 }} name='clear' onPress={this.props.onClose} />
                </View>
                { renderedElement }
            </Overlay>
        );
    }
}

export default AddReviewOverlay;