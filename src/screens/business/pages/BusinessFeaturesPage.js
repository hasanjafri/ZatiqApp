import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Icon, Button, List, ListItem } from 'react-native-elements';

import colors from '../../../styles/colors.style';
import styles from '../../../styles/screens/business/Pages.style';
import textStyles from '../../../styles/text.style';

import BusinessAction from '../../../actions/BusinessAction';
const BusinessInstance = BusinessAction.getInstance();
import appState from '../../../appState';
const state = appState.getInstance();

class BusinessFeaturesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            features: {
                delivery: false,
                takeout: false,
                reservation: false,
                patio: false,
                wheelChair: false
            }
        };
        BusinessInstance.setRegisterForm({ features: this.state.features });

        this.user = state.user;
        this.features = [
            { text: 'Delivery', value: 'delivery'},
            { text: 'Takeout', value: 'takeout'},
            { text: 'Accepts Reservation', value: 'reservation'},
            { text: 'Patio', value: 'patio'},
            { text: 'Wheel Chair Accessible', value: 'wheelChair'}
        ];
    }
    componentDidMount() {
        if (this.props.data) {
            const { patio, reservation, takeout, wheelchair_accessible, delivery } = this.props.data;
            this.setState({ features: {
                patio,
                reservation,
                takeout,
                wheelChair: wheelchair_accessible,
                delivery
            }});
        }
    }

    toggleFeature = value => {
        const { features } = this.state;
        const newFeatures = { ...features };
        
        newFeatures[value] = !features[value];

        BusinessInstance.setRegisterForm({ features: newFeatures });
        this.setState({ features: newFeatures });
    }
    businessRegister = async () => {
        this.setState({ isLoading: true });

        const result = await BusinessInstance.register({ type: this.props.registration ? 'register' : 'edit' });
        this.setState({ isLoading: false });
        if (!result.success) {
            alert(result.message)
        } else {
            if (this.props.registration) {
                this.props.nextAction();
            } else {
                alert('Updated profile!')
            }
        }
    }
    render() {
        return (
            <React.Fragment>
                <ScrollView style={styles.wrapper}>
                    { !this.user ?  <Text style={[textStyles.medium, styles.headerText, { paddingVertical: 20 }]}>Select as many features that apply to your restaurant.</Text> : null }
                    <Text style={[textStyles.small, styles.headerText]}>Features</Text>
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
                </ScrollView>
                <Button title='Submit'
                    loading={this.state.isLoading}
                    titleStyle={[textStyles.medium, { height: 50 }]}
                    buttonStyle={styles.uploadButton}
                    onPress={() => this.businessRegister()} />
            </ React.Fragment>
        );
    }
}

export default BusinessFeaturesPage;