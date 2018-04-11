import React from 'react';
import { View, Text, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Button, Input, ButtonGroup } from 'react-native-elements';

import colors from '../../../styles/colors.style';
import styles from '../../../styles/screens/business/Pages.style';
import textStyles from '../../../styles/text.style';

class BusinessInfoPage extends React.Component {
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
            <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={100} style={{ flex: 1 }}>
                <ScrollView style={styles.wrapper}>
                    <Text style={[textStyles.medium, styles.headerText, { paddingVertical: 20 }]}>Hi, let's start by talking a little about you and your business!</Text>
                    
                    <Text style={[textStyles.tiny, styles.headerText]}>Business Name</Text>
                    <Input containerStyle={{ width: '100%' }} inputStyle={styles.input}/>
                    
                    <Text style={[textStyles.tiny, styles.headerText, { marginTop: 20}]}>Price Range</Text>
                    <ButtonGroup onPress={selectedIndex => this.setState({ foodType: selectedIndex })}
                        selectedIndex={this.state.foodType}
                        buttons={['$', '$$', '$$$']}
                        containerStyle={{ height: 35, marginTop: 15 }} />

                    <Text style={[textStyles.tiny, styles.headerText]}>Address</Text>
                    <Input containerStyle={{ width: '100%' }} inputStyle={styles.input}/>

                    <Text style={[textStyles.tiny, styles.headerText]}>Phone Number</Text>
                    <Input containerStyle={{ width: '100%' }} inputStyle={styles.input}/>

                    <Text style={[textStyles.tiny, styles.headerText]}>Website</Text>
                    <Input containerStyle={{ width: '100%' }} inputStyle={styles.input}/>
                
                    <Text style={[textStyles.tiny, styles.headerText]}>E-mail</Text>
                    <Input containerStyle={{ width: '100%' }} inputStyle={styles.input}/>
                    
                    <Text style={[textStyles.small, { color: colors.gray, fontWeight: 'bold', textAlign: 'center', marginTop: 20 }]}>Weekday hours</Text>
                    <View style={styles.equalWidthContainer}>
                        <View style={[styles.equalWidthView, { marginRight: 5 }]}>
                            <Text style={[textStyles.tiny, styles.headerText]}>From</Text>
                            <Input containerStyle={{ width: '100%' }} inputStyle={styles.input}/>
                        </View>
                        <View style={[styles.equalWidthView, { marginLeft: 5 }]}>
                            <Text style={[textStyles.tiny, styles.headerText]}>To</Text>
                            <Input containerStyle={{ width: '100%' }} inputStyle={styles.input}/>
                        </View>
                    </View>

                    <Text style={[textStyles.small, { color: colors.gray, fontWeight: 'bold', textAlign: 'center', marginTop: 20 }]}>Weekend hours</Text>
                    <View style={[styles.equalWidthContainer, { marginBottom: 40 }]}>
                        <View style={[styles.equalWidthView, { marginRight: 5 }]}>
                            <Text style={[textStyles.tiny, styles.headerText]}>From</Text>
                            <Input containerStyle={{ width: '100%' }} inputStyle={styles.input}/>
                        </View>
                        <View style={[styles.equalWidthView, { marginLeft: 5 }]}>
                            <Text style={[textStyles.tiny, styles.headerText]}>To</Text>
                            <Input containerStyle={{ width: '100%' }} inputStyle={styles.input}/>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

export default BusinessInfoPage;