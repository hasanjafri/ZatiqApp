import React from 'react';
import { Text } from 'react-native';

import RestaurantScreen from '../../screens/application/RestaurantScreen';
import Loader from '../../components/Loader';
import textStyles from '../../styles/text.style';

import BusinessAction from '../../actions/BusinessAction';
const BusinessInstance = BusinessAction.getInstance();

class BusinessRestaurantScreen extends React.Component {
    state = {
        isLoading : true,
        data: null
    }
    async componentDidMount() {
        const result = await BusinessInstance.getProfile();
        if (result.success) {
            this.setState({ data: result.data, isLoading: false });
        } else {
            alert(result.message);
        }
    }
    render() {
        if (this.state.isLoading) {
            return <Loader show />
        }
        const { data } = this.state;
        if (data) {
            const navigation = this.props.navigation;
            navigation.state.params =  {
                restaurant_id: data.restaurant_id,
                restaurant_info: data
            }
            return (
                <RestaurantScreen navigation={navigation} self />
            );
        }
        return (
            <Text style={[textStyles.medium, { marginTop: 30, color: 'black' }]}>You have to finish setting up your profile.</Text>
        );
    }
}

export default BusinessRestaurantScreen;