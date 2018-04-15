import React from 'react';
import { View, Text, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Button, Input } from 'react-native-elements';

import colors from '../../../styles/colors.style';
import styles from '../../../styles/screens/business/Pages.style';
import textStyles from '../../../styles/text.style';

import BusinessAction from '../../../actions/BusinessAction';
const BusinessInstance = BusinessAction.getInstance();

class BusinessInfoPage extends React.Component {
    constructor(props) {
        super(props);
        this.days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        this.state = {
            address: '',
            name: '',
            number: '',
            website: ''
        };
    }
    onTextChange(text, stateName) {
        BusinessInstance.setRegisterForm({ [stateName]: text });
        this.setState({ [stateName]: text });
    }
    
    render() {
        return (
            <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={100} style={{ flex: 1 }}>
                <ScrollView style={styles.wrapper}>
                    <Text style={[textStyles.medium, styles.headerText, { paddingVertical: 20 }]}>Hi, let's get to know you and your business before completing the registration!</Text>
                    
                    <Text style={[textStyles.tiny, styles.headerText]}>Business Name</Text>
                    <Input containerStyle={{ width: '100%' }} inputStyle={styles.input} onChangeText={text => this.onTextChange(text, 'name')}/>
                    
                    <Text style={[textStyles.tiny, styles.headerText]}>Address</Text>
                    <Input containerStyle={{ width: '100%' }} inputStyle={styles.input} onChangeText={text => this.onTextChange(text, 'address')}/>

                    <Text style={[textStyles.tiny, styles.headerText]}>Phone Number</Text>
                    <Input containerStyle={{ width: '100%' }} inputStyle={styles.input} onChangeText={text => this.onTextChange(text, 'number')}/>

                    <Text style={[textStyles.tiny, styles.headerText]}>Website</Text>
                    <Input containerStyle={{ width: '100%' }} inputStyle={styles.input} onChangeText={text => this.onTextChange(text, 'website')}/>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

export default BusinessInfoPage;