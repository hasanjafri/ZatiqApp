import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Icon, Button, List, ListItem } from 'react-native-elements';

import colors from '../../../styles/colors.style';
import styles from '../../../styles/screens/business/Pages.style';
import textStyles from '../../../styles/text.style';

import BusinessAction from '../../../actions/BusinessAction';
const BusinessInstance = BusinessAction.getInstance();

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

        this.features = [
            { text: 'Delivery', value: 'delivery'},
            { text: 'Takeout', value: 'takeout'},
            { text: 'Accepts Reservation', value: 'reservation'},
            { text: 'Patio', value: 'patio'},
            { text: 'Wheel Chair Accessible', value: 'wheelChair'}
        ];
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

        const err = await BusinessInstance.register();
        this.setState({ isLoading: false });
        if (err) {
            alert(err)
        } else {
            this.props.nextAction();
        }
    }
    render() {
        return (
            <React.Fragment>
                <ScrollView style={styles.wrapper}>
                    <Text style={[textStyles.medium, styles.headerText, { paddingVertical: 20 }]}>Select as many features that apply to your restaurant.</Text>
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