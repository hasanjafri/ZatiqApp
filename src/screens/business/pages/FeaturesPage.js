import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Icon, Button } from 'react-native-elements';

import colors from '../../../styles/colors.style';
import styles from '../../../styles/screens/business/Pages.style';
import textStyles from '../../../styles/text.style';

class FeaturesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            features: {
                delivery: false,
                takeout: false,
                reservation: false,
                patio: false,
                wheelChair: false
            }
        };
    }
    toggleFeature = value => {
        const { features } = this.state;
        const newFeatures = { ...features };
        newFeatures[value] = !features[value];
        this.setState({ features: newFeatures });
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
    render() {
        return (
            <ScrollView style={styles.wrapper}>
                <Text style={[textStyles.large, { color: colors.gray, textAlign: 'left', marginVertical: 20 }]}>Features</Text>
                
                { this._renderFeature({ text: 'Delivery', value: 'delivery'}) }
                { this._renderFeature({ text: 'Takeout', value: 'takeout'}) }
                { this._renderFeature({ text: 'Accepts Reservation', value: 'reservation'}) }
                { this._renderFeature({ text: 'Patio', value: 'patio'}) }
                { this._renderFeature({ text: 'Wheel Chair Accessible', value: 'wheelChair'}) }
                <Button title='Submit'
                    titleStyle={{ textAlign: 'center', fontFamily: 'nunito' }}
                    buttonStyle={{
                        backgroundColor: colors.primary,
                        width: 300,
                        height: 40,
                        borderColor: 'transparent',
                        borderWidth: 0,
                        borderRadius: 25
                    }}
                    clear
                    onPress={() => this.submit}
                    containerStyle={{ marginVertical: 30, backgroundColor: 'transparent' }} />
            </ScrollView>
        );
    }
}

export default FeaturesPage;