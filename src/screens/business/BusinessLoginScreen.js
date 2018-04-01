import React from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, AsyncStorage } from 'react-native';
import { SocialIcon } from 'react-native-elements';
import styles from '../../styles/screens/business/BuisnessLoginScreen.style';

class BusinessLoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            businessPassword: '',
            businessEmail: ''
        }
    }

    componentDidMount() {
        this.loadInitialState().done();
    }

    loadInitialState = async () => {
        var value = await AsyncStorage.getItem('businessName');
        if (value !== null) {
            this.props.navigation.navigate('BusinessProfile');
        }
    }

    updateStorage = async () => {
        await AsyncStorage.setItem('businessName', this.state.loggedBusiness);
        await AsyncStorage.setItem('hasSetInformation', this.state.hasSetInformation);
    }

    login = () => {
        //fetch('http://review-testserver.smk8prhzy8.us-west-2.elasticbeanstalk.com/businesses/', {
        fetch('http://192.168.2.13:3000/businesses/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                businessEmail: this.state.businessEmail,
                businessPassword: this.state.businessPassword
            })
        })
        .then((response) => response.json())
        .then((res) => {

            if (res.success === true) {
                this.setState({
                    loggedBusiness: res.business,
                    hasSetInformation: res.hasSetInformation
                });
                this.updateStorage();
                this.props.navigation.navigate('BusinessProfile');
            } else {
                alert(res.message);
            }
        })
        .done();
    }

    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.wrapper}>
                <View style={styles.container}>
                    <Text style={styles.header}>- BUSINESS LOGIN -</Text>
                    <TextInput style={styles.textInput} placeholder="enter your business e-mail" onChangeText={(businessEmail) => this.setState({businessEmail})} underlineColorAndroid='transparent'/>
                    <TextInput style={styles.textInput} placeholder="enter your password" onChangeText={(businessPassword) => this.setState({businessPassword})} underlineColorAndroid='transparent' secureTextEntry/>
                    <TouchableOpacity style={styles.button} onPress={this.login}>
                        <Text>Log In</Text>
                    </TouchableOpacity>
                    <SocialIcon title="Not registered yet? Sign up here!" button light style={styles.buttons2} onPress={() => this.props.navigation.navigate('BusinessSignUp')}/>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

export default BusinessLoginScreen;