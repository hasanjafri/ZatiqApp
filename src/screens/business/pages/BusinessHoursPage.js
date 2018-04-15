import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Button, Input, Icon } from 'react-native-elements';
import DatePicker from 'react-native-datepicker'

import colors from '../../../styles/colors.style';
import styles from '../../../styles/screens/business/Pages.style';
import textStyles from '../../../styles/text.style';

import BusinessAction from '../../../actions/BusinessAction';
const BusinessInstance = BusinessAction.getInstance();

class BusinessHoursPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: {
                start: {
                    monday: '9:00',
                    tuesday: '9:00',
                    wednesday: '9:00',
                    thursday: '9:00',
                    friday: '9:00',
                    saturday: '10:00',
                    sunday: '10:00'
                },
                end: {
                    monday: '20:00',
                    tuesday: '20:00',
                    wednesday: '20:00',
                    thursday: '20:00',
                    friday: '23:00',
                    saturday: '23:00',
                    sunday: '20:00'
                }
            }
        };
        BusinessInstance.setRegisterForm({ date: this.state.date });
        this.days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    }
    onDateChange = (type, day, time) => {
        this.state.date[type][day.toLowerCase()] = time;
    
        BusinessInstance.setRegisterForm({ date: this.state.date });
        this.setState({ date: this.state.date });
    }
    _dateRenderer = day => {
        const datePicker = type => {
            return (
                <DatePicker style={{width: '90%'}}
                    customStyles={{
                        dateIcon: {
                            
                        },
                        dateText: {
                            fontFamily: 'nunito'
                        }
                    }}
                    iconComponent={
                        <Icon containerStyle={{
                            position: 'absolute',
                            left: 10,
                            top: 8,
                            marginLeft: 0 }}
                        type='font-awesome' color={colors.blue} name='clock-o' />
                    }
                    date={this.state.date[type][day.toLowerCase()]}
                    mode="time"
                    format="HH:mm"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    minuteInterval={10}
                    onDateChange={(time) => this.onDateChange(type, day, time)} />
            );
        };
        return (
            <View key={day}>
                <Text style={[textStyles.small, { color: colors.gray, marginTop: 20 }]}>{day}</Text>
                <View style={[styles.equalWidthContainer, { marginBottom: day === 'Sunday' ? 40 : 0 }]}>
                    <View style={[styles.equalWidthView, { marginRight: 5 }]}>
                        <Text style={[textStyles.tiny, styles.headerText, { color: colors.black }]}>From</Text>
                        { datePicker('start') }
                    </View>
                    <View style={[styles.equalWidthView, { marginLeft: 5 }]}>
                        <Text style={[textStyles.tiny, styles.headerText, { color: colors.black }]}>To</Text>
                        { datePicker('end') }
                    </View>
                </View>
            </View>
        );
    }
    render() {
        return (
            <ScrollView style={styles.wrapper}>
                <Text style={[textStyles.medium, styles.headerText, { paddingVertical: 20 }]}>Next, we need your opening hours.</Text>
                { this.days.map(day => this._dateRenderer(day)) }
            </ScrollView>
        );
    }
}

export default BusinessHoursPage;