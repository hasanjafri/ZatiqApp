import React from 'react';
import { Text, View, ScrollView, Dimensions } from 'react-native';
import { Overlay, Icon, Button, ListItem } from 'react-native-elements';

import textStyles from '../../styles/text.style';
import styles from '../../styles/screens/business/Pages.style';
import colors from '../../styles/colors.style';
import { getUserProfile, setUserProfile } from '../../actions/UserAction';
import Loader from '../../components/Loader';

import BusinessAction from '../../actions/BusinessAction';
const BusinessInstance = BusinessAction.getInstance();

class PreferenceOverlay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            preferences: {
                spicy: false,
                halal: false,
                kosher: false,
                healthy: false,
                vegan: false,
                vegetarian: false,
                lactose_intolerant: false,
                gluten_free: false,
                nuts_allergy: false,
                milk_allergy: false,
                eggs_allergy: false,
                crustacean_allergy: false,
                wheat_allergy: false,
                soybeans_allergy: false,
            }
        };
        this.preferences = [
            { text: 'Eggs Allergy', value: 'eggs_allergy'},
            { text: 'Crustacean Allergy', value: 'crustacean_allergy'},
            { text: 'Gluten Free', value: 'gluten_free'},
            { text: 'Halal', value: 'halal'},
            { text: 'Healthy', value: 'healthy'},
            { text: 'Kosher', value: 'kosher'},
            { text: 'Lactose Intolerant', value: 'lactose_intolerant'},
            { text: 'Milk Allergy Allergy', value: 'milk_allergy'},
            { text: 'Nuts Allergy', value: 'nuts_allergy'},
            { text: 'Soybeans Allergy', value: 'soybeans_allergy'},
            { text: 'Spicy', value: 'spicy'},
            { text: 'Wheat Allergy', value: 'wheat_allergy'},
            { text: 'Vegan Friendly', value: 'vegan'},
            { text: 'Vegetarian', value: 'vegetarian'}
        ];
    }
    async componentWillReceiveProps(nextProps) {
        if (!this.props.showOverlay && nextProps.showOverlay) {
            const result = await getUserProfile();
            this.setState({ isLoading: true });
            if (result.success) {
                this.setState({ preferences: result.data.preferences, isLoading: false });
            } else {
                alert(result.message);
            }
        }
    }
    togglePreference = value => {
        const { preferences } = this.state;
        const newPreferences = { ...preferences };
        newPreferences[value] = !preferences[value];
        this.setState({ preferences: newPreferences });
    }
    saveItem = async () => {
        const result = await setUserProfile(this.state.preferences);
        this.setState({ isLoading: true });
        if (result.success) {
            this.setState({ preferences: result.data.preferences, isLoading: false });
            alert('Preferences Updated!');
        } else {
            alert(result.message);
        }
    }
    render() {
        const width = Dimensions.get('window').width;
        const height = Dimensions.get('window').height;

        const preferences = this.preferences.map((preference, i) => {
            const { text, value } = preference;
            const isActive = this.state.preferences[value];
            return (
                <ListItem key={i}
                    rightIcon={
                        isActive ?
                        <Icon containerStyle={{ marginRight: 5 }} color={colors.blue} type='font-awesome' name='check-circle' /> :
                        <Icon containerStyle={{ marginRight: 5 }} color={colors.gray} type='font-awesome' name='circle-thin' />
                    }
                    titleStyle={{ fontFamily: 'nunito' }}
                    onPress={() => this.togglePreference(value)}
                    title={text}
                />
            );
        });
        return (
                <Overlay isVisible={this.props.showOverlay}
                    width={width - 20}
                    height={height - 100}
                    containerStyle={{ padding: 0 }}
                    overlayStyle={styles.overlayContainer}>
                        <View style={styles.header}>
                            <Text style={[textStyles.large, {color: 'black', fontWeight: 'normal', textAlign: 'left' }]}>Set Preferences</Text>
                            <Icon size={30} containerStyle={{ position: 'absolute', right: 0 }} name='clear' onPress={this.props.onClose} />
                        </View>
                        { !this.state.isLoading ?
                            <ScrollView style={styles.wrapper}>
                                <Text style={[textStyles.tiny, styles.headerText, { marginTop: 30 }]}>Select All That Applies</Text>
                                {preferences}
                                <View style={styles.centered}>
                                    <Button title='Save'
                                        loading={this.state.isLoading}
                                        titleStyle={[textStyles.medium, { height: 50 }]}
                                        buttonStyle={[styles.uploadButton, { marginTop: 40 }]}
                                        loading={this.state.isLoading}
                                        onPress={() => this.saveItem()} />
                                </View>
                            </ScrollView> :
                            <View style={{ flex: 1, height: '100%', width: '100%' }}><Loader show clear/></View> }
                </Overlay>
        );
    }
}
export default PreferenceOverlay;