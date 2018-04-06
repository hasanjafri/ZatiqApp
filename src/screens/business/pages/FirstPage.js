import React from 'react';
import { View, Text, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Button, Input } from 'react-native-elements';

import styles from '../../../styles/screens/business/Pages.style';
import textStyles from '../../../styles/text.style';

class FirstPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            phoneNumber: '',
            website: '',
            email: '',
            hours: '',
            weekDays: {
                from: '',
                to: ''
            },
            weekEnds: {
                from: '',
                to: ''
            }
        };
    }
    render() {
        return (
            <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={90} style={{ flex: 1 }}>
                <ScrollView style={styles.wrapper}>
                    <Text style={[textStyles.tiny, styles.headerText]}>ADDRESS</Text>
                    <Input containerStyle={{ width: '100%' }} inputStyle={styles.input}/>

                    <Text style={[textStyles.tiny, styles.headerText]}>PHONE NUMBER</Text>
                    <Input containerStyle={{ width: '100%' }} inputStyle={styles.input}/>

                    <Text style={[textStyles.tiny, styles.headerText]}>WEBSITE</Text>
                    <Input containerStyle={{ width: '100%' }} inputStyle={styles.input}/>
                
                    <Text style={[textStyles.tiny, styles.headerText]}>EMAIL</Text>
                    <Input containerStyle={{ width: '100%' }} inputStyle={styles.input}/>
                    
                    <Text style={[textStyles.tiny, { color: 'grey', fontWeight: 'bold', textAlign: 'center', marginTop: 10 }]}>WEEKDAYS HOURS</Text>
                    <View style={styles.equalWidthContainer}>
                        <View style={[styles.equalWidthView, { marginRight: 5 }]}>
                            <Text style={[textStyles.tiny, styles.headerText]}>FROM</Text>
                            <Input containerStyle={{ width: '100%' }} inputStyle={styles.input}/>
                        </View>
                        <View style={[styles.equalWidthView, { marginLeft: 5 }]}>
                            <Text style={[textStyles.tiny, styles.headerText]}>TO</Text>
                            <Input containerStyle={{ width: '100%' }} inputStyle={styles.input}/>
                        </View>
                    </View>

                    <Text style={[textStyles.tiny, { color: 'grey', fontWeight: 'bold', textAlign: 'center', marginTop: 10 }]}>WEEKENDS HOURS</Text>
                    <View style={styles.equalWidthContainer}>
                        <View style={[styles.equalWidthView, { marginRight: 5 }]}>
                            <Text style={[textStyles.tiny, styles.headerText]}>FROM</Text>
                            <Input containerStyle={{ width: '100%' }} inputStyle={styles.input}/>
                        </View>
                        <View style={[styles.equalWidthView, { marginLeft: 5 }]}>
                            <Text style={[textStyles.tiny, styles.headerText]}>TO</Text>
                            <Input containerStyle={{ width: '100%' }} inputStyle={styles.input}/>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

export default FirstPage;