import React from 'react';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import styles from '../../styles/screens/business/BuisnessProfileScreen.style';

class BusinessProfileScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasSetInformation: 0
        }
    }

    componentWillMount() {
        //this.loadInitialState().done();
    }

    loadInitialState = async () => {
        let value = await AsyncStorage.getItem('hasSetInformation');
        if (value !== null) {
            this.setState({
                hasSetInformation: value
            });
        }
    }

    render() {
        if (this.state.hasSetInformation == '0') {
            return(
                <View style={styles.container}>
                    <Text style={styles.text}>Not Set Yet!</Text>
                </View>
            );
        }
        return(
            <View style={styles.container}>
                <Text style={styles.text}>Set!</Text>
            </View>
        );
    }
}

export default BusinessProfileScreen;