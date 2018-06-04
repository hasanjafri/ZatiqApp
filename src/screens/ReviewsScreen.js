import React from 'react';
import { Text, View, ScrollView, Image } from 'react-native';
import { Button, Input, Icon } from 'react-native-elements';
import StarRating from 'react-native-star-rating';
import moment from 'moment';

import Loader from '../components/Loader';
import colors from '../styles/colors.style';
import styles from '../styles/screens/ReviewsScreen.style';
import textStyles from '../styles/text.style';
import urls from '../libs/urls';

import appState from '../appState';
const state = appState.getInstance();

import BusinessAction from '../actions/BusinessAction';
const BusinessInstance = BusinessAction.getInstance();

import { getUserReviews } from '../actions/UserAction';

class ReviewsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            reviews: []
        }
        const user = state.getUser();
        this.type = user ? user.type : null;
    }
    
    async componentDidMount() {
        const user = state.getUser();
        let result;
        if (this.type === 'business') {
            result = await BusinessInstance.getBusinessReviews();
        } else {
            result = await getUserReviews();
        }
        if (result.success) {
            this.setState({ isLoading: false, reviews: result.data });
        } else {
            this.setState({ isLoading: false });
            alert(result.message);
        }
    }
    render() {
        if (this.state.isLoading) {
            return <Loader show clear />
        }
        const reviews = this.state.reviews.map((review, i) => {
            let image;
            if (review.image) {
                if (review.image.base64.includes('http')) {
                    image = review.image.base64;
                } else {
                    image = `data:image/png;base64,${review.image.base64}`;
                }
            }
            return (
                <View key={i} style={styles.reviewRow}>
                    <Image style={{ height: 100, width: '30%', borderRadius: 20 }} resizeMode={'cover'} source={{ uri: image }} />

                    <View style={{ width: '70%', paddingLeft: 10 }}>
                        <Text style={styles.reviewTitle}>{review.name}</Text>
                        <View style={{ flexDirection: 'row'}}>
                            <StarRating disabled
                                maxStars={5}
                                starSize={10}
                                rating={review.rating}
                                containerStyle={{ paddingBottom: 10, width: 60, paddingRight: 2 }}
                                fullStarColor={'#f1c40f'} />
                            <Text style={[textStyles.miniItalic, {color: 'black', marginLeft: 10, marginTop: -3}]}>{moment(review.date_created).fromNow()}</Text>
                        </View>
                        <Text style={styles.reviewContent}>{review.text}</Text>
                    </View>
                </View>
            )
        });
        return (
            <ScrollView style={styles.scrollViewContainer}>
                {/* Reviews */}
                { !this.state.reviews || this.state.reviews.length === 0 ?
                    <Text style={[textStyles.medium, { marginTop: 30, color: 'black' }]}>No reviews.</Text> :
                    <View style={styles.reviewsContainer}>
                        {reviews}
                    </View>
                }
            </ScrollView>
        );
    }
}

export default ReviewsScreen;