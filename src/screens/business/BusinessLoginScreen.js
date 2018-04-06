import React from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, ImageBackground, TouchableOpacity, TouchableHighlight, AsyncStorage } from 'react-native';
import { SocialIcon, Button } from 'react-native-elements';
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

    login = async () => {
        //fetch('http://review-testserver.smk8prhzy8.us-west-2.elasticbeanstalk.com/businesses/', {
        try {
            const response = await fetch('http://192.168.2.13:3000/businesses/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    businessEmail: this.state.businessEmail,
                    businessPassword: this.state.businessPassword
                })
            });
            const res = await response.json();

            if (res.success === true) {
                await AsyncStorage.setItem('businessName', res.business);
                await AsyncStorage.setItem('hasSetInformation', res.hasSetInformation);
                this.props.navigation.navigate('BusinessProfile');
            } else {
                alert(res.message);
            }
        } catch(e) {
            console.log(e);
            // TODO: error handling
        }
    }

    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.wrapper}>
                <View style={styles.container}>
                    <Text style={styles.header}>- BUSINESS LOGIN -</Text>
                    <TextInput style={styles.textInput} placeholder="enter your business e-mail" onChangeText={(businessEmail) => this.setState({businessEmail})} underlineColorAndroid='transparent'/>
                    <TextInput style={styles.textInput} placeholder="enter your password" onChangeText={(businessPassword) => this.setState({businessPassword})} underlineColorAndroid='transparent' secureTextEntry/>

                    <Button title="Log In"
                        titleStyle={{ textAlign: 'center', fontFamily: 'nunito' }}
                        buttonStyle={{
                            backgroundColor: "rgba(0, 193, 138, 1)",
                            width: 300,
                            height: 50,
                            borderColor: 'transparent',
                            borderWidth: 0,
                            borderRadius: 25
                        }}
                        clear
                        onPress={this.login}
                        containerStyle={{ marginVertical: 15, backgroundColor: 'transparent' }} />
                    <Button
                        title="Not registered yet? Sign up here!"
                        titleStyle={{ textAlign: 'center', fontFamily: 'nunito', color: 'black', fontSize: 14 }}
                        buttonStyle={{
                            backgroundColor: 'white',
                            width: 300,
                            height: 50,
                            borderColor: 'transparent',
                            borderWidth: 0,
                            borderRadius: 25,
                            marginBottom: 20
                        }}
                        clear
                        onPress={() => this.props.navigation.navigate('BusinessSignUp')} />
                    <TouchableHighlight onPress={() => this.props.navigation.navigate('Login')}>
                        <Text style={{ color: 'white' }}>Not a business?</Text>
                    </TouchableHighlight>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

export default BusinessLoginScreen;