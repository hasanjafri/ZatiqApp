import React from 'react';
import { Text, View, KeyboardAvoidingView, ImageBackground, TouchableHighlight } from 'react-native';
import { Button, Input, Icon } from 'react-native-elements';

import colors from '../../styles/colors.style';
import styles from '../../styles/screens/business/BusinessSignUpScreen.style';
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
        // Validation
        const {email, password} = this.state;
        if (!password || !email) {
            return alert('You need to enter an e-mail and a password.');
        }
        this.setState({ isLoading: true });
        const result = await BusinessInstance.login({ email: this.state.email, password: this.state.password });
        
        this.setState({ isLoading: false });
        if (!result.success) {
            alert(result.message);
        } else {
            const { navigate } = this.props.navigation;
            navigate('SwitchIn');
        }
    }

    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.wrapper}>
                <ImageBackground style={styles.container} source={require('../../assets/backgrounds/businessBackground.png')}>
                    <View style={{ width: '100%'}}>
                        <Text style={styles.header}>- BUSINESS LOGIN -</Text>
                    </View>

                    <Input leftIconContainerStyle={styles.iconContainer}
                        containerStyle={styles.inputContainer}
                        inputStyle={styles.input}
                        keyboardType={'email-address'}
                        onSubmitEditing={() => { this.password_input.focus(); }}
                        blurOnSubmit={false}
                        placeholder='Business E-mail'
                        leftIcon={<Icon type='font-awesome' name='user-circle-o' size={25} color='white' />}
                        onChangeText={(email) => this.setState({email})}
                        underlineColorAndroid='transparent'/>
                    <Input leftIconContainerStyle={styles.iconContainer}
                        containerStyle={styles.inputContainer}
                        inputStyle={styles.input}
                        placeholder='Password'
                        ref={(input) => { this.password_input = input; }}
                        onChangeText={(password) => this.setState({password})}
                        underlineColorAndroid='transparent'
                        leftIcon={<Icon type='font-awesome' name='lock' size={25} color='white' />}
                        secureTextEntry />

                    <Button title="Log In"
                        titleStyle={{ textAlign: 'center', fontFamily: 'nunito' }}
                        buttonStyle={styles.primaryButton}
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
                </ ImageBackground>
            </KeyboardAvoidingView>
        );
    }
}

export default BusinessLoginScreen;