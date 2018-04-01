import React from 'react';
import { TextInput, Text, StyleSheet, View, ImageBackground, KeyboardAvoidingView, TouchableOpacity, AsyncStorage } from 'react-native';
import { SocialIcon } from 'react-native-elements';
import styles from '../../styles/screens/business/BuisnessSignUpScreen.style';

class BusinessSignUpScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            businessName: '',
            businessEmail: '',
            businessPassword: ''
        }
    }

    businessRegister = async () => {
        //fetch('http://review-testserver.smk8prhzy8.us-west-2.elasticbeanstalk.com/businesses/', {
        try {
            const response = await fetch('http://192.168.2.13:3000/businesses/register', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    businessName: this.state.businessName,
                    businessEmail: this.state.businessEmail,
                    businessPassword: this.state.businessPassword
                })
            });
            const res = await response.json();

            if (res.success === true) {
                alert(res.message);
            } else {
                alert(res.message);
            }
        } catch(e) {
            console.log(e);
            // TODO: error handling
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.wrapper}>
                <KeyboardAvoidingView behavior='padding' style={styles.wrapper}>
                    <View style={styles.container}>
                        <Text style={styles.header}>- SIGN UP WITH ZATIQ -</Text>
                        <TextInput style={styles.textInput} placeholder="enter your business e-mail" onChangeText={(businessEmail) => this.setState({businessEmail})} underlineColorAndroid='transparent'/>
                        <TextInput style={styles.textInput} placeholder="enter your business name" onChangeText={(businessName) => this.setState({businessName})} underlineColorAndroid='transparent'/>
                        <TextInput style={styles.textInput} placeholder="enter your desired password" onChangeText={(businessPassword) => this.setState({businessPassword})} secureTextEntry underlineColorAndroid='transparent'/>
                        <TouchableOpacity style={styles.button} onPress={this.businessRegister}>
                            <Text>SIGN UP</Text>
                        </TouchableOpacity>
                        <SocialIcon title="Already registered? Login here!" button light style={styles.buttons2} onPress={() => this.props.switchSreen('signUp')}/>
                        <SocialIcon title="Not a business?" button light style={styles.buttons2} onPress={() => this.props.navigation.navigate('Login')}/>
                    </View>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

export default BusinessSignUpScreen;