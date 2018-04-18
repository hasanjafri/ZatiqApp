import React from 'react';
import { Text, View, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import { Overlay, Icon, Button, List, ListItem } from 'react-native-elements';

import textStyles from '../../styles/text.style';
import styles from '../../styles/screens/business/Pages.style';
import colors from '../../styles/colors.style';
import { getUserProfile, setUserProfile } from '../../actions/UserAction';

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
                nuts_allergy: false
            }
        };
        this.preferences = [
            { text: 'Spicy', value: 'spicy'},
            { text: 'Halal', value: 'halal'},
            { text: 'Kosher', value: 'kosher'},
            { text: 'Healthy', value: 'healthy'},
            { text: 'Vegan Friendly', value: 'vegan'},
            { text: 'Vegetarian', value: 'vegetarian'},
            { text: 'Lactose Intolerant', value: 'lactose_intolerant'},
            { text: 'Gluten Free', value: 'gluten_free'},
            { text: 'Nuts Allergy', value: 'nuts_allergy'}
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
        return (
                <Overlay isVisible={this.props.showOverlay}
                    width={width - 20}
                    height={height - 100}
                    containerStyle={{ padding: 0 }}
                    overlayStyle={styles.overlayContainer}>
                    { !this.state.isLoading ?
                    <React.Fragment>
                        <View style={styles.header}>
                            <Text style={[textStyles.large, {color: 'black', fontWeight: 'normal', textAlign: 'left' }]}>Set Preferences</Text>
                            <Icon size={30} containerStyle={{ position: 'absolute', right: 0 }} name='clear' onPress={this.props.onClose} />
                        </View>
                        <ScrollView style={styles.wrapper}>
                            <Text style={[textStyles.tiny, styles.headerText, { marginTop: 30 }]}>Select All That Applies</Text>
                            <List>
                                { this.preferences.map((preference, i) => {
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
                                })}
                            </List>
                            <Button title='Save'
                                loading={this.state.isLoading}
                                titleStyle={[textStyles.medium, { height: 50 }]}
                                buttonStyle={[styles.uploadButton, { marginTop: 40 }]}
                                loading={this.state.isLoading}
                                onPress={() => this.saveItem()} />
                        </ScrollView>
                    </React.Fragment> :
                    <View style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        opacity: 0.2,
                        backgroundColor: 'black',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <ActivityIndicator size='large' />
                    </View> }
                </Overlay>
        );
    }
}
export default PreferenceOverlay;