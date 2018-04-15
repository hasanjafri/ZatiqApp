import React from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, ImageBackground, TouchableOpacity, TouchableHighlight, AsyncStorage } from 'react-native';
import { SocialIcon, Button } from 'react-native-elements';

import styles from '../../styles/screens/business/BuisnessLoginScreen.style';
import urls from '../../libs/urls';

import BusinessAction from '../../actions/BusinessAction';
const BusinessInstance = BusinessAction.getInstance();

class BusinessLoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            password: '',
            email: ''
        };
        this.businessLogin = this.businessLogin.bind(this);
    }

    businessLogin = async () => {
        this.setState({ isLoading: true });

        const err = await BusinessInstance.login({ email: this.state.email, password: this.state.password });
        this.setState({ isLoading: false });

        if (err) {
            alert(err);
        } else {
            const { navigate } = this.props.navigation;
            navigate('SwitchIn');
        }
    }

    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.wrapper}>
                <View style={styles.container}>
                    <Text style={styles.header}>- BUSINESS LOGIN -</Text>
                <TextInput style={styles.textInput} placeholder="enter your business e-mail" onChangeText={(email) => this.setState({email})} underlineColorAndroid='transparent'/>
                    <TextInput style={styles.textInput} placeholder="enter your password" onChangeText={(password) => this.setState({password})} underlineColorAndroid='transparent' secureTextEntry/>

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
                        loading={this.state.isLoading}
                        onPress={() => this.businessLogin()}
                        containerStyle={{ marginVertical: 15 }} />
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