import React from 'react';
import { connect } from 'react-redux';
import { Text, View, ScrollView } from 'react-native';
import { Icon, Button, ListItem } from 'react-native-elements';
import Dialog from '../Dialog';

import { closePreferenceOverlay } from '../../redux/actions/general.action';
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
        if (!this.props.isPreferenceOverlayShown && nextProps.isPreferenceOverlayShown) {
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
            this.props.closePreferenceOverlay()
            alert('Preferences Updated!');
        } else {
            alert(result.message);
        }
    }
    render() {
        const { isPreferenceOverlayShown } = this.props;
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
            <Dialog show={isPreferenceOverlayShown}
                title="Tell us a bit about yourself"
                onDismissed={this.props.closePreferenceOverlay}>
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
            </Dialog>
        );
    }
}

const mapStateToProps = (state) => ({
    isPreferenceOverlayShown: state.generalReducer.isPreferenceOverlayShown
});

export default connect(mapStateToProps, { closePreferenceOverlay })(PreferenceOverlay);