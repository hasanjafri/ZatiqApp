import React from 'react';
import { Text, View, ScrollView, Dimensions } from 'react-native';
import { Overlay, Icon, Button, ListItem } from 'react-native-elements';

import textStyles from '../../styles/text.style';
import styles from '../../styles/screens/business/Pages.style';
import colors from '../../styles/colors.style';
import { getUserProfile, setUserProfile } from '../../actions/UserAction';
import Loader from '../../components/Loader';
import preferences from '../../data/preferences'

import BusinessAction from '../../actions/BusinessAction';
const BusinessInstance = BusinessAction.getInstance();

class PreferenceOverlay extends React.Component {
    constructor(props) {
        super(props);

        const preferenceInit = {};
        preferences.forEach(preference => {
            if (!preference.section) {
                preferenceInit[preference.value] = false;
            }
        });
        this.state = {
            isLoading: false,
            preferences: preferenceInit
        };
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
            this.props.onClose()
            alert('Preferences Updated!');
        } else {
            alert(result.message);
        }
    }
    render() {
        const width = Dimensions.get('window').width;
        const height = Dimensions.get('window').height;

        const preferencesList = preferences.map((preference, i) => {
            const { text, value } = preference;
            const isActive = this.state.preferences[value];
            if (preference.section) {
                return <Text key={i} style={[textStyles.tiny, styles.headerText, { marginTop: 30 }]}>{preference.section}</Text>
            }
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
                        <Text style={[textStyles.large, {color: 'black', fontWeight: 'normal', textAlign: 'left' }]}>Tell us a bit about yourself</Text>
                        <Icon size={30} containerStyle={{ position: 'absolute', right: 0 }} name='clear' onPress={this.props.onClose} />
                    </View>
                    { !this.state.isLoading ?
                        <ScrollView style={styles.wrapper}>
                            {preferencesList}
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