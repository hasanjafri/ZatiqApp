import React from 'react';
import { Text, View, ImageBackground, TouchableHighlight, KeyboardAvoidingView } from 'react-native';
import { SocialIcon, Input, Icon, Button } from 'react-native-elements';

import styles from '../../styles/screens/business/BusinessSignUpScreen.style';
import colors from '../../styles/colors.style';

import BusinessAction from '../../actions/BusinessAction';
import textStyle from '../../styles/text.style';
const BusinessInstance = BusinessAction.getInstance();

class BusinessSignUpScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            repeatPassword: '',
            error: null
        };
        this.businessRegister = this.businessRegister.bind(this);
    }

    businessRegister = () => {
        // Validate
        const validate = false;
        const { email, password, repeatPassword } = this.state;
        let error = null;
        if (!email) {
            error = 'You need to enter an e-mail address';
        } else if (!password) {
            error = 'You need to enter a password';
        } else if (!repeatPassword) {
            error = 'You need to confirm your password';
        } else if (repeatPassword !== password) {
            error = 'Your passwords do not match';
        }
        if (!validate || !error) {
            BusinessInstance.setRegisterForm({
                email: this.state.email,
                password: this.state.password
            });
            this.props.navigation.navigate('BusinessProfile');
        } else {
            alert(error);
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.wrapper}>
                <ImageBackground style={styles.container} source={require('../../assets/backgrounds/businessBackground.png')}>

                    <View style={{ width: '100%' }}>
                        <Text style={styles.header}>- BUSINESS SIGN UP -</Text>
                    </View>

                    <Input leftIconContainerStyle={styles.iconContainer}
                        containerStyle={styles.inputContainer}
                        inputStyle={styles.input}
                        onSubmitEditing={() => { this.password_input.focus(); }}
                        blurOnSubmit={false}
                        placeholder='Business E-mail'
                        keyboardType={'email-address'}
                        leftIcon={<Icon type='font-awesome' name='user-circle-o' size={25} color='white' />}
                        onChangeText={text => this.setState({ email: text })}/>
                    <Input leftIconContainerStyle={styles.iconContainer}
                        containerStyle={styles.inputContainer}
                        inputStyle={styles.input}
                        ref={(input) => { this.password_input = input; }}
                        onSubmitEditing={() => { this.password_repeat_input.focus(); }}
                        blurOnSubmit={false}
                        placeholder='Password'
                        secureTextEntry
                        leftIcon={<Icon type='font-awesome' name='lock' size={25} color='white' />}
                        secureTextEntry
                        onChangeText={text => this.setState({ password: text })} />
                    <Input leftIconContainerStyle={styles.iconContainer}
                        containerStyle={styles.inputContainer}
                        ref={(input) => { this.password_repeat_input = input; }}
                        inputStyle={styles.input}
                        placeholder='Repeat Password'
                        secureTextEntry
                        leftIcon={<Icon type='font-awesome' name='lock' size={25} color='white' />}
                        secureTextEntry
                        onChangeText={text => this.setState({ repeatPassword: text })} />

                    <TouchableHighlight onPress={() => this.props.navigation.goBack()}>
                        <Text style={{ color: 'white', paddingBottom: 15 }}>Terms and Conditions</Text>
                    </TouchableHighlight>

                    <Button title="Next"
                        titleStyle={{ textAlign: 'center', fontFamily: 'nunito', color: 'white' }}
                        buttonStyle={styles.primaryButton}
                        clear
                        onPress={() => this.businessRegister()} />
                    <TouchableHighlight onPress={() => this.props.navigation.goBack()}>
                        <Text style={{ color: 'white', marginVertical: 15 }}>Already registered? Login here!</Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => this.props.navigation.navigate('Login')}>
                        <Text style={{ color: 'white' }}>Not a business?</Text>
                    </TouchableHighlight>
                </ImageBackground>
            </KeyboardAvoidingView>
        );
    }
}

export default BusinessSignUpScreen;